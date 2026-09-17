import Link from "next/link";

import DriverHiringCard, {
  DriverHiringCardProps,
} from "../DriverHiringCard/DriverHiringCard";

import styles from "./DriverHiringSection.module.css";

type DriverHiringSectionProps = {
  title: string;
  subtitle?: string;
  jobs: DriverHiringCardProps[];

  showAllText?: string;
  showAllHref?: string;
};

export default function DriverHiringSection({
  title,
  subtitle,
  jobs,
  showAllText = "مشاهده همه",
  showAllHref = "/hiring",
}: DriverHiringSectionProps) {
  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>

        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}
      </div>

      <div className={styles.grid}>
        {jobs.map((job, index) => (
          <DriverHiringCard
            key={`${job.city}-${index}`}
            {...job}
          />
        ))}
      </div>

      <Link
        href={showAllHref}
        className={styles.showAllButton}
      >
        {showAllText}
      </Link>
    </section>
  );
}