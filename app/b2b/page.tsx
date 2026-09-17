import Header from "@/components/ui/Header/Header";
import Hero from "@/components/ui/Hero/HeroDynamic";
import React from "react";
import dotIcon from "@/public/figma/dot.png";
import HeroImage from "@/public/figma/b2bHero.png";
import taxiIcon from "@/public/figma/taxi.png";
import importIcon from "@/public/figma/import.png";
import ChallengeSolution from "@/components/ui/ChallengeSolution/ChallengeSolution";
import UseCaseGallery from "@/components/ui/UseCaseGallery/UseCaseGallery";
import ProcessSteps from "@/components/ui/ProcessSteps/ProcessSteps";
import FeatureSection from "@/components/ui/FeatureSection/FeatureSection";
import DownloadBanner from "@/components/ui/DownloadBanner/DownloadBanner";
import driverImage from "@/public/figma/b2bDriver.png";
import FAQ from "@/components/ui/Faq/Faq";
import FutureTransportBanner from "@/components/ui/FutureTransportBanner/FutureTransportBanner";
import Footer from "@/components/ui/footer/Footer";
export default function page() {
  return (
    <>
      <Header />
      <Hero
        badge={{
          text: "در اختیار",
          icon: dotIcon,
        }}
        title={{
          highlight: "سفرهای شهری",
          text: "ساده‌تر از همیشه",
        }}
        description="با دات‌وان تریپ، برای رفت‌وآمد روزمره روی سفری راحت، امن و قابل‌اعتماد حساب کنید."
        buttons={[
          {
            text: "درخواست سفر",
            icon: taxiIcon,
            variant: "primary",
          },
          {
            text: "دانلود اپلیکیشن",
            icon: importIcon,
            variant: "secondary",
          },
        ]}
        image={{
          src: HeroImage,
          alt: "سفر شهری دات‌وان تریپ",
          width: 1080,
          height: 600,
        }}
      />
      <ChallengeSolution />
      <UseCaseGallery />
      <ProcessSteps />
      <FeatureSection
        imageSide="right"
        title="اگر جابه‌جایی بخشی از عملیات شماست، این سرویس برای شماست"
        image={{
          src: driverImage,
          alt: "راننده دات‌وان تریپ",
          width: 720,
          height: 480,
        }}
        features={[
          {
            title: "شرکت‌ها و سازمان‌ها",
            description:
              "برای مجموعه‌هایی با تعداد بالای کارکنان یا نیاز مستمر به جابه‌جایی.",
          },
          {
            title: "شرکت‌های دارای شیفت کاری",
            description:
              "برای سازمان‌هایی که کارکنان در ساعات یا شیفت‌های مختلف جابه‌جا می‌شوند.",
          },
          {
            title: "شرکت‌های دارای شیفت کاری",
            description:
              " برای مجموعه‌هایی که کارکنان یا تیم‌ها بین چند محل کاری رفت‌وآمد دارند.",
          },
          {
            title: "سازمان‌های دارای مأموریت‌های کاری",
            description:
              "رای مجموعه‌هایی که جابه‌جایی کارکنان بخشی از فعالیت روزانه آنهاست.",
          },
          {
            title: "سازمان‌های برگزارکننده رویداد",
            description: "برای جابه‌جایی مهمانان، کارکنان یا تیم‌های اجرایی.",
          },
        ]}
      />
      <div style={{marginTop:"200px"}}>
        <DownloadBanner />

      </div>
      <FAQ/>
      <FutureTransportBanner/>
      <Footer/>
    </>
  );
}
