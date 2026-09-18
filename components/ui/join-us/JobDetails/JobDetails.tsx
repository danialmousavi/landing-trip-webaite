import styles from "./JobDetails.module.css";

export type JobMetaItem = {
  label: string;
  value: string;
};

export type JobSection = {
  title: string;
  description?: string;
  items?: string[];
};

export type JobDetailsProps = {
  title: string;
  highlights?: string[];
  sections: JobSection[];
  meta?: JobMetaItem[];
};

export default function JobDetails({
  title,
  highlights = [],
  sections,
  meta = [],
}: JobDetailsProps) {
  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.container}>
        {/* Header */}

        <div className={styles.header}>
          <h1 className={styles.title}>
            {title}
          </h1>

          {highlights.length > 0 && (
            <div className={styles.highlights}>
              {highlights.map((item, index) => (
                <div
                  className={styles.highlight}
                  key={`${item}-${index}`}
                >
                  <span
                    className={styles.check}
                    aria-hidden="true"
                  >
                    ✓
                  </span>

                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}

        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>
            شرح شغل و وظایف
          </h2>

          <div className={styles.sections}>
            {sections.map((section, index) => (
              <div
                className={styles.jobSection}
                key={`${section.title}-${index}`}
              >
                <h3>{section.title}</h3>

                {section.description && (
                  <p>{section.description}</p>
                )}

                {section.items &&
                  section.items.length > 0 && (
                    <ul>
                      {section.items.map(
                        (item, itemIndex) => (
                          <li
                            key={`${item}-${itemIndex}`}
                          >
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Meta information */}

        {meta.length > 0 && (
          <div className={styles.meta}>
            {meta.map((item, index) => (
              <div
                className={styles.metaRow}
                key={`${item.label}-${index}`}
              >
                <div className={styles.metaLabel}>
                  {item.label}
                </div>

                <div className={styles.metaValue}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}