import Header from "@/components/ui/Header/Header";
import HeroDynamic from "@/components/ui/Hero/HeroDynamic";
import React from "react";
import taxiIcon from "@/public/figma/taxi.png";
import heroImage from "@/public/figma/svgs/service-city.svg";
import importIcon from "@/public/figma/import.png";
import dotIcon from "@/public/figma/dot.png";
export default function page() {
  return (
    <>
      <Header variant="dark" />
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
    </>
  );
}
