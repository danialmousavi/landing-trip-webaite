
import Image from "next/image";
import { CarFront, Download } from "lucide-react";
import styles from "./Hero.module.css";
import heroImage from "@/public/figma/svgs/service-city.svg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>
            <Image src={`/public/figma/svgs/dot.svg`} alt="سفر شهری دات‌وان تریپ" width={7} height={7} />
          سفر شهری
        </span>

        <h1>
          <span>سفرهای شهری</span>، ساده‌تر از همیشه
        </h1>

        <p>
          با دات‌وان تریپ، برای رفت‌وآمد روزمره روی سفری راحت،
          امن و قابل‌اعتماد حساب کنید.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryButton}>
            <Image src="/public/figma/svgs/taxi.svg" alt="سفر شهری دات‌وان تریپ" width={18} height={18} />
            درخواست سفر
          </button>

          <button className={styles.secondaryButton}>
            <Download size={18} />
            دانلود اپلیکیشن
          </button>
        </div>
      </div>

      <div className={styles.visual}>
        <Image
          src={heroImage}
          alt="سفر شهری دات‌وان تریپ"
          width={1080}
          height={600}
          priority
        />
      </div>
    </section>
  );
}