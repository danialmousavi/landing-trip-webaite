"use client";

import { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import logoDark from "@/public/figma/logo-footer.png";

import AdvertisingFormField from "./AdvertisingFormField";

import AdvertisingSelectField, {
  SelectOption,
} from "./AdvertisingSelectField";

import {
  CompanyIcon,
  GridIcon,
  PhoneIcon,
  UserIcon,
} from "./AdvertisingFormIcons";

import {
  advertisingFormSchema,
  AdvertisingFormValues,
} from "./advertisingRequest.schema";

import styles from "./AdvertisingRequest.module.css";

export type AdvertisingRequestFormProps = {
  onSubmit?: (
    data: AdvertisingFormValues
  ) => void | Promise<void>;
};

const activityOptions: SelectOption[] = [
  {
    value: "technology",
    label: "فناوری و تکنولوژی",
  },
  {
    value: "retail",
    label: "فروشگاه و خرده‌فروشی",
  },
  {
    value: "food",
    label: "غذا و رستوران",
  },
  {
    value: "finance",
    label: "مالی و بانکی",
  },
  {
    value: "health",
    label: "سلامت و زیبایی",
  },
  {
    value: "education",
    label: "آموزش",
  },
  {
    value: "automotive",
    label: "خودرو",
  },
  {
    value: "media",
    label: "رسانه و تبلیغات",
  },
  {
    value: "other",
    label: "سایر",
  },
];

export default function AdvertisingRequestForm({
  onSubmit,
}: AdvertisingRequestFormProps) {
  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm<AdvertisingFormValues>({
    resolver: zodResolver(
      advertisingFormSchema
    ),

    defaultValues: {
      fullName: "",
      phone: "",
      company: "",
      activity: "",
    },
  });

  const submitHandler = async (
    data: AdvertisingFormValues
  ) => {
    try {
      setSubmitError(null);

      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log(
          "Advertising form:",
          data
        );
      }

      reset();
    } catch {
      setSubmitError(
        "ارسال درخواست با مشکل مواجه شد. لطفاً دوباره تلاش کنید."
      );
    }
  };

  return (
    <form
      className={styles.formCard}
      onSubmit={handleSubmit(
        submitHandler
      )}
      noValidate
      dir="rtl"
    >
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <Image
            src={logoDark}
            alt="دات‌وان تریپ"
            width={140}
            height={50}
          />
        </div>
      </div>

      <h3 className={styles.formTitle}>
        لطفاً اطلاعات خود را وارد کنید
      </h3>

      <AdvertisingFormField
        id="advertising-fullName"
        label="نام و نام خانوادگی"
        type="text"
        autoComplete="name"
        placeholder="نام و نام خانوادگی خود را بنویسید..."
        icon={<UserIcon />}
        registration={register(
          "fullName"
        )}
        error={errors.fullName}
        required
      />

      <AdvertisingFormField
        id="advertising-phone"
        label="شماره تماس"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="شماره همراه خود را بنویسید..."
        icon={<PhoneIcon />}
        registration={register("phone")}
        error={errors.phone}
        required
      />

      <AdvertisingFormField
        id="advertising-company"
        label="نام شرکت یا برند"
        type="text"
        autoComplete="organization"
        placeholder="نام شرکت یا برند خود را بنویسید..."
        icon={<CompanyIcon />}
        registration={register(
          "company"
        )}
        error={errors.company}
      />

      <AdvertisingSelectField
        id="advertising-activity"
        label="حوزه فعالیت"
        placeholder="حوزه فعالیت خود را انتخاب کنید"
        icon={<GridIcon />}
        options={activityOptions}
        registration={register(
          "activity"
        )}
      />

      {submitError && (
        <p className={styles.submitError}>
          {submitError}
        </p>
      )}

      {isSubmitSuccessful &&
        !submitError && (
          <p
            className={
              styles.successMessage
            }
          >
            درخواست شما با موفقیت ثبت شد.
          </p>
        )}

      <button
        type="submit"
        className={styles.submitButton}
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