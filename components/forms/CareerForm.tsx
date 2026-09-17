"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { careerFieldsSchema, type CareerFormInput } from "@/lib/forms";
import {
  Field,
  FormShell,
  Honeypot,
  SuccessState,
  formStyles as styles,
  useIdempotencyKey,
} from "./FormShell";
import { applyServerFieldErrors } from "./ContactForm";

export default function CareerForm({ standalone = true }: { standalone?: boolean }) {
  const { ensure } = useIdempotencyKey("careers");
  const inputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState("");
  const form = useForm<CareerFormInput>({
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
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const okType =
      allowed.includes(file.type) ||
      file.name.toLowerCase().endsWith(".pdf") ||
      file.name.toLowerCase().endsWith(".docx");
    if (!okType || file.size > 5_242_880 || file.size <= 0) {
      setResume(null);
      setResumeError("فقط فایل PDF یا DOCX تا سقف ۵ مگابایت پذیرفته می‌شود.");
      return;
    }
    setResumeError("");
    setResume(file);
  }

  const body = done ? (
    <SuccessState
      title="رزومه شما دریافت شد"
      body="در صورت تناسب با فرصت‌های اداری، با شما تماس گرفته می‌شود."
    />
  ) : (
    <form
      className={styles.grid}
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

        const response = await fetch("/api/forms/careers", {
          method: "POST",
          body: payload,
        });
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
          fields?: Record<string, string>;
        };
        if (response.ok) {
          setDone(true);
          return;
        }
        applyServerFieldErrors(data.fields, form.setError);
        if (data.fields?.resume) setResumeError(data.fields.resume);
        setFormError(data.error || "ارسال نشد، دوباره تلاش کنید.");
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
      <Field label="ایمیل" error={form.formState.errors.email?.message}>
        <input className={styles.control} type="email" {...form.register("email")} />
      </Field>
      <div className={`${styles.field} ${styles.full}`}>
        <span className={styles.label}>رزومه (PDF یا Word)</span>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          hidden
          onChange={(event) => onFile(event.target.files?.[0])}
        />
        <button
          type="button"
          className={`${styles.dropzone} ${dragOver ? styles.dropzoneActive : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            onFile(event.dataTransfer.files?.[0]);
          }}
        >
          {resume ? (
            <div className={styles.fileChip}>
              <span>
                {resume.name} ({Math.round(resume.size / 1024)} کیلوبایت)
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  setResume(null);
                }}
              >
                حذف
              </span>
            </div>
          ) : (
            <>
              <strong>فایل را بکشید و رها کنید</strong>
              <span>یا برای انتخاب از دستگاه ضربه بزنید / کلیک کنید</span>
            </>
          )}
        </button>
        <span className={styles.error}>{resumeError}</span>
      </div>
      {formError ? <p className={`${styles.formError} ${styles.full}`}>{formError}</p> : null}
      <div className={`${styles.actions} ${styles.full}`}>
        <button className="button button-brand" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "در حال ارسال..." : "ارسال رزومه"}
        </button>
      </div>
    </form>
  );

  if (!standalone) return body;

  return (
    <FormShell
      id="join-office"
      eyebrow="فرصت‌های شغلی"
      title="استخدام اداری"
      description="مشخصات و رزومه خود را ارسال کنید تا برای موقعیت‌های ستادی بررسی شود."
    >
      {body}
    </FormShell>
  );
}
