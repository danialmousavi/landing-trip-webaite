import { and, asc, count, desc, eq, ilike, isNotNull, isNull, or } from "drizzle-orm";

import { getDb } from "@/db";
import {
  contactSubmissions,
  driverApplications,
  jobApplications,
  sponsorshipRequests,
  submissions,
  auditEvents,
} from "@/db/schema";
import { encryptPii, maskNationalId, piiBlindIndex, decryptPii } from "@/lib/crypto/pii";
import { HttpError } from "@/lib/http/errors";
import { parseUuid } from "@/lib/http/body";
import type { CareerFormValues } from "@/lib/forms/careers";
import type { ContactFormValues } from "@/lib/forms/contact";
import type { DriverFormValues } from "@/lib/forms/drivers";
import type { SponsorshipFormValues } from "@/lib/forms/sponsorships";
import type { SubmissionStatus, SubmissionType } from "@/lib/forms/shared";
import { sanitizeSearchQuery } from "@/lib/forms/shared";
import {
  deleteResume,
  resumeAttachmentKind,
  saveResume,
  type AllowedResumeMime,
  type StoredResume,
} from "@/lib/storage/resumes";

export async function findByIdempotencyKey(idempotencyKey: string) {
  const [row] = await getDb()
    .select({ id: submissions.id })
    .from(submissions)
    .where(eq(submissions.idempotencyKey, idempotencyKey))
    .limit(1);
  return row ?? null;
}

export async function createContactSubmission(input: ContactFormValues) {
  const existing = await findByIdempotencyKey(input.idempotencyKey);
  if (existing) return { id: existing.id, created: false as const };

  const [row] = await getDb().transaction(async (tx) => {
    const [created] = await tx
      .insert(submissions)
      .values({
        type: "contact",
        idempotencyKey: input.idempotencyKey,
      })
      .returning({ id: submissions.id });

    await tx.insert(contactSubmissions).values({
      submissionId: created.id,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      email: input.email,
      category: input.category,
      message: input.message,
    });

    return [created];
  });

  return { id: row.id, created: true as const };
}

export async function createDriverSubmission(input: DriverFormValues) {
  const existing = await findByIdempotencyKey(input.idempotencyKey);
  if (existing) return { id: existing.id, created: false as const };

  const [row] = await getDb().transaction(async (tx) => {
    const [created] = await tx
      .insert(submissions)
      .values({
        type: "driver",
        idempotencyKey: input.idempotencyKey,
      })
      .returning({ id: submissions.id });

    await tx.insert(driverApplications).values({
      submissionId: created.id,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      nationalIdCipher: encryptPii(input.nationalId),
      nationalIdBlindIndex: piiBlindIndex(input.nationalId),
      province: input.province,
      city: input.city,
      address: input.address,
      description: input.description,
    });

    return [created];
  }).catch((error) => {
    if (isUniqueViolation(error, "driver_applications_national_id_blind_index")) {
      throw new HttpError(409, "این کد ملی قبلاً ثبت شده است.", {
        fields: { nationalId: "این کد ملی قبلاً ثبت شده است." },
      });
    }
    throw error;
  });

  return { id: row.id, created: true as const };
}

export async function createCareerSubmission(
  input: CareerFormValues,
  file: { buffer: Buffer; mimeType: AllowedResumeMime; originalName: string },
) {
  const existing = await findByIdempotencyKey(input.idempotencyKey);
  if (existing) return { id: existing.id, created: false as const };

  let stored: StoredResume | undefined;
  try {
    stored = await saveResume(file);
    const [row] = await getDb().transaction(async (tx) => {
      const [created] = await tx
        .insert(submissions)
        .values({
          type: "career",
          idempotencyKey: input.idempotencyKey,
        })
        .returning({ id: submissions.id });

      await tx.insert(jobApplications).values({
        submissionId: created.id,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        email: input.email,
        resumeStorageKey: stored!.storageKey,
        resumeOriginalName: stored!.originalName,
        resumeMimeType: stored!.mimeType,
        resumeSize: stored!.size,
      });

      return [created];
    });
    return { id: row.id, created: true as const };
  } catch (error) {
    if (stored) {
      await deleteResume(stored.storageKey).catch(() => undefined);
    }
    throw error;
  }
}

export async function createSponsorshipSubmission(input: SponsorshipFormValues) {
  const existing = await findByIdempotencyKey(input.idempotencyKey);
  if (existing) return { id: existing.id, created: false as const };

  const [row] = await getDb().transaction(async (tx) => {
    const [created] = await tx
      .insert(submissions)
      .values({
        type: "sponsorship",
        idempotencyKey: input.idempotencyKey,
      })
      .returning({ id: submissions.id });

    await tx.insert(sponsorshipRequests).values({
      submissionId: created.id,
      fullName: input.fullName,
      phone: input.phone,
      brandName: input.brandName,
      activityDomain: input.activityDomain,
    });

    return [created];
  });

  return { id: row.id, created: true as const };
}

export type InboxSort = "newest" | "oldest";

export type InboxFilters = {
  type?: SubmissionType;
  status?: SubmissionStatus;
  query?: string;
  hasAttachment?: boolean;
  sort?: InboxSort;
  page?: number;
  pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

export async function listSubmissions(filters: InboxFilters = {}) {
  const pageSize = Math.min(
    Math.max(filters.pageSize ?? DEFAULT_PAGE_SIZE, 1),
    MAX_PAGE_SIZE,
  );
  const page = Math.max(filters.page ?? 1, 1);
  const sort: InboxSort = filters.sort === "oldest" ? "oldest" : "newest";
  const db = getDb();

  const conditions = [];
  if (filters.type) conditions.push(eq(submissions.type, filters.type));
  if (filters.status) conditions.push(eq(submissions.status, filters.status));
  if (filters.hasAttachment === true) {
    conditions.push(isNotNull(jobApplications.resumeStorageKey));
  }
  if (filters.hasAttachment === false) {
    conditions.push(isNull(jobApplications.resumeStorageKey));
  }
  if (filters.query?.trim()) {
    const needle = sanitizeSearchQuery(filters.query);
    if (needle) {
      const q = `%${needle}%`;
      conditions.push(
        or(
          ilike(contactSubmissions.firstName, q),
          ilike(contactSubmissions.lastName, q),
          ilike(contactSubmissions.phone, q),
          ilike(contactSubmissions.email, q),
          ilike(driverApplications.firstName, q),
          ilike(driverApplications.lastName, q),
          ilike(driverApplications.phone, q),
          ilike(jobApplications.firstName, q),
          ilike(jobApplications.lastName, q),
          ilike(jobApplications.phone, q),
          ilike(jobApplications.email, q),
          ilike(sponsorshipRequests.fullName, q),
          ilike(sponsorshipRequests.phone, q),
          ilike(sponsorshipRequests.brandName, q),
        ),
      );
    }
  }

  const where = conditions.length ? and(...conditions) : undefined;
  const orderBy =
    sort === "oldest"
      ? [asc(submissions.createdAt), asc(submissions.id)]
      : [desc(submissions.createdAt), desc(submissions.id)];

  const [{ total }] = await db
    .select({ total: count() })
    .from(submissions)
    .leftJoin(
      contactSubmissions,
      eq(contactSubmissions.submissionId, submissions.id),
    )
    .leftJoin(
      driverApplications,
      eq(driverApplications.submissionId, submissions.id),
    )
    .leftJoin(jobApplications, eq(jobApplications.submissionId, submissions.id))
    .leftJoin(
      sponsorshipRequests,
      eq(sponsorshipRequests.submissionId, submissions.id),
    )
    .where(where);

  const totalCount = Number(total ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize) || 1);
  const currentPage = Math.min(page, totalPages);
  const offset = (currentPage - 1) * pageSize;

  const rows = await db
    .select({
      id: submissions.id,
      type: submissions.type,
      status: submissions.status,
      createdAt: submissions.createdAt,
      contactFirstName: contactSubmissions.firstName,
      contactLastName: contactSubmissions.lastName,
      contactPhone: contactSubmissions.phone,
      contactEmail: contactSubmissions.email,
      driverFirstName: driverApplications.firstName,
      driverLastName: driverApplications.lastName,
      driverPhone: driverApplications.phone,
      jobFirstName: jobApplications.firstName,
      jobLastName: jobApplications.lastName,
      jobPhone: jobApplications.phone,
      jobEmail: jobApplications.email,
      jobResumeMime: jobApplications.resumeMimeType,
      jobResumeName: jobApplications.resumeOriginalName,
      jobResumeKey: jobApplications.resumeStorageKey,
      sponsorshipName: sponsorshipRequests.fullName,
      sponsorshipPhone: sponsorshipRequests.phone,
      sponsorshipBrand: sponsorshipRequests.brandName,
    })
    .from(submissions)
    .leftJoin(
      contactSubmissions,
      eq(contactSubmissions.submissionId, submissions.id),
    )
    .leftJoin(
      driverApplications,
      eq(driverApplications.submissionId, submissions.id),
    )
    .leftJoin(jobApplications, eq(jobApplications.submissionId, submissions.id))
    .leftJoin(
      sponsorshipRequests,
      eq(sponsorshipRequests.submissionId, submissions.id),
    )
    .where(where)
    .orderBy(...orderBy)
    .limit(pageSize)
    .offset(offset);

  return {
    items: rows.map((row) => {
      const attachmentKind = resumeAttachmentKind(
        row.jobResumeMime,
        row.jobResumeName,
      );
      return {
        id: row.id,
        type: row.type,
        status: row.status,
        createdAt: row.createdAt,
        name:
          [row.contactFirstName, row.contactLastName].filter(Boolean).join(" ") ||
          [row.driverFirstName, row.driverLastName].filter(Boolean).join(" ") ||
          [row.jobFirstName, row.jobLastName].filter(Boolean).join(" ") ||
          row.sponsorshipName ||
          "—",
        phone:
          row.contactPhone ||
          row.driverPhone ||
          row.jobPhone ||
          row.sponsorshipPhone ||
          "—",
        email: row.contactEmail || row.jobEmail || null,
        brand: row.sponsorshipBrand || null,
        hasAttachment: Boolean(row.jobResumeKey),
        attachmentKind,
        attachmentName: row.jobResumeName || null,
      };
    }),
    page: currentPage,
    pageSize,
    total: totalCount,
    totalPages,
    sort,
    hasMore: currentPage < totalPages,
  };
}

export async function getSubmissionDetail(id: string) {
  const submissionId = parseUuid(id);
  if (!submissionId) return null;
  const db = getDb();
  const [base] = await db
    .select()
    .from(submissions)
    .where(eq(submissions.id, submissionId))
    .limit(1);
  if (!base) return null;

  if (base.type === "contact") {
    const [detail] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.submissionId, submissionId))
      .limit(1);
    return { ...base, detail };
  }

  if (base.type === "driver") {
    const [detail] = await db
      .select()
      .from(driverApplications)
      .where(eq(driverApplications.submissionId, submissionId))
      .limit(1);
    if (!detail) return { ...base, detail: null };
    let nationalIdMasked = "**********";
    let nationalId: string | null = null;
    try {
      nationalId = decryptPii(detail.nationalIdCipher);
      nationalIdMasked = maskNationalId(nationalId);
    } catch {
      nationalId = null;
    }
    return {
      ...base,
      detail: {
        ...detail,
        nationalId,
        nationalIdMasked,
        nationalIdCipher: undefined,
        nationalIdBlindIndex: undefined,
      },
    };
  }

  if (base.type === "career") {
    const [detail] = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.submissionId, submissionId))
      .limit(1);
    return { ...base, detail };
  }

  const [detail] = await db
    .select()
    .from(sponsorshipRequests)
    .where(eq(sponsorshipRequests.submissionId, submissionId))
    .limit(1);
  return { ...base, detail };
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  actorUserId: string,
) {
  const submissionId = parseUuid(id);
  if (!submissionId) return null;
  const [updated] = await getDb()
    .update(submissions)
    .set({ status, updatedAt: new Date() })
    .where(eq(submissions.id, submissionId))
    .returning({ id: submissions.id, status: submissions.status });

  if (!updated) return null;

  await getDb().insert(auditEvents).values({
    actorUserId,
    action: `status:${status}`,
    submissionId,
  });

  return updated;
}

export async function getCareerResume(id: string) {
  const submissionId = parseUuid(id);
  if (!submissionId) return null;
  const [row] = await getDb()
    .select()
    .from(jobApplications)
    .where(eq(jobApplications.submissionId, submissionId))
    .limit(1);
  return row ?? null;
}

function isUniqueViolation(error: unknown, constraint: string) {
  let current: unknown = error;
  for (let depth = 0; depth < 5 && current; depth += 1) {
    if (typeof current !== "object") break;
    const record = current as {
      code?: string;
      constraint?: string;
      constraint_name?: string;
      message?: string;
      cause?: unknown;
    };
    const haystack = `${record.constraint_name ?? ""} ${record.constraint ?? ""} ${record.message ?? ""}`;
    if (record.code === "23505" && haystack.includes(constraint)) return true;
    if (haystack.includes(constraint) && /duplicate|unique/i.test(haystack)) return true;
    current = record.cause;
  }
  return false;
}
