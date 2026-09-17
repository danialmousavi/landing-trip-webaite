import TransportHero from "@/components/ui/about/Hero/TransportHero";
import FeatureSection from "@/components/ui/FeatureSection/FeatureSection";
import Header from "@/components/ui/Header/Header";
import React from "react";
import monitorImage from "@/public/figma/monitor.png";
export default function page() {
  return (
    <>
      <Header />
      <TransportHero />
      <FeatureSection
        imageSide="right"
        title="فراتر از یک سرویس درخواست خودرو"
        image={{
          src: monitorImage,
          alt: "راننده دات‌وان تریپ",
          width: 720,
          height: 480,
        }}
        subTitle="یک پلتفرم یکپارچه برای مدیریت چرخه سفر"
        description="دات‌وان تریپ صرفاً مسافر را به خودرو متصل نمی‌کند؛ بلکه تمام چرخه سفر، از ثبت درخواست و تخصیص خودرو تا کنترل عملیات، پشتیبانی، مدیریت ناوگان و تحلیل داده را در یک پلتفرم یکپارچه مدیریت می‌کند. این ساختار، امکان ارائه سرویس‌های اختصاصی به سازمان‌ها و مجموعه‌هایی را فراهم می‌کند که به کنترل، شفافیت و مقیاس‌پذیری بیشتر در مدیریت حمل‌ونقل نیاز دارند."
      />
    </>
  );
}
