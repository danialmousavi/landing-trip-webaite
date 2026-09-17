"use client";

import { useEffect, useState, type ReactNode } from "react";

import styles from "./Forms.module.css";

const STORAGE_PREFIX = "trip-form-id:";

export function useIdempotencyKey(formId: string) {
  const [key, setKey] = useState("");

  useEffect(() => {
    const storageKey = `${STORAGE_PREFIX}${formId}`;
    try {
      const existing = sessionStorage.getItem(storageKey);
      if (existing) {
        setKey(existing);
        return;
      }
      const next = crypto.randomUUID();
      sessionStorage.setItem(storageKey, next);
      setKey(next);
    } catch {
      setKey(crypto.randomUUID());
    }
  }, [formId]);

  const ensure = () => {
    if (key) return key;
    const next = crypto.randomUUID();
    setKey(next);
    try {
      sessionStorage.setItem(`${STORAGE_PREFIX}${formId}`, next);
    } catch {
      // ignore storage failures; in-memory key still prevents double-clicks
    }
    return next;
  };

  return { key, ensure };
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
