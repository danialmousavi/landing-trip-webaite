import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import styles from "./JoinBanner.module.css";

type BannerLink = {
  text: string;
  href: string;
};

type JoinBannerProps = {
  eyebrow?: string;

  title: string;
  highlightedText?: string;

  description?: string;

  image: string | StaticImageData;
  imageAlt?: string;

  primaryAction?: BannerLink;
  secondaryAction?: BannerLink;
};

export default function JoinBanner({
  eyebrow,
  title,
  highlightedText,
  description,
  image,
  imageAlt = "",
  primaryAction,
  secondaryAction,
}: JoinBannerProps) {
  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.banner}>
        {/* ================= Image ================= */}

        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 700px) 92vw, 52vw"
          />
        </div>

        {/* ================= Content ================= */}

        <div className={styles.content}>
          {eyebrow && (
            <span className={styles.eyebrow}>
              {eyebrow}
            </span>
          )}

          <h2 className={styles.title}>
            {title}

            {highlightedText && (
              <>
                <br />
                <span>{highlightedText}</span>
              </>
            )}
          </h2>

          {description && (
            <p className={styles.description}>
              {description}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className={styles.actions}>
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className={styles.primaryButton}
                >
                  {primaryAction.text}
                </Link>
              )}

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className={styles.secondaryButton}
                >
                  {secondaryAction.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}