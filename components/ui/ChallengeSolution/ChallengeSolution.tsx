import Image, { type StaticImageData } from "next/image";

import styles from "./ChallengeSolution.module.css";

export type ChallengeRow = {
  challenge: string;
  solution: string;
};

type Media = {
  src: StaticImageData | string;
  alt: string;
};

type ChallengeSolutionProps = {
  title?: string;
  description?: string;
  challengeHeading?: string;
  solutionHeading?: string;
  rows?: ChallengeRow[];
  cabin?: Media;
  fleet?: Media;
};

const defaultRows: ChallengeRow[] = [
  {
    challenge: "هماهنگی چندین سرویس و مسیر",
    solution: "تعریف و هماهنگی سرویس‌ها در یک چارچوب مشخص",
  },
  {
    challenge: "مدیریت خودرو و راننده",
    solution: "تخصیص و هماهنگی منابع متناسب با سرویس",
  },
  {
    challenge: "تغییرات در برنامه جابه‌جایی",
    solution: "امکان هماهنگی سرویس متناسب با نیازهای سازمان",
  },
  {
    challenge: "نبود دید یکپارچه روی سرویس‌ها",
    solution: "ارائه اطلاعات متمرکز برای پیگیری و مدیریت بهتر",
  },
];

export default function ChallengeSolution({
  title,
  description = "مدیریت جابه‌جایی کارکنان و برنامه‌های سازمانی، با افزایش تعداد مسیرها، خودروها و سرویس‌ها پیچیده‌تر می‌شود. دات‌وان تریپ با ارائه یک راهکار یکپارچه، بخشی از این پیچیدگی را از دوش سازمان برمی‌دارد.",
  challengeHeading = "چالش‌ها",
  solutionHeading = "راهکار دات‌وان",
  rows = defaultRows,
  cabin = {
    src: "/figma/png/cars-insideCabin.png",
    alt: "کابین هوشمند خودروی دات‌وان تریپ",
  },
  fleet = {
    src: "/figma/png/cars-navy.jpg",
    alt: "ناوگان خودروهای دات‌وان تریپ",
  },
}: ChallengeSolutionProps) {
  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.shell}>
        <div className={styles.photos}>
          <div className={styles.cabinFrame}>
            <Image
              src={cabin.src}
              alt={cabin.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 70vw, 360px"
              className={styles.photo}
            />
          </div>
          <div className={styles.fleetFrame}>
            <Image
              src={fleet.src}
              alt={fleet.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 60vw, 280px"
              className={styles.photo}
            />
          </div>
        </div>

        <div className={styles.top}>
          <div className={styles.copy}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.headings}>
            <h3>{challengeHeading}</h3>
            <h3>{solutionHeading}</h3>
          </div>
        </div>

        <div
          className={styles.table}
          role="table"
          aria-label={`${challengeHeading} و ${solutionHeading}`}
        >
          {rows.map((row, index) => (
            <div className={styles.row} role="row" key={`${row.challenge}-${index}`}>
              <div className={styles.cell} role="cell" data-label={challengeHeading}>
                {row.challenge}
              </div>
              <div className={styles.cell} role="cell" data-label={solutionHeading}>
                {row.solution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
