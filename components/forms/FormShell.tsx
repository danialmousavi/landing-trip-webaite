"use client";

import { useRef, type ReactNode } from "react";

import styles from "./Forms.module.css";

export function useIdempotencyKey(_formId?: string) {
  const keyRef = useRef("");

  const ensure = () => {
    if (!keyRef.current) {
      keyRef.current = crypto.randomUUID();
    }
    return keyRef.current;
  };

  return { ensure };
}

type FormShellProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function FormShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: FormShellProps) {
  return (
    <section className={styles.shell} id={id}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {children}
    </section>
  );
}

export function SuccessState({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.success} role="status">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

export function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`${styles.field} ${className ?? ""}`}>
      <span className={styles.label}>{label}</span>
      {children}
      <span className={styles.error}>{error ?? ""}</span>
    </label>
  );
}

export function Honeypot() {
  return (
    <label className={styles.honeypot}>
      وب‌سایت
      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
    </label>
  );
}

export { styles as formStyles };
