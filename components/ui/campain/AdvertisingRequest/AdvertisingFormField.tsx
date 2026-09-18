import {
  InputHTMLAttributes,
  ReactNode,
} from "react";

import {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

import styles from "./AdvertisingRequest.module.css";

type AdvertisingFormFieldProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;

    icon: ReactNode;

    registration: UseFormRegisterReturn;

    error?: FieldError;

    required?: boolean;
  };

export default function AdvertisingFormField({
  label,
  icon,
  registration,
  error,
  required = false,
  id,
  ...inputProps
}: AdvertisingFormFieldProps) {
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
        className={`${styles.inputWrapper} ${
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

        <input
          id={id}
          className={styles.input}
          aria-invalid={!!error}
          {...inputProps}
          {...registration}
        />
      </div>

      {error && (
        <p className={styles.errorMessage}>
          {error.message}
        </p>
      )}
    </div>
  );
}