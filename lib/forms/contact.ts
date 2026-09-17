import { z } from "zod";

import {
  contactCategories,
  emailSchema,
  longTextSchema,
  personNameSchema,
  phoneSchema,
  publicMetaSchema,
} from "./shared";

export const contactFormSchema = publicMetaSchema.extend({
  firstName: personNameSchema,
  lastName: personNameSchema,
  phone: phoneSchema,
  email: emailSchema,
  category: z.enum(contactCategories, {
    errorMap: () => ({ message: "دسته‌بندی درخواست را انتخاب کنید." }),
  }),
  message: longTextSchema("شرح درخواست"),
});

export const contactFieldsSchema = contactFormSchema.omit({
  website: true,
  idempotencyKey: true,
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;
export type ContactFormFields = z.input<typeof contactFieldsSchema>;
