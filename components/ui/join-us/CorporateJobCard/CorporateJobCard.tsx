"use client"
import Image from "next/image";
import styles from "./CorporateJobCard.module.css";

export type CorporateJobLocation = {
  label: string;
  icon?: string;
};

export type CorporateJobCardProps = {
  title: string;

  employmentType: string;
  employmentIcon?: string;

  locations: CorporateJobLocation[];

  buttonText?: string;
  onButtonClick?: () => void;
};

export default function CorporateJobCard({
  title,
  employmentType,
  employmentIcon,
  locations,
  buttonText = "ثبت‌نام",
  onButtonClick,
}: CorporateJobCardProps) {
  return (
    <article className={styles.card} dir="rtl">
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.employment}>
          {employmentIcon && (
            <Image
              src={employmentIcon}
              alt=""
              width={24}
              height={24}
              className={styles.employmentIcon}
            />
          )}

          <span>{employmentType}</span>
        </div>

        <div className={styles.locations}>
          {locations.map((location, index) => (
            <div
              className={styles.location}
              key={`${location.label}-${index}`}
            >
              {location.icon && (
                <Image
                  src={location.icon}
                  alt=""
                  width={25}
                  height={25}
                  className={styles.locationIcon}
                />
              )}

              <span>{location.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </article>
  );
}