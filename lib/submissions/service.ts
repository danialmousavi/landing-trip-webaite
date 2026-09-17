import { and, desc, eq, ilike, or } from "drizzle-orm";

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
import type { CareerFormValues } from "@/lib/forms/careers";
import type { ContactFormValues } from "@/lib/forms/contact";
import type { DriverFormValues } from "@/lib/forms/drivers";
import type { SponsorshipFormValues } from "@/lib/forms/sponsorships";
import type { SubmissionStatus, SubmissionType } from "@/lib/forms/shared";
import {
  deleteResume,
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

export type InboxFilters = {
  type?: SubmissionType;
  status?: SubmissionStatus;
  query?: string;
  cursor?: string;
  limit?: number;
};

export async function listSubmissions(filters: InboxFilters = {}) {
  const limit = Math.min(filters.limit ?? 20, 50);
  const db = getDb();

  const conditions = [];
  if (filters.type) conditions.push(eq(submissions.type, filters.type));
  if (filters.status) conditions.push(eq(submissions.status, filters.status));
  if (filters.query?.trim()) {
    const q = `%${filters.query.trim()}%`;
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

  const where = conditions.length ? and(...conditions) : undefined;

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
    .orderBy(desc(submissions.createdAt))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;

  return {
    items: page.map((row) => ({
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
      email: row.contactEmail || row.jobEmail || row.sponsorshipBrand || "—",
    })),
    hasMore,
  };
}

export async function getSubmissionDetail(id: string) {
  const db = getDb();
  const [base] = await db
    .select()
    .from(submissions)
    .where(eq(submissions.id, id))
    .limit(1);
  if (!base) return null;

  if (base.type === "contact") {
    const [detail] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.submissionId, id))
      .limit(1);
    return { ...base, detail };
  }

  if (base.type === "driver") {
    const [detail] = await db
      .select()
      .from(driverApplications)
      .where(eq(driverApplications.submissionId, id))
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
      .where(eq(jobApplications.submissionId, id))
      .limit(1);
    return { ...base, detail };
  }

  const [detail] = await db
    .select()
    .from(sponsorshipRequests)
    .where(eq(sponsorshipRequests.submissionId, id))
    .limit(1);
  return { ...base, detail };
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  actorUserId: string,
) {
  const [updated] = await getDb()
    .update(submissions)
    .set({ status, updatedAt: new Date() })
    .where(eq(submissions.id, id))
    .returning({ id: submissions.id, status: submissions.status });

  if (!updated) return null;

  await getDb().insert(auditEvents).values({
    actorUserId,
    action: `status:${status}`,
    submissionId: id,
  });

  return updated;
}

export async function getCareerResume(id: string) {
  const [row] = await getDb()
    .select()
    .from(jobApplications)
    .where(eq(jobApplications.submissionId, id))
    .limit(1);
  return row ?? null;
}
