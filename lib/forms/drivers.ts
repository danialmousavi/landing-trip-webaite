import { z } from "zod";

import {
  longTextSchema,
  nationalIdSchema,
  personNameSchema,
  phoneSchema,
  publicMetaSchema,
} from "./shared";
import { hasUnsafeMarkup } from "./shared";

const placeSchema = z
  .string()
  .trim()
  .min(2, "این فیلد باید حداقل ۲ حرف باشد.")
  .max(80, "این فیلد نباید بیشتر از ۸۰ حرف باشد.")
  .refine((value) => !hasUnsafeMarkup(value), "متن واردشده مجاز نیست.");

export const driverFormSchema = publicMetaSchema.extend({
  firstName: personNameSchema,
  lastName: personNameSchema,
  phone: phoneSchema,
  nationalId: nationalIdSchema,
  province: placeSchema,
  city: placeSchema,
  address: z
    .string()
    .trim()
    .min(8, "آدرس باید حداقل ۸ حرف باشد.")
    .max(300, "آدرس نباید بیشتر از ۳۰۰ حرف باشد.")
    .refine((value) => !hasUnsafeMarkup(value), "متن واردشده مجاز نیست."),
  description: longTextSchema("توضیحات"),
});

export const driverFieldsSchema = driverFormSchema.omit({
  website: true,
  idempotencyKey: true,
});
