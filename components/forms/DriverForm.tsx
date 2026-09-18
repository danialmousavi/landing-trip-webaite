"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Send } from "lucide-react";

import {
  driverFieldsSchema,
  type DriverFormFields,
} from "@/lib/forms";

import {
  Field,
  Honeypot,
  SuccessState,
  useIdempotencyKey,
} from "./FormShell";

import {
  applyServerFieldErrors,
  submitJson,
} from "./ContactForm";

import styles from "./DriverForm.module.css";

export default function DriverForm() {
  const { ensure } = useIdempotencyKey("drivers");

  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState("");

  const form = useForm<DriverFormFields>({
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

  if (done) {
    return (
      <section className={styles.section} dir="rtl">
        <div className={styles.successWrapper}>
          <SuccessState
            title="درخواست همکاری رانندگان ثبت شد"
            body="پس از بررسی مدارک، نتیجه از طریق تماس تلفنی اطلاع‌رسانی می‌شود."
          />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>
          ارسال درخواست
        </h2>

        <form
          className={styles.form}
          onSubmit={form.handleSubmit(async (values) => {
            setFormError("");

            const result = await submitJson(
              "/api/forms/drivers",
              {
                ...values,
                idempotencyKey: ensure(),
                website: "",
              },
            );

            if (result.ok) {
              setDone(true);
              return;
            }

            applyServerFieldErrors(
              result.data.fields,
              form.setError,
            );

            setFormError(
              result.data.error ||
                "ارسال نشد، دوباره تلاش کنید.",
            );
          })}
        >
          <Honeypot />

          {/* نام */}
          <Field
            label="نام"
            error={
              form.formState.errors.firstName?.message
            }
          >
            <input
              className={styles.control}
              placeholder="نام خود را وارد کنید"
              autoComplete="given-name"
              {...form.register("firstName")}
            />
          </Field>

          {/* نام خانوادگی */}
          <Field
            label="نام خانوادگی"
            error={
              form.formState.errors.lastName?.message
            }
          >
            <input
              className={styles.control}
              placeholder="نام خانوادگی خود را وارد کنید"
              autoComplete="family-name"
              {...form.register("lastName")}
            />
          </Field>

          {/* شماره تماس */}
          <Field
            label="شماره تماس"
            error={
              form.formState.errors.phone?.message
            }
          >
            <input
              className={`${styles.control} ${styles.phoneInput}`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="شماره خود را وارد کنید"
              {...form.register("phone")}
            />
          </Field>

          {/* کد ملی */}
          <Field
            label="کد ملی"
            error={
              form.formState.errors.nationalId?.message
            }
          >
            <input
              className={`${styles.control} ${styles.nationalInput}`}
              inputMode="numeric"
              autoComplete="off"
              maxLength={15}
              placeholder="کد ملی خود را وارد کنید"
              {...form.register("nationalId")}
            />
          </Field>

          {/* استان */}
          <Field
            label="استان"
            error={
              form.formState.errors.province?.message
            }
          >
            <div className={styles.selectWrapper}>
              <input
                className={`${styles.control} ${styles.selectControl}`}
                placeholder="استان خود را انتخاب کنید"
                {...form.register("province")}
              />

              <ChevronDown
                className={styles.selectIcon}
                size={17}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>
          </Field>

          {/* شهر */}
          <Field
            label="شهر"
            error={
              form.formState.errors.city?.message
            }
          >
            <div className={styles.selectWrapper}>
              <input
                className={`${styles.control} ${styles.selectControl}`}
                placeholder="شهر خود را انتخاب کنید"
                {...form.register("city")}
              />

              <ChevronDown
                className={styles.selectIcon}
                size={17}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>
          </Field>

          {/* آدرس */}
          <Field
            label="آدرس"
            error={
              form.formState.errors.address?.message
            }
            className={styles.full}
          >
            <input
              className={styles.control}
              placeholder="آدرس خود را وارد کنید"
              autoComplete="street-address"
              {...form.register("address")}
            />
          </Field>

          {/* توضیحات */}
          <Field
            label="توضیحات"
            error={
              form.formState.errors.description?.message
            }
            className={styles.full}
          >
            <textarea
              className={`${styles.control} ${styles.textarea}`}
              placeholder="توضیحات خود را بنویسید..."
              {...form.register("description")}
            />
          </Field>

          {formError && (
            <p
              className={`${styles.formError} ${styles.full}`}
            >
              {formError}
            </p>
          )}

          <div
            className={`${styles.actions} ${styles.full}`}
          >
            <button
              className={styles.submitButton}
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              <span>
                {form.formState.isSubmitting
                  ? "در حال ارسال..."
                  : "ارسال"}
              </span>

              {!form.formState.isSubmitting && (
                <Send
                  size={16}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}