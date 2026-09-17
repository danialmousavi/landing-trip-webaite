export const ALLOWED_RESUME_TYPES = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
} as const;

export type AllowedResumeMime = keyof typeof ALLOWED_RESUME_TYPES;
export type ResumeAttachmentKind = "pdf" | "doc" | "docx";

const MIME_ALIASES: Record<string, AllowedResumeMime> = {
  "application/pdf": "application/pdf",
  "application/x-pdf": "application/pdf",
  "application/msword": "application/msword",
  "application/x-msword": "application/msword",
  "application/doc": "application/msword",
  "application/vnd.ms-word": "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const RESUME_TYPE_ERROR =
  "فقط فایل PDF، DOC یا DOCX تا سقف ۵ مگابایت پذیرفته می‌شود.";

export function canonicalizeMime(
  mimeType?: string | null,
): AllowedResumeMime | null {
  if (!mimeType) return null;
  return MIME_ALIASES[mimeType.toLowerCase().split(";")[0]?.trim() ?? ""] ?? null;
}

export function resumeAttachmentKind(
  mimeType?: string | null,
  originalName?: string | null,
): ResumeAttachmentKind | null {
  const mime = canonicalizeMime(mimeType);
  const name = (originalName ?? "").toLowerCase();
  if (mime === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    return "docx";
  }
  if (mime === "application/msword" || name.endsWith(".doc")) return "doc";
  return null;
}

export function isClientAllowedResume(file: File) {
  const name = file.name.toLowerCase();
  const mime = canonicalizeMime(file.type);
  const okType =
    Boolean(mime) ||
    name.endsWith(".pdf") ||
    name.endsWith(".docx") ||
    (name.endsWith(".doc") && !name.endsWith(".docx"));
  return okType && file.size > 0 && file.size <= 5_242_880;
}
