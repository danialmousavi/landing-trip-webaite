import Image, { type StaticImageData } from "next/image";

import styles from "./UseCaseGallery.module.css";

export type UseCaseCard = {
  id: string;
  description?: string;
  image?: {
    src: StaticImageData | string;
    alt: string;
    objectPosition?: string;
  };
  imageLayout?: "cover" | "inset";
  showBrandMark?: boolean;
};

type UseCaseGalleryProps = {
  title?: string;
  description?: string;
  cards?: UseCaseCard[];
};

const fleetSrc = "/figma/png/cars-navy.jpg";

const defaultCards: UseCaseCard[] = [
  {
    id: "fleet-cover",
    image: {
      src: fleetSrc,
      alt: "ناوگان خودروهای دات‌وان تریپ",
      objectPosition: "30% 60%",
    },
    imageLayout: "cover",
  },
  {
    id: "meetings",
    description: "برای جابه‌جایی کارکنان در جلسات، مأموریت‌ها و برنامه‌های کاری.",
  },
  {
    id: "commute",
    description: "برای جابه‌جایی منظم کارکنان بین نقاط مشخص و محل کار.",
    image: {
      src: fleetSrc,
      alt: "خودروهای دات‌وان در محل کار",
      objectPosition: "70% 50%",
    },
    imageLayout: "inset",
  },
  {
    id: "custom",
    description:
      "برای نیازهایی که به مدل جابه‌جایی متفاوت یا برنامه‌ریزی اختصاصی نیاز دارند.",
    showBrandMark: true,
  },
  {
    id: "events",
    description: "برای برنامه‌های سازمانی، جلسات، رویدادها و جابه‌جایی مهمانان.",
    image: {
      src: fleetSrc,
      alt: "ناوگان دات‌وان برای رویدادهای سازمانی",
      objectPosition: "center 70%",
    },
    imageLayout: "inset",
  },
  {
    id: "multi-stop",
    description: "تأمین خودرو و راننده برای بازه زمانی مشخص و برنامه‌های چندمقصدی.",
    showBrandMark: true,
  },
];

export default function UseCaseGallery({
  title,
  description,
  cards = defaultCards,
}: UseCaseGalleryProps) {
  return (
    <section className={styles.section} dir="rtl">
      {(title || description) && (
        <div className={styles.intro}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.lead}>{description}</p>}
        </div>
      )}

      <div className={styles.grid}>
        {cards.map((card) => (
          <article
            className={`${styles.card} ${
              card.imageLayout === "cover" ? styles.coverCard : ""
            }`}
            key={card.id}
          >
            {card.image && card.imageLayout === "cover" && (
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.coverImage}
                style={
                  card.image.objectPosition
                    ? { objectPosition: card.image.objectPosition }
                    : undefined
                }
              />
            )}

            {card.image && card.imageLayout === "inset" && (
              <div className={styles.inset}>
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.insetImage}
                  style={
                    card.image.objectPosition
                      ? { objectPosition: card.image.objectPosition }
                      : undefined
                  }
                />
              </div>
            )}

            {card.showBrandMark && (
              <Image
                src="/figma/logo.png"
                alt=""
                width={160}
                height={90}
                unoptimized
                className={styles.brandMark}
                aria-hidden="true"
              />
            )}

            {card.description && (
              <p className={styles.caption}>{card.description}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
