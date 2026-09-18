import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page} dir="rtl">
      <section className={styles.card}>
        {/* المان‌های تزئینی */}
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.lineOne} aria-hidden="true" />
        <div className={styles.lineTwo} aria-hidden="true" />

        <div className={styles.content}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            مسیر اشتباهه!
          </span>

          <div className={styles.errorCode} aria-hidden="true">
            <span>۴</span>

            <span className={styles.zero}>
              <span className={styles.zeroInner} />
            </span>

            <span>۴</span>
          </div>

          <h1 className={styles.title}>
            انگار این مسیر به مقصد نمی‌رسه
          </h1>

          <p className={styles.description}>
            صفحه‌ای که دنبالش هستید پیدا نشد.
            <br />
            می‌توانید به صفحه اصلی برگردید و مسیرتان را از نو شروع کنید.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              بازگشت به صفحه اصلی
            </Link>

            <Link href="/contact-us" className={styles.secondaryButton}>
              ارتباط با ما
            </Link>
          </div>
        </div>

        <span className={styles.bottomText}>
          DOT ONE TRIP
        </span>
      </section>
    </main>
  );
}