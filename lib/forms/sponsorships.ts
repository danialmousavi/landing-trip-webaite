import { z } from "zod";

import {
  hasUnsafeMarkup,
  personNameSchema,
  phoneSchema,
  publicMetaSchema,
  sponsorshipDomains,
} from "./shared";

export const sponsorshipFormSchema = publicMetaSchema.extend({
  fullName: personNameSchema,
  phone: phoneSchema,
  brandName: z
    .string()
    .trim()
    .min(2, "نام برند باید حداقل ۲ حرف باشد.")
    .max(100, "نام برند نباید بیشتر از ۱۰۰ حرف باشد.")
    .refine((value) => !hasUnsafeMarkup(value), "متن واردشده مجاز نیست."),
  activityDomain: z.enum(sponsorshipDomains, {
    errorMap: () => ({ message: "حوزه فعالیت را انتخاب کنید." }),
  }),
});

export const sponsorshipFieldsSchema = sponsorshipFormSchema.omit({
  website: true,
  idempotencyKey: true,
});
