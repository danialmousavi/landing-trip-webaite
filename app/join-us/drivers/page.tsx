import { DriverHiringCardProps } from "@/components/ui/join-us/DriverHiringCard/DriverHiringCard";
import DriverPositions from "@/components/ui/positions/DriverPositions";
import React from "react";
const driverJobs: DriverHiringCardProps[] = [
  {
    city: "مشهد",
    driverCount: 20,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان مشهد به تعداد ۲۰ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "تهران",
    driverCount: 15,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان تهران به تعداد ۱۵ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "اصفهان",
    driverCount: 12,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان اصفهان به تعداد ۱۲ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "شیراز",
    driverCount: 10,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان شیراز به تعداد ۱۰ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "تبریز",
    driverCount: 18,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان تبریز به تعداد ۱۸ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "کرج",
    driverCount: 8,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان کرج به تعداد ۸ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "اهواز",
    driverCount: 14,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان اهواز به تعداد ۱۴ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "قم",
    driverCount: 9,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان قم به تعداد ۹ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "رشت",
    driverCount: 11,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان رشت به تعداد ۱۱ نفر فراخوان استخدام راننده دارد.",
  },
  {
    city: "یزد",
    driverCount: 7,
    title: "فراخوان استخدام",
    description:
      "دات‌وان تریپ برای استان یزد به تعداد ۷ نفر فراخوان استخدام راننده دارد.",
  },
  
];
export default function page() {
  return (
    <>
      <DriverPositions
        title="به عنوان راننده با ما همکاری کنید"
        subtitle="فرصت‌های همکاری رانندگان در شهرهای مختلف را ببینید و بر اساس وضعیت شهر خود، برای استخدام یا پیش‌ثبت‌نام اقدام کنید."
        jobs={driverJobs}
        itemsPerPage={5}
      />
    </>
  );
}
