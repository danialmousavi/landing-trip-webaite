import { z } from "zod";

export const NAME_PATTERN =
  /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\u200c\u200d .'-]{2,50}$/;

export const contactCategories = [
  "general",
  "urgent",
  "enterprise",
  "car_ride",
  "other",
] as const;

export const sponsorshipDomains = [
  "tech",
  "real_estate",
  "finance",
  "retail",
  "transport",
  "media",
  "other",
] as const;

export const submissionTypes = [
  "contact",
  "driver",
  "career",
  "sponsorship",
] as const;

export const submissionStatuses = [
  "new",
  "in_review",
  "contacted",
  "closed",
] as const;

export type ContactCategory = (typeof contactCategories)[number];
export type SponsorshipDomain = (typeof sponsorshipDomains)[number];
export type SubmissionType = (typeof submissionTypes)[number];
export type SubmissionStatus = (typeof submissionStatuses)[number];

export const contactCategoryLabels: Record<ContactCategory, string> = {
  general: "درخواست عمومی",
  urgent: "درخواست فوری",
  enterprise: "درخواست سازمانی",
  car_ride: "درخواست سفر",
  other: "سایر",
};

export const sponsorshipDomainLabels: Record<SponsorshipDomain, string> = {
  tech: "شرکت فناوری",
  real_estate: "املاک",
  finance: "خدمات مالی",
  retail: "خرده‌فروشی",
  transport: "حمل‌ونقل",
  media: "رسانه و تبلیغات",
  other: "سایر",
};

export const submissionTypeLabels: Record<SubmissionType, string> = {
  contact: "تماس با ما",
  driver: "استخدام راننده",
  career: "فرصت اداری",
  sponsorship: "حمایت و تبلیغات",
};

export const submissionStatusLabels: Record<SubmissionStatus, string> = {
  new: "جدید",
  in_review: "در حال بررسی",
  contacted: "تماس گرفته‌شده",
  closed: "بسته‌شده",
};

export function hasUnsafeMarkup(value: string) {
  return /[<>]|javascript:|data:text\/html/i.test(value);
}

export function normalizeIranianMobile(input: string) {
  const digits = input.replace(/[^\d]/g, "");
  let local = digits;
  if (local.startsWith("0098")) local = local.slice(4);
  else if (local.startsWith("98") && local.length >= 12) local = local.slice(2);
  if (local.startsWith("9") && local.length === 10) local = `0${local}`;
  if (!/^09\d{9}$/.test(local)) return null;
  return local;
}

export function isValidIranianNationalId(input: string) {
  if (!/^\d{10}$/.test(input)) return false;
  if (/^(\d)\1{9}$/.test(input)) return false;

  const check = Number(input[9]);
  const sum = input
    .slice(0, 9)
    .split("")
    .reduce((total, digit, index) => total + Number(digit) * (10 - index), 0);
  const remainder = sum % 11;
  return remainder < 2 ? check === remainder : check === 11 - remainder;
}

export const honeypotSchema = z
  .string()
  .max(0, "ارسال نامعتبر است.")
  .optional()
  .or(z.literal(""));

export const idempotencyKeySchema = z
  .string()
  .uuid("شناسه ارسال نامعتبر است.");

export const personNameSchema = z
  .string()
  .trim()
  .min(2, "نام باید حداقل ۲ حرف باشد.")
  .max(50, "نام نباید بیشتر از ۵۰ حرف باشد.")
  .regex(NAME_PATTERN, "فقط حروف فارسی یا انگلیسی مجاز است.")
  .refine((value) => !hasUnsafeMarkup(value), "متن واردشده مجاز نیست.");

export const phoneSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const normalized = normalizeIranianMobile(value);
    if (!normalized) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "شماره موبایل معتبر وارد کنید.",
      });
      return z.NEVER;
    }
    return normalized;
  });

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "ایمیل بیش از حد طولانی است.")
  .email("ایمیل معتبر وارد کنید.")
  .refine((value) => !hasUnsafeMarkup(value), "ایمیل نامعتبر است.");

export const longTextSchema = (label: string) =>
  z
    .string()
    .trim()
    .min(20, `${label} باید حداقل ۲۰ حرف باشد.`)
    .max(2000, `${label} نباید بیشتر از ۲۰۰۰ حرف باشد.`)
    .refine((value) => !hasUnsafeMarkup(value), "متن واردشده مجاز نیست.");

export const nationalIdSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const digits = value.replace(/[^\d]/g, "");
    if (!isValidIranianNationalId(digits)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "کد ملی معتبر وارد کنید.",
      });
      return z.NEVER;
    }
    return digits;
  });

export const publicMetaSchema = z.object({
  website: honeypotSchema,
  idempotencyKey: idempotencyKeySchema,
});
