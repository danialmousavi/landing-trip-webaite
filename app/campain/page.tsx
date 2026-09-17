import AdvertisingRequest from "@/components/ui/campain/AdvertisingRequest/AdvertisingRequest";
import AdvertisingGrid from "@/components/ui/campain/AdvertisingSection/AdvertisingGrid/AdvertisingGrid";
import CampaignFeatureSection from "@/components/ui/campain/CampaignFeatureSection/CampaignFeatureSection";
import { CampaignHero } from "@/components/ui/campain/CampaignHero";
import TripCounterHero from "@/components/ui/campain/CounterBanner/TripCounterHero";
import Header from "@/components/ui/Header/Header";
import React from "react";
import advertisingCarImage from "@/public/figma/car3.png";
import AdvertisingComparison, {
  ComparisonColumn,
  ComparisonRow,
} from "@/components/ui/campain/AdvertisingComparison/AdvertisingComparison";
export default function page() {
  const comparisonColumns: ComparisonColumn[] = [
    {
      key: "billboard",
      label: "بیلبوردها",
    },
    {
      key: "social",
      label: "شبکه‌های اجتماعی",
    },
    {
      key: "dotOne",
      label: "نمایشگر دات‌وان تریپ",
    },
  ];

  const comparisonRows: ComparisonRow[] = [
    {
      feature: "مدت زمان مشاهده",

      values: {
        billboard: "۳ تا ۵ ثانیه",
        social: "۱ تا ۳ ثانیه",
        dotOne: "۲۰ تا ۷۵ دقیقه",
      },
    },

    {
      feature: "تمرکز مخاطب",

      values: {
        billboard: "محدود",
        social: "متوسط",
        dotOne: "بسیار بالا",
      },
    },

    {
      feature: "هدف‌گیری منطقه‌ای",

      values: {
        billboard: "محدود",
        social: "متوسط",
        dotOne: "دقیق",
      },
    },

    {
      feature: "QR Code و تعامل مستقیم",

      values: {
        billboard: "محدود",
        social: "دارد",
        dotOne: "دارد",
      },
    },

    {
      feature: "گزارش و آمار کمپین",

      values: {
        billboard: "ندارد",
        social: "دارد",
        dotOne: "کامل",
      },
    },
  ];
  return (
    <>
      <Header />
      <div className="mt-20 md:mt-30">
        <CampaignHero
          posterSrc="/videos/campainVideoPoster.png"
          videoSrc="/videos/campainHero.mp4"
        />
      </div>
      <CampaignFeatureSection />
      <TripCounterHero count={46519} backgroundImage="/figma/sky.png" />
      <AdvertisingGrid />
      <AdvertisingRequest image={advertisingCarImage} />
      <AdvertisingComparison
        eyebrow="جدول مقایسه"
        title="مقایسه انواع تبلیغات با دات‌وان تریپ"
        columns={comparisonColumns}
        rows={comparisonRows}
        highlightColumn="dotOne"
      />
    </>
  );
}
