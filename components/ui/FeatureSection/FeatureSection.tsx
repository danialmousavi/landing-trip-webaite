import Image, { type StaticImageData } from "next/image";

import styles from "./FeatureSection.module.css";

type Feature = {
  title: string;
  description: string;
};

type FeatureSectionProps = {
  title: string;
  description?: string;

  image: {
    src: StaticImageData;
    alt: string;
    width: number;
    height: number;
  };

  imageSide?: "left" | "right";
  featTitle?: string;
  features?: Feature[];
};

export default function FeatureSection({
  title,
  description,
  image,
  imageSide = "right",
  featTitle,
  features = [],
}: FeatureSectionProps) {
  return (
    <section
      className={`${styles.section} ${
        imageSide === "left" ? styles.imageLeft : styles.imageRight
      }`}
    >
      <div className={styles.content}>
        <h2>{title}</h2>

        <p className={styles.description}>{description}</p>

        {features.length > 0 && (
          <div className={styles.features}>
            <h3>{featTitle}</h3>

            <ul>
              {features.map((feature, index) => (
                <li key={`${feature.title}-${index}`}>
                  <strong>{feature.title}:</strong> {feature.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={styles.image}
        />
      </div>
    </section>
  );
}
