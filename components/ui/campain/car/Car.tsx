import Image from "next/image";
import CampaignCar from "@/public/figma/CampaignCar.png";

import styles from "./Car.module.css";

export default function Car() {
  return (
    <div className={styles.carWrapper}>
      <div className={styles.car}>
        <div className={styles.shadow} />

        <Image
          src={CampaignCar}
          alt="ماشین دات وان"
          className={styles.carImage}
          priority
        />
      </div>
    </div>
  );
}