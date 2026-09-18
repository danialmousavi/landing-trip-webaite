import {
  ReactNode,
  SelectHTMLAttributes,
} from "react";

import {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

import styles from "./AdvertisingRequest.module.css";

import {
  ChevronIcon,
} from "./AdvertisingFormIcons";

export type SelectOption = {
  value: string;
  label: string;
};

type AdvertisingSelectFieldProps =
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;

    placeholder: string;

    icon: ReactNode;

    options: SelectOption[];

    registration: UseFormRegisterReturn;

    error?: FieldError;

    required?: boolean;
  };

export default function AdvertisingSelectField({
  label,
  placeholder,
  icon,
  options,
  registration,
  error,
  required = false,
  id,
  ...selectProps
}: AdvertisingSelectFieldProps) {
  return (
    <div className={styles.field}>
      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}

        {required && (
          <span className={styles.required}>
            *
          </span>
        )}
      </label>

      <div
        className={`${styles.selectWrapper} ${
          error ? styles.inputError : ""
        }`}
      >
        <span
          className={styles.inputIcon}
          aria-hidden="true"
        >
          {icon}
        </span>

        <span
          className={styles.inputDivider}
          aria-hidden="true"
        />

        <select
          id={id}
          className={styles.select}
          aria-invalid={!!error}
          {...selectProps}
          {...registration}
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <span
          className={styles.chevron}
          aria-hidden="true"
        >
          <ChevronIcon />
        </span>
      </div>

      {error && (
        <p className={styles.errorMessage}>
          {error.message}
        </p>
      )}
    </div>
  );
}