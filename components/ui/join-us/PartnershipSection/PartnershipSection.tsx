import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import styles from "./PartnershipSection.module.css";

type PartnershipSectionProps = {
  title: string;
  description: string;

  image: string | StaticImageData;
  imageAlt?: string;

  buttonText?: string;
  buttonHref?: string;
};

export default function PartnershipSection({
  title,
  description,
  image,
  imageAlt = "",
  buttonText = "مشاهده فرصت‌های شغلی",
  buttonHref = "/jobs",
}: PartnershipSectionProps) {
  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 90vw, 45vw"
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>
            {description}
          </p>

          <Link
            href={buttonHref}
            className={styles.button}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}