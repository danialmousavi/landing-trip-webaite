"use client";

import { useRef, useState } from "react";
import DriverHiringCard, {
  DriverHiringCardProps,
} from "../join-us/DriverHiringCard/DriverHiringCard";
import Pagination from "../Pagination/Pagination";
import styles from "./DriverPositions.module.css";

type DriverPositionsProps = {
  title: string;
  subtitle?: string;
  jobs: DriverHiringCardProps[];
  itemsPerPage?: number;
};

export default function DriverPositions({
  title,
  subtitle,
  jobs,
  itemsPerPage = 20,
}: DriverPositionsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const totalPages = Math.ceil(
    jobs.length / itemsPerPage
  );
  const startIndex =
    (currentPage - 1) * itemsPerPage;
  const endIndex =
    startIndex + itemsPerPage;
  const currentJobs = jobs.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.heading}>
        <h1 className={styles.title}>
          {title}
        </h1>

        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}
      </div>

      <div className={styles.grid}>
        {currentJobs.map((job, index) => (
          <DriverHiringCard
            key={`${job.city}-${startIndex + index}`}
            {...job}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}