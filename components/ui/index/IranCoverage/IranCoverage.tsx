import Image, { StaticImageData } from "next/image";
import styles from "./IranCoverage.module.css";

export type CoverageItem = {
  city: string;
  value: number;
};

type IranCoverageProps = {
  title: string;
  subtitle?: string;

  mapImage: string | StaticImageData;
  mapAlt?: string;

  items: CoverageItem[];

  description?: React.ReactNode;
};

export default function IranCoverage({
  title,
  subtitle,
  mapImage,
  mapAlt = "نقشه پوشش دات‌وان تریپ در ایران",
  items,
  description,
}: IranCoverageProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.container}>
        {/* Right Side */}
        <div className={styles.content}>
          <div className={styles.heading}>
            <h2 className={styles.title}>{title}</h2>

            {subtitle && (
              <p className={styles.subtitle}>
                {subtitle}
              </p>
            )}
          </div>

          <div className={styles.chart}>
            {items.map((item) => {
              const width = (item.value / maxValue) * 100;

              return (
                <div
                  className={styles.chartRow}
                  key={item.city}
                >
                  <span className={styles.city}>
                    {item.city}
                  </span>

                  <div className={styles.barArea}>
                    <div
                      className={styles.bar}
                      style={{
                        width: `${width}%`,
                      }}
                    >
                      <span className={styles.value}>
                        {toPersianNumber(item.value)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left Side */}
        <div className={styles.mapColumn}>
          <div className={styles.mapWrapper}>
            <Image
              src={mapImage}
              alt={mapAlt}
              fill
              className={styles.mapImage}
              sizes="(max-width: 700px) 85vw, (max-width: 1000px) 45vw, 520px"
            />
          </div>
        </div>
      </div>

      {description && (
        <div className={styles.bottomDescription}>
          {description}
        </div>
      )}
    </section>
  );
}

function toPersianNumber(value: number) {
  return value.toLocaleString("fa-IR", {
    useGrouping: false,
  });
}