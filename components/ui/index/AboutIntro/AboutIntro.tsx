import styles from "./AboutIntro.module.css";

type AboutIntroProps = {
  badge?: string;
  title: string;
  description: React.ReactNode;
};

export default function AboutIntro({
  badge = "درباره دات‌وان تریپ",
  title,
  description,
}: AboutIntroProps) {
  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.container}>
        {/* Right Side */}
        <div className={styles.heading}>
          {badge && (
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              {badge}
            </span>
          )}

          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* Left Side */}
        <div className={styles.content}>
          <div className={styles.description}>
            {description}
          </div>
        </div>
      </div>
    </section>
  );
}