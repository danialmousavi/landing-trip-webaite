import Image, { type StaticImageData } from "next/image";

import styles from "./UseCaseGallery.module.css";

export type UseCaseCard = {
  id: string;
  number?: number;
  title?: string;
  description?: string;
  image?: {
    src: StaticImageData | string;
    alt: string;
    objectPosition?: string;
    width?: number;
    height?: number;
  };
  imageLayout?: "cover" | "inset";
  showBrandMark?: boolean;
  featured?: boolean;
};

type UseCaseGalleryProps = {
  title?: string;
  description?: string;
  cards?: UseCaseCard[];
};

const fleetSrc = "/figma/png/cars-navy.jpg";

const defaultCards: UseCaseCard[] = [
  {
    id: "meetings",
    number: 2,
    title: "جلسات و مأموریت‌های کاری",
    description: "برای جابه‌جایی کارکنان در جلسات، مأموریت‌ها و برنامه‌های کاری.",
    image: {
      src: fleetSrc,
      alt: "ناوگان خودروهای دات‌وان تریپ",
      objectPosition: "30% 60%",
    },
    imageLayout: "cover",
    featured: true,
  },
  {
    id: "commute",
    number: 1,
    title: "رفت‌وآمد منظم کارکنان",
    description: "برای جابه‌جایی منظم کارکنان بین نقاط مشخص و محل کار.",
    image: {
      src: fleetSrc,
      alt: "خودروهای دات‌وان در محل کار",
      objectPosition: "70% 50%",
      width: 255,
      height: 94,
    },
    imageLayout: "inset",
  },
  {
    id: "custom",
    number: 5,
    title: "سرویس‌های اختصاصی",
    description:
      "برای نیازهایی که به مدل جابه‌جایی متفاوت یا برنامه‌ریزی اختصاصی نیاز دارند.",
    showBrandMark: true,
  },
  {
    id: "events",
    number: 4,
    title: "برنامه‌ها و رویدادهای سازمانی",
    description: "برای برنامه‌های سازمانی، جلسات، رویدادها و جابه‌جایی مهمانان.",
    image: {
      src: fleetSrc,
      alt: "ناوگان دات‌وان برای رویدادهای سازمانی",
      objectPosition: "center 70%",
      width: 310,
      height: 143,
    },
    imageLayout: "inset",
  },
  {
    id: "multi-stop",
    number: 3,
    title: "تأمین خودرو و راننده",
    description: "تأمین خودرو و راننده برای بازه زمانی مشخص و برنامه‌های چندمقصدی.",
    showBrandMark: true,
  },
];

export default function UseCaseGallery({
  title = "خدماتی متناسب با برنامه کاری شما",
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
        {cards.map((card, index) => (
          <article
            className={`${styles.card} ${
              card.imageLayout === "cover" ? styles.coverCard : ""
            } ${card.featured ? styles.featuredCard : ""} ${
              card.number === 1 ? styles.imageOneCard : ""
            } ${card.number === 4 ? styles.imageFourCard : ""}`}
            key={card.id}
          >
            {card.image && card.imageLayout === "cover" && (
              <div className={styles.coverMedia}>
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.coverImage}
                  style={
                    card.image.objectPosition
                      ? { objectPosition: card.image.objectPosition }
                      : undefined
                  }
                />
              </div>
            )}

            {card.image && card.imageLayout === "inset" && (
              <div
                className={styles.inset}
                style={
                  card.image.width && card.image.height
                    ? {
                        width: `${card.image.width}px`,
                        aspectRatio: `${card.image.width} / ${card.image.height}`,
                      }
                    : undefined
                }
              >
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

            <div className={styles.content}>
              <span className={styles.number} aria-hidden="true">
                .{card.number ?? index + 1}
              </span>
              {card.title && <h3 className={styles.cardTitle}>{card.title}</h3>}
              {card.description && (
                <p className={styles.caption}>{card.description}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
