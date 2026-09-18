import styles from "./AdvertisingComparison.module.css";

export type ComparisonColumn = {
  key: string;
  label: string;
};

export type ComparisonRow = {
  feature: string;
  values: Record<string, string>;
};

type AdvertisingComparisonProps = {
  eyebrow?: string;
  title: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  highlightColumn?: string;
};

export default function AdvertisingComparison({
  eyebrow = "جدول مقایسه",
  title,
  columns,
  rows,
  highlightColumn,
}: AdvertisingComparisonProps) {
  return (
    <section
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.heading}>
        {eyebrow && (
          <span className={styles.eyebrow}>
            {eyebrow}
          </span>
        )}

        <h2 className={styles.title}>
          {title}
        </h2>
      </div>

      <div className={styles.tableScroll}>
        <div className={styles.table}>
          {/* Header */}

          <div className={styles.headerRow}>
            <div
              className={`${styles.cell} ${styles.featureHeader}`}
            >
              ویژگی
            </div>

            {columns.map((column) => (
              <div
                key={column.key}
                className={`${styles.cell} ${styles.columnHeader}`}
              >
                {column.label}
              </div>
            ))}
          </div>

          {/* Body */}

          <div className={styles.body}>
            {rows.map((row, rowIndex) => (
              <div
                className={styles.row}
                key={`${row.feature}-${rowIndex}`}
              >
                <div
                  className={`${styles.cell} ${styles.featureCell}`}
                >
                  <span className={styles.rowNumber}>
                    {toPersianNumber(rowIndex + 1)}.
                  </span>

                  <span>
                    {row.feature}
                  </span>
                </div>

                {columns.map((column) => {
                  const isHighlighted =
                    column.key === highlightColumn;

                  return (
                    <div
                      key={column.key}
                      className={`${styles.cell} ${
                        styles.valueCell
                      } ${
                        isHighlighted
                          ? styles.highlighted
                          : ""
                      }`}
                    >
                      {row.values[column.key] ?? "—"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function toPersianNumber(value: number) {
  return value.toLocaleString("fa-IR", {
    useGrouping: false,
  });
}