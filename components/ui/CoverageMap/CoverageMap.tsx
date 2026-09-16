import React from "react";
import Image from "next/image";
import styles from "./CoverageMap.module.css";
import mapImage from "@/public/figma/iran-map.png"

export default function CoverageMap() {
  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.container}>
        {/* متن سمت راست */}
        <div className={styles.textContent}>
          <h2 className={styles.title}>دات‌وان، نزدیک‌تر از چیزی که فکر می‌کنید</h2>
          <p className={styles.description}>
            خدمات دات‌وان به‌صورت مرحله‌ای در شهرها و مناطق مختلف توسعه پیدا می‌کند.
            <br />
            شهر خود را پیدا کنید و از خدمات فعال در منطقه‌تان مطلع شوید.
          </p>
        </div>

        {/* نقشه سمت چپ */}
        <div className={styles.imageWrapper}>
          <Image
            src={mapImage}
            alt="نقشه پوشش‌دهی مناطق دات‌وان"
            width={600}
            height={480}
            className={styles.mapImage}
            priority
          />
        </div>
      </div>
    </section>
  );
}