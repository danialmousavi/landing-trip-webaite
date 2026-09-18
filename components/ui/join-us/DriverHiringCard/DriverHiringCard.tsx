import Link from "next/link";
import styles from "./DriverHiringCard.module.css";

export type DriverHiringCardProps = {
  id: string;
  city: string;
  driverCount: number | string;
  title: string;
  description: string;
  buttonText?: string;
};

export default function DriverHiringCard({
  id,
  city,
  driverCount,
  title,
  description,
  buttonText = "ثبت نام",
}: DriverHiringCardProps) {
  return (
    <article className={styles.card} dir="rtl">
      <div className={styles.content}>
        <p className={styles.meta}>
          {city} - {driverCount} راننده
        </p>

        <h3 className={styles.title}>
          {title}
        </h3>

        <p className={styles.description}>
          {description}
        </p>
      </div>

      <Link
        href={`/join-us/drivers/${id}`}
        className={styles.button}
      >
        {buttonText}
      </Link>
    </article>
  );
}