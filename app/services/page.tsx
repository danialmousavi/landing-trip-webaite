import Header from "@/components/ui/Header/Header";
import HeroDynamic from "@/components/ui/Hero/HeroDynamic";
import React from "react";
import taxiIcon from "@/public/figma/taxi.png";
import heroImage from "@/public/figma/svgs/service-city.svg";
import importIcon from "@/public/figma/import.png";
import dotIcon from "@/public/figma/dot.png";
import FeatureSection from "@/components/ui/FeatureSection/FeatureSection";
import driverImage from "@/public/figma/drivers.png";
import TripExperience from "@/components/ui/TripExperience/TripExperience";
export default function page() {
  return (
    <>
      <Header variant="light" />
      {/* <Hero/> */}
      <HeroDynamic
        badge={{
          text: "سفر شهری",
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
          src: heroImage,
          alt: "سفر شهری دات‌وان تریپ",
          width: 1080,
          height: 600,
        }}
      />
          <FeatureSection
      imageSide="right"
      title="برای هر مسیر شهری، یک تجربه بهتر"
      description="دات‌وان تریپ با ترکیب خودروهای مدرن، رانندگان آموزش‌دیده و فناوری هوشمند، سفرهای شهری را مدیریت می‌کند."
      image={{
        src: driverImage,
        alt: "راننده دات‌وان تریپ",
        width: 720,
        height: 480,
      }}
      features={[
        {
          title: "راحتی",
          description:
            "خودروهای مناسب و محیطی آرام برای یک سفر راحت‌تر.",
        },
        {
          title: "امنیت",
          description:
            "رانندگان احراز هویت‌شده و آموزش‌دیده، همراه با نظارت بر سفر.",
        },
        {
          title: "شفافیت",
          description:
            "اطلاعات سفر و مسیر، از شروع تا پایان در اختیار شماست.",
        },
      ]}
    />
    <TripExperience/>
    </>
  );
}
