"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Upload } from "lucide-react";

import {
  careerFieldsSchema,
  isClientAllowedResume,
  RESUME_ACCEPT,
  RESUME_TYPE_ERROR,
  type CareerFormFields,
} from "@/lib/forms";

import {
  Field,
  Honeypot,
  SuccessState,
  useIdempotencyKey,
} from "./FormShell";

import { applyServerFieldErrors } from "./ContactForm";

import styles from "./CareerForm.module.css";

export default function CareerForm() {
  const { ensure } = useIdempotencyKey("careers");

  const inputRef = useRef<HTMLInputElement>(null);

  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState("");

  const form = useForm<CareerFormFields>({
    resolver: zodResolver(careerFieldsSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  function onFile(file: File | undefined) {
    if (!file) return;

    if (!isClientAllowedResume(file)) {
      setResume(null);
      setResumeError(RESUME_TYPE_ERROR);
      return;
    }

    setResumeError("");
    setResume(file);
  }

  if (done) {
    return (
      <section className={styles.section} dir="rtl">
        <div className={styles.successWrapper}>
          <SuccessState
            title="رزومه شما دریافت شد"
            body="در صورت تناسب با فرصت‌های اداری، با شما تماس گرفته می‌شود."
          />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>
          ارسال رزومه
        </h2>

        <form
          className={styles.form}
          onSubmit={form.handleSubmit(async (values) => {
            setFormError("");

            if (!resume) {
              setResumeError("رزومه را بارگذاری کنید.");
              return;
            }

            const payload = new FormData();

            payload.set("firstName", values.firstName);
            payload.set("lastName", values.lastName);
            payload.set("phone", values.phone);
            payload.set("email", values.email);
            payload.set("idempotencyKey", ensure());
            payload.set("website", "");
            payload.set("resume", resume);

            const response = await fetch(
              "/api/forms/careers",
              {
                method: "POST",
                body: payload,
              },
            );

            const data = (await response
              .json()
              .catch(() => ({}))) as {
              error?: string;
              fields?: Record<string, string>;
            };

            if (response.ok) {
              setDone(true);
              return;
            }

            applyServerFieldErrors(
              data.fields,
              form.setError,
            );

            if (data.fields?.resume) {
              setResumeError(data.fields.resume);
            }

            setFormError(
              data.error ||
                "ارسال نشد، دوباره تلاش کنید.",
            );
          })}
        >
          <Honeypot />

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

          <Field
            label="شماره تماس"
            error={
              form.formState.errors.phone?.message
            }
          >
            <input
              className={styles.control}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="شماره خود را وارد کنید"
              {...form.register("phone")}
            />
          </Field>

          <Field
            label="ایمیل"
            error={
              form.formState.errors.email?.message
            }
          >
            <input
              className={styles.control}
              type="email"
              autoComplete="email"
              placeholder="ایمیل خود را وارد کنید"
              {...form.register("email")}
            />
          </Field>

          <div className={styles.uploadField}>
            <input
              ref={inputRef}
              type="file"
              accept={RESUME_ACCEPT}
              hidden
              onChange={(event) =>
                onFile(event.target.files?.[0])
              }
            />

            <button
              type="button"
              className={`${styles.dropzone} ${
                dragOver
                  ? styles.dropzoneActive
                  : ""
              }`}
              onClick={() =>
                inputRef.current?.click()
              }
              onDragOver={(event) => {
                event.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => {
                setDragOver(false);
              }}
              onDrop={(event) => {
                event.preventDefault();

                setDragOver(false);

                onFile(
                  event.dataTransfer.files?.[0],
                );
              }}
            >
              {resume ? (
                <div className={styles.fileChip}>
                  <Upload
                    size={22}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />

                  <div
                    className={
                      styles.fileInformation
                    }
                  >
                    <strong>
                      {resume.name}
                    </strong>

                    <span>
                      {Math.round(
                        resume.size / 1024,
                      )}{" "}
                      کیلوبایت
                    </span>
                  </div>

                  <span
                    className={styles.removeFile}
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();

                      setResume(null);

                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                    }}
                  >
                    حذف
                  </span>
                </div>
              ) : (
                <div
                  className={styles.uploadContent}
                >
                  <Upload
                    size={27}
                    strokeWidth={1.7}
                    className={styles.uploadIcon}
                    aria-hidden="true"
                  />

                  <span>
                    رزومه خود را ارسال کنید
                  </span>
                </div>
              )}
            </button>

            {resumeError && (
              <span
                className={styles.resumeError}
              >
                {resumeError}
              </span>
            )}
          </div>

          {formError && (
            <p className={styles.formError}>
              {formError}
            </p>
          )}

          <div className={styles.actions}>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={
                form.formState.isSubmitting
              }
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