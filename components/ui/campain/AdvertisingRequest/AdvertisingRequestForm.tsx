"use client";

import {
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  useForm,
  type FieldValues,
  type Path,
  type UseFormSetError,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import logoDark from "@/public/figma/logo-footer.png";

import AdvertisingFormField from "./AdvertisingFormField";

import AdvertisingSelectField, {
  type SelectOption,
} from "./AdvertisingSelectField";

import {
  CompanyIcon,
  GridIcon,
  PhoneIcon,
  UserIcon,
} from "./AdvertisingFormIcons";

import {
  sponsorshipDomainLabels,
  sponsorshipFieldsSchema,
  type SponsorshipFormFields,
} from "@/lib/forms";

import styles from "./AdvertisingRequest.module.css";

/* ========================================
   Types
======================================== */

export type AdvertisingRequestFormProps = {
  onSubmit?: (
    data: SponsorshipFormFields,
  ) => void | Promise<void>;
};

type ApiResponse = {
  error?: string;
  fields?: Record<string, string>;
};

/* ========================================
   API Helper
======================================== */

async function submitJson(
  url: string,
  body: unknown,
) {
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });

  const data = (await response
    .json()
    .catch(() => ({}))) as ApiResponse;

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

/* ========================================
   Server Validation Errors
======================================== */

function applyServerFieldErrors<
  T extends FieldValues,
>(
  fields: Record<string, string> | undefined,
  setError: UseFormSetError<T>,
) {
  if (!fields) return;

  for (const [name, message] of Object.entries(
    fields,
  )) {
    setError(name as Path<T>, {
      type: "server",
      message,
    });
  }
}

/* ========================================
   Idempotency Key
======================================== */

function useIdempotencyKey(
  _formId?: string,
) {
  const keyRef = useRef("");

  const ensure = () => {
    if (!keyRef.current) {
      keyRef.current =
        crypto.randomUUID();
    }

    return keyRef.current;
  };

  return {
    ensure,
  };
}

/* ========================================
   Activity Options
======================================== */

const activityOptions: SelectOption[] =
  Object.entries(
    sponsorshipDomainLabels,
  ).map(([value, label]) => ({
    value,
    label,
  }));

/* ========================================
   Component
======================================== */

export default function AdvertisingRequestForm({
  onSubmit,
}: AdvertisingRequestFormProps) {
  const { ensure } =
    useIdempotencyKey("sponsorships");

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [done, setDone] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SponsorshipFormFields>({
    resolver: zodResolver(
      sponsorshipFieldsSchema,
    ),

    defaultValues: {
      fullName: "",
      phone: "",
      brandName: "",
      activityDomain: undefined,
    },
  });

  /* ========================================
     Submit
  ======================================== */

  const submitHandler = async (
    data: SponsorshipFormFields,
  ) => {
    setSubmitError(null);

    /*
      اگر onSubmit از بیرون پاس داده شده باشد
    */
    if (onSubmit) {
      try {
        await onSubmit(data);

        reset();

        setDone(true);
      } catch {
        setSubmitError(
          "ارسال درخواست با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
        );
      }

      return;
    }

    /*
      ارسال به Backend
    */
    const result = await submitJson(
      "/api/forms/sponsorships",
      {
        ...data,

        idempotencyKey: ensure(),

        website: "",
      },
    );

    /*
      Success
    */
    if (result.ok) {
      reset();

      setDone(true);

      return;
    }

    /*
      Server field errors
    */
    applyServerFieldErrors<SponsorshipFormFields>(
      result.data.fields,
      setError,
    );

    /*
      General server error
    */
    setSubmitError(
      result.data.error ||
        "ارسال نشد، دوباره تلاش کنید.",
    );
  };

  /* ========================================
     Success State
  ======================================== */

  if (done) {
    return (
      <div
        className={styles.formCard}
        dir="rtl"
      >
        <div
          className={styles.logoWrapper}
        >
          <div className={styles.logo}>
            <Image
              src={logoDark}
              alt="دات‌وان تریپ"
              width={140}
              height={50}
            />
          </div>
        </div>

        <div
          className={
            styles.successState
          }
        >
          <h3
            className={styles.formTitle}
          >
            درخواست همکاری ثبت شد
          </h3>

          <p
            className={
              styles.successMessage
            }
          >
            کارشناسان بازاریابی پس از
            بررسی با شما تماس می‌گیرند.
          </p>
        </div>
      </div>
    );
  }

  /* ========================================
     Form
  ======================================== */

  return (
    <form
      className={styles.formCard}
      onSubmit={handleSubmit(
        submitHandler,
      )}
      noValidate
      dir="rtl"
    >
      {/* Logo */}

      <div
        className={styles.logoWrapper}
      >
        <div className={styles.logo}>
          <Image
            src={logoDark}
            alt="دات‌وان تریپ"
            width={140}
            height={50}
          />
        </div>
      </div>

      {/* Title */}

      <h3 className={styles.formTitle}>
        لطفاً اطلاعات خود را وارد کنید
      </h3>

      {/* Full Name */}

      <AdvertisingFormField
        id="advertising-fullName"
        label="نام و نام خانوادگی"
        type="text"
        autoComplete="name"
        placeholder="نام و نام خانوادگی خود را بنویسید..."
        icon={<UserIcon />}
        registration={register(
          "fullName",
        )}
        error={errors.fullName}
        required
      />

      {/* Phone */}

      <AdvertisingFormField
        id="advertising-phone"
        label="شماره تماس"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="شماره همراه خود را بنویسید..."
        icon={<PhoneIcon />}
        registration={register(
          "phone",
        )}
        error={errors.phone}
        required
      />

      {/* Company */}

      <AdvertisingFormField
        id="advertising-company"
        label="نام شرکت یا برند"
        type="text"
        autoComplete="organization"
        placeholder="نام شرکت یا برند خود را بنویسید..."
        icon={<CompanyIcon />}
        registration={register(
          "brandName",
        )}
        error={errors.brandName}
      />

      {/* Activity */}

      <AdvertisingSelectField
        id="advertising-activity"
        label="حوزه فعالیت"
        placeholder="حوزه فعالیت خود را انتخاب کنید"
        icon={<GridIcon />}
        options={activityOptions}
        registration={register(
          "activityDomain",
        )}
        error={
          errors.activityDomain
        }
      />

      {/* Server Error */}

      {submitError && (
        <p
          className={
            styles.submitError
          }
        >
          {submitError}
        </p>
      )}

      {/* Submit */}

      <button
        type="submit"
        className={
          styles.submitButton
        }
        disabled={isSubmitting}
      >
        <span>
          {isSubmitting
            ? "در حال ارسال..."
            : "ثبت درخواست"}
        </span>
      </button>
    </form>
  );
}