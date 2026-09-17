"use client";

import styles from "./Pagination.module.css";
import leftChev from "@/public/figma/svgs/leftChev.svg";
import rightChev from "@/public/figma/svgs/rightChev.svg";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <nav className={styles.pagination} aria-label="صفحه‌بندی" dir="ltr">
      <button
        type="button"
        className={styles.arrowButton}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="صفحه قبلی"
      >
        <img src={leftChev.src} alt="" className={styles.arrowIcon} />
      </button>

      <div className={styles.pages}>
        {paginationItems.map((item, index) => {
          if (item === "...") {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }

          const isActive = item === currentPage;

          return (
            <button
              key={item}
              type="button"
              className={`${styles.pageButton} ${
                isActive ? styles.activePage : ""
              }`}
              onClick={() => handlePageChange(item)}
              aria-current={isActive ? "page" : undefined}
            >
              {toPersianNumber(item)}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.arrowButton}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="صفحه بعدی"
      >
             <img src={rightChev.src} alt="" className={styles.arrowIcon} />

      </button>
    </nav>
  );
}

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): Array<number | "..."> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, "...", totalPages];
}

function toPersianNumber(value: number) {
  return value.toLocaleString("fa-IR", {
    useGrouping: false,
  });
}
