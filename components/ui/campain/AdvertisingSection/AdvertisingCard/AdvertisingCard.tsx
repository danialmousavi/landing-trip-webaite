import Image, { StaticImageData } from "next/image";

import styles from "./AdvertisingCard.module.css";

export type AdvertisingCardData = {
  image: string | StaticImageData;
  imageAlt: string;

  title: string;
  description: string;

  items: string[];
};

export default function AdvertisingCard({
  image,
  imageAlt,
  title,
  description,
  items,
}: AdvertisingCardData) {
  return (
    <article
      className={styles.card}
      dir="rtl"
    >
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="(max-width: 650px) 90vw, 45vw"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <p className={styles.description}>
          {description}
        </p>

        <ul className={styles.list}>
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className={styles.listItem}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}