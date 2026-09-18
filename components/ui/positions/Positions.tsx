"use client";

import { useRef, useState } from "react";

import DriverHiringCard, {
  type DriverHiringCardProps,
} from "../join-us/DriverHiringCard/DriverHiringCard";

import CorporateJobCard, {
  type CorporateJobCardProps,
} from "../join-us/CorporateJobCard/CorporateJobCard";

import Pagination from "../Pagination/Pagination";

import styles from "./Positions.module.css";

type DriverPositionsProps = {
  type: "driver";
  title: string;
  subtitle?: string;
  jobs: DriverHiringCardProps[];
  itemsPerPage?: number;
};

type CorporatePositionsProps = {
  type: "corporate";
  title: string;
  subtitle?: string;
  jobs: CorporateJobCardProps[];
  itemsPerPage?: number;
};

type PositionsProps = DriverPositionsProps | CorporatePositionsProps;

export default function Positions(props: PositionsProps) {
  const { title, subtitle, itemsPerPage = 20 } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(props.jobs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

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
    <section ref={sectionRef} className={styles.section} dir="rtl">
      <div className={styles.heading}>
        <h1 className={styles.title}>{title}</h1>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {/* Driver Positions */}

      {props.type === "driver" && (
        <div className={styles.grid}>
          {props.jobs.slice(startIndex, endIndex).map((job, index) => (
            <DriverHiringCard
              key={`${job.city}-${startIndex + index}`}
              {...job}
            />
          ))}
        </div>
      )}

      {/* Corporate Positions */}

      {props.type === "corporate" && (
        <div className={styles.grid}>
          {props.jobs.slice(startIndex, endIndex).map((job) => (
            <CorporateJobCard key={job.id} {...job} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
