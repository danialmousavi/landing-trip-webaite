import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import styles from "./TravelSolutionCard.module.css";

export type TravelSolutionCardProps = {
  title: string;
  description: string;

  image: string | StaticImageData;
  imageAlt?: string;

  buttonText?: string;
  buttonHref?: string;

  badge?: string;
};

export default function TravelSolutionCard({
  title,
  description,
  image,
  imageAlt = "",
  buttonText,
  buttonHref,
  badge,
}: TravelSolutionCardProps) {
  const hasButton = Boolean(buttonText && buttonHref);

  return (
    <article className={styles.card} dir="rtl">
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>

          {badge && (
            <span className={styles.badge}>
              {badge}
            </span>
          )}
        </div>

        <p className={styles.description}>
          {description}
        </p>
      </div>

      <div className={styles.visual}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="
            (max-width: 700px) 90vw,
            (max-width: 1000px) 44vw,
            520px
          "
        />

        {hasButton && (
          <Link
            href={buttonHref!}
            className={styles.button}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </article>
  );
}