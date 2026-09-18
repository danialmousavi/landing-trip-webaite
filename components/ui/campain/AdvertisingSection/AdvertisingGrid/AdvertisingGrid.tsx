import AdvertisingCard, {
  AdvertisingCardData,
} from "../AdvertisingCard/AdvertisingCard";

import monitorImage from "@/public/figma/carInsde.png";
import appImage from "@/public/figma/phone2.png";

import styles from "./AdvertisingGrid.module.css";

const advertisingCards: AdvertisingCardData[] = [
  {
    image: monitorImage,
    imageAlt: "مانیتورهای تبلیغاتی داخل خودرو دات‌وان تریپ",

    title: "مانیتورهای داخل خودرو",

    description:
      "تبلیغات روی نمایشگرهای نصب‌شده در ناوگان تاکسیرانی دات‌وان، مخاطب را در زمان سفر و بالاترین سطح توجه درگیر می‌کند.",

    items: [
      "نمایش ویدئو و تصویر با کیفیت بالا",
      "پخش زمان‌بندی‌شده کمپین‌ها",
      "دیده‌شدن توسط تمام سرنشینان خودرو",
      "مناسب برای کمپین‌های برندینگ و آگاهی از برند",
    ],
  },
  {
    image: appImage,
    imageAlt: "تبلیغات در اپلیکیشن دات‌وان",

    title: "تبلیغات در اپلیکیشن دات‌وان",

    description:
      "فضای دیجیتال اپلیکیشن امکان نمایش تبلیغات هدفمند را در نقاط مختلف مسیر کاربر فراهم می‌کند.",

    items: [
      "بنرهای تبلیغاتی در صفحه‌های کلیدی اپلیکیشن",
      "نمایش هدفمند بر اساس رفتار و موقعیت کاربر",
      "امکان هدایت کاربر به صفحه فرود یا کمپین",
      "مناسب برای کمپین‌های پرفورمنس و افزایش تبدیل",
    ],
  },
];

type AdvertisingGridProps = {
  title?: string;
  subtitle?: string;
};

export default function AdvertisingGrid({
  title = "جایگاه‌های تبلیغاتی دات‌وان",
  subtitle = "تبلیغ شما دقیقاً کجا دیده می‌شود؟",
}: AdvertisingGridProps) {
  return (
    <section
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.heading}>
        <h2 className={styles.title}>
          {title}
        </h2>

        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}
      </div>

      <div className={styles.grid}>
        {advertisingCards.map((card, index) => (
          <AdvertisingCard
            key={`${card.title}-${index}`}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}