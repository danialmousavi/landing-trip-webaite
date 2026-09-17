import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { getEnv } from "@/lib/env";

const PDF_SIGNATURE = Buffer.from("%PDF", "ascii");
const ZIP_SIGNATURE = Buffer.from([0x50, 0x4b, 0x03, 0x04]);

const ALLOWED_RESUME_TYPES = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
} as const;

export type AllowedResumeMime = keyof typeof ALLOWED_RESUME_TYPES;

export type StoredResume = {
  storageKey: string;
  originalName: string;
  mimeType: AllowedResumeMime;
  size: number;
};

function getResumeRoot() {
  return path.resolve(getEnv().UPLOAD_ROOT);
}

export async function ensureResumeRoot() {
  await mkdir(getResumeRoot(), { recursive: true });
}

export function resumeAttachmentKind(
  mimeType?: string | null,
  originalName?: string | null,
): "pdf" | "docx" | null {
  const mime = (mimeType ?? "").toLowerCase();
  const name = (originalName ?? "").toLowerCase();
  if (mime === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    return "docx";
  }
  return null;
}

function hasPdfSignature(buffer: Buffer) {
  return buffer.subarray(0, 4).equals(PDF_SIGNATURE);
}

function hasDocxSignature(buffer: Buffer) {
  return buffer.subarray(0, 4).equals(ZIP_SIGNATURE);
}

export function resolveResumeMime(input: {
  buffer: Buffer;
  mimeType?: string | null;
  originalName: string;
}): AllowedResumeMime {
  if (input.mimeType && isAllowedResumeMime(input.mimeType)) {
    return input.mimeType;
  }

  const extension = extensionFromName(input.originalName);
  if (hasPdfSignature(input.buffer) && extension === "pdf") {
    return "application/pdf";
  }
  if (hasDocxSignature(input.buffer) && extension === "docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }

  throw new Error("Only PDF and DOCX resumes are accepted.");
}

export function isAllowedResumeMime(
  mimeType: string,
): mimeType is AllowedResumeMime {
  return mimeType in ALLOWED_RESUME_TYPES;
}

export function assertSafeResume(input: {
  buffer: Buffer;
  mimeType?: string | null;
  originalName: string;
  size?: number;
}) {
  const size = input.size ?? input.buffer.byteLength;
  const maxBytes = getEnv().MAX_RESUME_BYTES;

  if (size <= 0) {
    throw new Error("Resume file is empty.");
  }

  if (size > maxBytes) {
    throw new Error(`Resume exceeds the ${maxBytes} byte limit.`);
  }

  if (input.buffer.byteLength !== size) {
    throw new Error("Resume size does not match the uploaded bytes.");
  }

  const mimeType = resolveResumeMime(input);

  const extension = extensionFromName(input.originalName);
  const expectedExtension = ALLOWED_RESUME_TYPES[mimeType];
  if (extension !== expectedExtension) {
    throw new Error("Resume file extension does not match its type.");
  }

  if (!hasExpectedSignature(input.buffer, mimeType)) {
    throw new Error("Resume contents do not match the declared file type.");
  }

  return mimeType;
}

export async function saveResume(input: {
  buffer: Buffer;
  mimeType?: string | null;
  originalName: string;
}): Promise<StoredResume> {
  const mimeType = assertSafeResume(input);
  await ensureResumeRoot();

  const year = String(new Date().getUTCFullYear());
  const extension = ALLOWED_RESUME_TYPES[mimeType];
  const storageKey = path.posix.join(year, `${randomUUID()}.${extension}`);
  const destination = resolveStoragePath(storageKey);

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, input.buffer, { flag: "wx" });

  return {
    storageKey,
    originalName: sanitizeOriginalName(input.originalName),
    mimeType,
    size: input.buffer.byteLength,
  };
}

export async function readResume(storageKey: string) {
  return readFile(resolveStoragePath(storageKey));
}

export async function deleteResume(storageKey: string) {
  await unlink(resolveStoragePath(storageKey));
}

function resolveStoragePath(storageKey: string) {
  if (
    !storageKey ||
    storageKey.includes("\0") ||
    path.posix.normalize(storageKey) !== storageKey ||
    storageKey.startsWith("/") ||
    storageKey.startsWith("../") ||
    storageKey.split("/").some((segment) => segment === "..")
  ) {
    throw new Error("Invalid resume storage key.");
  }

  const root = getResumeRoot();
  const resolved = path.resolve(root, ...storageKey.split("/"));
  const relative = path.relative(root, resolved);

  if (
    relative.startsWith("..") ||
    path.isAbsolute(relative) ||
    relative.length === 0
  ) {
    throw new Error("Invalid resume storage key.");
  }

  return resolved;
}

function extensionFromName(originalName: string) {
  const extension = path.posix.extname(originalName.replaceAll("\\", "/"));
  return extension.replace(".", "").toLowerCase();
}

function sanitizeOriginalName(originalName: string) {
  const base = path.posix.basename(originalName.replaceAll("\\", "/")).trim();
  return base || "resume";
}

function hasExpectedSignature(buffer: Buffer, mimeType: AllowedResumeMime) {
  if (mimeType === "application/pdf") {
    return buffer.subarray(0, 4).equals(PDF_SIGNATURE);
  }

  return buffer.subarray(0, 4).equals(ZIP_SIGNATURE);
}
