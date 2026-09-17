import React from "react";
import Image from "next/image";
import styles from "./FutureTransportBanner.module.css";
import taxiIcon from "@/public/figma/taxi.png";

import bannerImage from "@/public/figma/watermark.png"; 

export default function FutureTransportBanner() {
  return (
    <section className={styles.sectionContainer} dir="rtl">
      <div className={styles.banner}>
        
        {/* بخش متنی سمت راست */}
        <div className={styles.content}>
          <span className={styles.subtitle}>آینده حمل‌ونقل را تجربه کنید</span>
          <h2 className={styles.title}>آماده تجربه نسل جدید حمل‌ونقل هستید؟</h2>
          <p className={styles.description}>
            اپلیکیشن دات‌وان تریپ را دانلود کنید یا با خدمات و ناوگان ما بیشتر آشنا شوید.
          </p>

          <div className={styles.buttonsGroup}>
            <a href="#" className={styles.primaryBtn}>
              <span>درخواست سفر</span>
                <Image src={taxiIcon} width={20} height={20} alt="درخواست سفر"/>
            </a>

            <a href="/forms#contact" className={styles.secondaryBtn}>
              تماس با ما
            </a>
          </div>
        </div>

        {/* بخش تصویر ادغام‌شده سمت چپ */}
        <div className={styles.imageContainer}>
          <Image
            src={bannerImage}
            alt="خودرو و لوگوی دات‌وان تریپ"
            className={styles.bannerImage}
            priority
          />
        </div>

      </div>
    </section>
  );
}