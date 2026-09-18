"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  sponsorshipDomainLabels,
  sponsorshipFieldsSchema,
  type SponsorshipFormFields,
} from "@/lib/forms";
import {
  Field,
  FormShell,
  Honeypot,
  SuccessState,
  formStyles as styles,
  useIdempotencyKey,
} from "./FormShell";
import { applyServerFieldErrors, submitJson } from "./ContactForm";

export default function SponsorshipForm() {
  const { ensure } = useIdempotencyKey("sponsorships");
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState("");
  const form = useForm<SponsorshipFormFields>({
    resolver: zodResolver(sponsorshipFieldsSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      brandName: "",
      activityDomain: undefined,
    },
  });

  return (
    <FormShell
      id="sponsorship"
      eyebrow="همکاری تبلیغاتی"
      title="درخواست حمایت و بازاریابی"
      description="نام مسئول، برند و حوزه فعالیت را وارد کنید تا تیم بازاریابی دات‌وان تریپ با شما هماهنگ شود."
    >
      {done ? (
        <SuccessState
          title="درخواست همکاری ثبت شد"
          body="کارشناسان بازاریابی پس از بررسی با شما تماس می‌گیرند."
        />
      ) : (
        <form
          className={styles.grid}
          onSubmit={form.handleSubmit(async (values) => {
            setFormError("");
            const result = await submitJson("/api/forms/sponsorships", {
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
          <Field label="نام و نام خانوادگی" error={form.formState.errors.fullName?.message}>
            <input className={styles.control} {...form.register("fullName")} />
          </Field>
          <Field label="شماره موبایل" error={form.formState.errors.phone?.message}>
            <input className={styles.control} {...form.register("phone")} />
          </Field>
          <Field label="نام برند یا شرکت" error={form.formState.errors.brandName?.message}>
            <input className={styles.control} {...form.register("brandName")} />
          </Field>
          <Field
            label="حوزه فعالیت"
            error={form.formState.errors.activityDomain?.message}
          >
            <select className={styles.control} {...form.register("activityDomain")}>
              <option value="">انتخاب کنید</option>
              {Object.entries(sponsorshipDomainLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          {formError ? <p className={`${styles.formError} ${styles.full}`}>{formError}</p> : null}
          <div className={`${styles.actions} ${styles.full}`}>
            <button className="button button-brand" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "در حال ارسال..." : "ارسال درخواست همکاری"}
            </button>
          </div>
        </form>
      )}
    </FormShell>
  );
}
