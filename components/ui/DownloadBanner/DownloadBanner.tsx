import React from "react";
import Image from "next/image";

import styles from "./DownloadBanner.module.css";
import DeviceImage from "@/public/figma/device.png";
import appleIcon from "@/public/figma/apple.png";
import myketIcon from "@/public/figma/myket.png";
import bazarIcon from "@/public/figma/bazar.png";

export default function DownloadBanner() {
  return (
    <section className={styles.sectionContainer} dir="rtl">
      <div className={styles.banner}>
        <div className={styles.imageWrapper}>
          <Image
            src={DeviceImage}
            alt="نمای اپلیکیشن دات‌وان تریپ"
            fill
            className={styles.phonesImage}
            priority
          />
        </div>

        <div className={styles.content}>
          <span className={styles.subtitle}>دانلود اپلیکیشن</span>

          <h2 className={styles.title}>دات‌وان تریپ همیشه همراه شماست</h2>

          <p className={styles.description}>
            اپلیکیشن دات‌وان تریپ را دانلود کنید و درخواست سفر، مدیریت مسیر و
            پرداخت را سریع‌تر و ساده‌تر از همیشه تجربه کنید.
          </p>

          <div className={styles.buttonsGroup}>
            <a href="#" className={styles.downloadBtn}>
              <Image src={myketIcon} alt="مایکت" width={24} height={24} />
              <span>مایکت</span>
            </a>

            <a href="#" className={styles.downloadBtn}>
              <Image src={bazarIcon} alt="کافه بازار" width={24} height={24} />
              <span>کافه بازار</span>
            </a>

            <a href="#" className={styles.downloadBtn}>
              <Image src={appleIcon} alt="وب اپلیکیشن" width={24} height={24} />
              <span>وب اپلیکیشن (کاربران ios)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
