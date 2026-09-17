import Link from "next/link";

import CorporateJobCard, {
  CorporateJobCardProps,
} from "../CorporateJobCard/CorporateJobCard";

import styles from "./CorporateJobsSection.module.css";

type CorporateJobsSectionProps = {
  title: string;
  subtitle?: string;

  jobs: CorporateJobCardProps[];

  showAllText?: string;
  showAllHref?: string;
};

export default function CorporateJobsSection({
  title,
  subtitle,
  jobs,
  showAllText = "مشاهده فرصت‌های شغلی",
  showAllHref = "/jobs",
}: CorporateJobsSectionProps) {
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
          <CorporateJobCard
            key={`${job.title}-${index}`}
            {...job}
          />
        ))}
      </div>

      <Link
        href={showAllHref}
        className={styles.showAllLink}
      >
        {showAllText}
      </Link>
    </section>
  );
}