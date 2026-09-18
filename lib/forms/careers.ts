import { z } from "zod";

import {
  emailSchema,
  personNameSchema,
  phoneSchema,
  publicMetaSchema,
} from "./shared";

export const careerFormSchema = publicMetaSchema.extend({
  firstName: personNameSchema,
  lastName: personNameSchema,
  phone: phoneSchema,
  email: emailSchema,
});

export const careerFieldsSchema = careerFormSchema.omit({
  website: true,
  idempotencyKey: true,
});

export type CareerFormInput = z.input<typeof careerFormSchema>;
export type CareerFormValues = z.output<typeof careerFormSchema>;
export type CareerFormFields = z.input<typeof careerFieldsSchema>;
