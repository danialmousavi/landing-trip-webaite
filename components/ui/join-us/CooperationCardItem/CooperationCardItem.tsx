import Image, { StaticImageData } from "next/image";
import styles from "./CooperationCardItem.module.css";

export type CooperationCard = {
  title: string;
  description: string;
  buttonText: string;
  image: string | StaticImageData;
  imageAlt?: string;
  position?: "top" | "bottom";
  onClick?: () => void;
};

type CooperationCardItemProps = {
  card: CooperationCard;
};

export default function CooperationCardItem({
  card,
}: CooperationCardItemProps) {
  const position = card.position ?? "bottom";

  return (
    <article
      className={`${styles.card} ${
        position === "top" ? styles.imageTop : styles.imageBottom
      }`}
      dir="rtl"
    >
      <div className={styles.imageWrapper}>
        <Image
          src={card.image}
          alt={card.imageAlt ?? ""}
          fill
          className={styles.image}
          sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{card.title}</h3>

        <p className={styles.description}>{card.description}</p>

        <button
          type="button"
          className={styles.button}
          onClick={card.onClick}
        >
          {card.buttonText}
        </button>
      </div>
    </article>
  );
}