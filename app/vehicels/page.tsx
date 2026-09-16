import FeatureSection from "@/components/ui/FeatureSection/FeatureSection";
import FleetShowcase from "@/components/ui/FleetShowcase/FleetShowcase";
import Header from "@/components/ui/Header/Header";
import Hero from "@/components/ui/Hero/HeroDynamic";
import VehicleFlexibleServices from "@/components/ui/VehicleFlexibleServices/VehicleFlexibleServices";
import VehicleShowcase from "@/components/ui/VehicleShowcase/VehicleShowcase";
import React from "react";
import tripQualityImage from "@/public/figma/sea.png";
import exebitionImage from "@/public/figma/exebition.png";
import DownloadBanner from "@/components/ui/DownloadBanner/DownloadBanner";
import FAQ from "@/components/ui/Faq/Faq";
import FutureTransportBanner from "@/components/ui/FutureTransportBanner/FutureTransportBanner";
import Footer from "@/components/ui/footer/Footer";

export default function page() {
  return (
    <>
      <Header />
      <FleetShowcase />
      <VehicleFlexibleServices />
      <VehicleShowcase />
      <FeatureSection
        imageSide="right"
        title="ناوگان، بخشی از کیفیت سفر است"
        description="کیفیت یک سرویس حمل‌ونقل فقط به مسیر و راننده محدود نمی‌شود. خودرو نیز نقش مهمی در تجربه سفر دارد. به همین دلیل، وضعیت خودروها و الزامات مربوط به ارائه سرویس باید در طول فعالیت ناوگان مورد توجه قرار گیرد."
        image={{
          src: tripQualityImage,
          alt: "راننده دات‌وان تریپ",
          width: 720,
          height: 480,
        }}
        featTitle="چهار محور"
        features={[
          {
            title: "ایمنی",
            description: "توجه به الزامات و استانداردهای ایمنی خودرو.",
          },
          {
            title: "آمادگی خودرو",
            description: "بررسی وضعیت خودرو پیش از ارائه سرویس.",
          },
          {
            title: "نظافت و شرایط ظاهری",
            description: "حفظ شرایط مناسب خودرو برای استفاده مسافران.",
          },
          {
            title: "نگهداری",
            description: "رسیدگی و نگهداری منظم برای حفظ آمادگی خودرو.",
          },
        ]}
      />
      <FeatureSection
        imageSide="left"
        title="حرکت به سمت نسل جدید حمل‌ونقل"
        description="دات‌وان تریپ با استفاده از خودروهای مجهز به فناوری‌های جدید و توسعه ناوگان برقی و هیبریدی، به دنبال ارائه تجربه‌ای مدرن‌تر از جابه‌جایی است."
        image={{
          src: exebitionImage,
          alt: "راننده دات‌وان تریپ",
          width: 720,
          height: 480,
        }}
        features={[
          {
            title: "فناوری جدید",
            description:
              "استفاده از فناوری‌های به‌روز در بخشی از ناوگان برای تجربه‌ای مدرن‌تر.",
          },
          {
            title: "خودروهای برقی و هیبریدی",
            description:
              "حرکت به سمت استفاده بیشتر از راهکارهای حمل‌ونقل برقی و کم‌مصرف.",
          },
          {
            title: "نگاه رو به آینده",
            description:
              "توسعه ناوگان هم‌راستا با تغییرات صنعت حمل‌ونقل و نیازهای جدید کاربران.",
          },
        ]}
      />
      <DownloadBanner />
      <FAQ />
      <FutureTransportBanner />
      <Footer />
    </>
  );
}
