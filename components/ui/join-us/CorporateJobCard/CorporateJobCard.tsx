"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./CorporateJobCard.module.css";

export type CorporateJobLocation = {
  label: string;
  icon?: string;
};

export type CorporateJobCardProps = {
  id: string;
  title: string;
  employmentType: string;
  locations: CorporateJobLocation[];
};

export default function CorporateJobCard({
  id,
  title,
  employmentType,
  locations,
}: CorporateJobCardProps) {
  return (
    <article className={styles.card} dir="rtl">
      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <div className={styles.employment}>
            <Image
              src={"/figma/svgs/clock.svg"}
              alt=""
              width={24}
              height={24}
              className={styles.employmentIcon}
            />

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

      <Link
        href={`/join-us/organizational/${id}`}
        className={styles.button}
      >
        ثبت نام
      </Link>
    </article>
  );
}