"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { driverFieldsSchema, type DriverFormInput } from "@/lib/forms";
import {
  Field,
  FormShell,
  Honeypot,
  SuccessState,
  formStyles as styles,
  useIdempotencyKey,
} from "./FormShell";
import { applyServerFieldErrors, submitJson } from "./ContactForm";

export default function DriverForm({ standalone = true }: { standalone?: boolean }) {
  const { ensure } = useIdempotencyKey("drivers");
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState("");
  const form = useForm<DriverFormInput>({
    resolver: zodResolver(driverFieldsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      nationalId: "",
      province: "",
      city: "",
      address: "",
      description: "",
    },
  });

  const body = done ? (
    <SuccessState
      title="درخواست همکاری رانندگان ثبت شد"
      body="پس از بررسی مدارک، نتیجه از طریق تماس تلفنی اطلاع‌رسانی می‌شود."
    />
  ) : (
    <form
      className={styles.grid}
      onSubmit={form.handleSubmit(async (values) => {
        setFormError("");
        const result = await submitJson("/api/forms/drivers", {
          ...values,
          idempotencyKey: ensure(),
          website: "",
        });
        if (result.ok) {
          setDone(true);
          return;
        }
        applyServerFieldErrors(result.data.fields, form.setError);
        setFormError(result.data.error || "ارسال نشد، دوباره تلاش کنید.");
      })}
    >
      <Honeypot />
      <Field label="نام" error={form.formState.errors.firstName?.message}>
        <input className={styles.control} {...form.register("firstName")} />
      </Field>
      <Field label="نام خانوادگی" error={form.formState.errors.lastName?.message}>
        <input className={styles.control} {...form.register("lastName")} />
      </Field>
      <Field label="شماره موبایل" error={form.formState.errors.phone?.message}>
        <input className={styles.control} {...form.register("phone")} />
      </Field>
      <Field label="کد ملی" error={form.formState.errors.nationalId?.message}>
        <input className={styles.control} {...form.register("nationalId")} />
      </Field>
      <Field label="استان محل سکونت" error={form.formState.errors.province?.message}>
        <input className={styles.control} {...form.register("province")} />
      </Field>
      <Field label="شهر محل سکونت" error={form.formState.errors.city?.message}>
        <input className={styles.control} {...form.register("city")} />
      </Field>
      <Field label="آدرس" error={form.formState.errors.address?.message} className={styles.full}>
        <input className={styles.control} {...form.register("address")} />
      </Field>
      <Field
        label="توضیحات"
        error={form.formState.errors.description?.message}
        className={styles.full}
      >
        <textarea className={`${styles.control} ${styles.textarea}`} {...form.register("description")} />
      </Field>
      {formError ? <p className={`${styles.formError} ${styles.full}`}>{formError}</p> : null}
      <div className={`${styles.actions} ${styles.full}`}>
        <button className="button button-brand" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "در حال ارسال..." : "ارسال درخواست رانندگی"}
        </button>
      </div>
    </form>
  );

  if (!standalone) return body;

  return (
    <FormShell
      id="join-drivers"
      eyebrow="همکاری با ناوگان"
      title="استخدام رانندگان"
      description="اطلاعات هویتی و محل سکونت خود را وارد کنید تا پرونده همکاری رانندگی تشکیل شود."
    >
      {body}
    </FormShell>
  );
}
