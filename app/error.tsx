"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Home,
  RefreshCw,
} from "lucide-react";

import styles from "./error.module.css";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <section className={styles.card}>
        <div className={styles.iconWrapper}>
          <AlertTriangle
            size={34}
            strokeWidth={1.7}
          />
        </div>

        <span className={styles.code}>
          خطای ۵۰۰
        </span>

        <h1 className={styles.title}>
          مشکلی پیش آمده است
        </h1>

        <p className={styles.description}>
          در پردازش درخواست شما مشکلی به وجود
          آمده. می‌توانید دوباره تلاش کنید یا به
          صفحه اصلی برگردید.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => reset()}
          >
            <RefreshCw
              size={17}
              strokeWidth={1.8}
            />

            <span>تلاش مجدد</span>
          </button>

          <Link
            href="/"
            className={styles.secondaryButton}
          >
            <Home
              size={17}
              strokeWidth={1.8}
            />

            <span>صفحه اصلی</span>
          </Link>
        </div>

        {error.digest && (
          <p className={styles.errorCode}>
            کد پیگیری: {error.digest}
          </p>
        )}

        <span
          className={styles.backgroundText}
          aria-hidden="true"
        >
          DOT ONE TRIP
        </span>
      </section>
    </main>
  );
}