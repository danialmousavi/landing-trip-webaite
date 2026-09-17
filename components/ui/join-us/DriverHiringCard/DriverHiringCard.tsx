"use client"
import styles from "./DriverHiringCard.module.css";

export type DriverHiringCardProps = {
  city: string;
  driverCount: number | string;
  title: string;
  description: string;
  onButtonClick?: () => void;
};

export default function DriverHiringCard({
  city,
  driverCount,
  title,
  description,
  onButtonClick,
}: DriverHiringCardProps) {
  return (
    <article className={styles.card} dir="rtl">
      <div className={styles.content}>
        <p className={styles.meta}>
          {city} - {driverCount} راننده
        </p>

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.description}>{description}</p>
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={onButtonClick}
      >
        ثبت نام
      </button>
    </article>
  );
}