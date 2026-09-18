import { z } from "zod";

export const advertisingFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "نام و نام خانوادگی را وارد کنید")
    .max(80, "نام و نام خانوادگی بیش از حد طولانی است"),

  phone: z
    .string()
    .trim()
    .min(1, "شماره تماس را وارد کنید")
    .regex(
      /^(\+98|0098|98|0)?9\d{9}$/,
      "شماره موبایل معتبر نیست"
    ),

  company: z
    .string()
    .trim()
    .max(100, "نام شرکت یا برند بیش از حد طولانی است")
    .optional(),

  activity: z.string().optional(),
});

export type AdvertisingFormValues = z.infer<
  typeof advertisingFormSchema
>;