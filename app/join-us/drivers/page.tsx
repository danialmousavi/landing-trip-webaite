import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/Header/Header";
import { DriverHiringCardProps } from "@/components/ui/join-us/DriverHiringCard/DriverHiringCard";
import Positions from "@/components/ui/positions/Positions";
import React from "react";
const driverJobs: DriverHiringCardProps[] = [
  {
    id: "tehran-driver-1",
    city: "تهران",
    driverCount: 120,
    title: "استخدام راننده در تهران",
    description:
      "برای همکاری با ناوگان دات‌وان تریپ و فعالیت به عنوان راننده ثبت‌نام کنید.",
  },
  {
    id: "karaj-driver-1",
    city: "کرج",
    driverCount: 45,
    title: "استخدام راننده در کرج",
    description:
      "فرصت همکاری با ناوگان دات‌وان تریپ برای رانندگان شهر کرج.",
  },
  {
    id: "mashhad-driver-1",
    city: "مشهد",
    driverCount: 60,
    title: "استخدام راننده در مشهد",
    description:
      "برای پیوستن به ناوگان دات‌وان تریپ در شهر مشهد ثبت‌نام کنید.",
  },
  {
    id: "isfahan-driver-1",
    city: "اصفهان",
    driverCount: 55,
    title: "استخدام راننده در اصفهان",
    description:
      "برای فعالیت به عنوان راننده در ناوگان دات‌وان تریپ در اصفهان ثبت‌نام کنید.",
  },
  {
    id: "shiraz-driver-1",
    city: "شیراز",
    driverCount: 40,
    title: "استخدام راننده در شیراز",
    description:
      "فرصت همکاری با دات‌وان تریپ برای رانندگان فعال در شهر شیراز.",
  },
  {
    id: "tabriz-driver-1",
    city: "تبریز",
    driverCount: 38,
    title: "استخدام راننده در تبریز",
    description:
      "برای پیوستن به شبکه رانندگان دات‌وان تریپ در شهر تبریز ثبت‌نام کنید.",
  },
  {
    id: "qom-driver-1",
    city: "قم",
    driverCount: 32,
    title: "استخدام راننده در قم",
    description:
      "دات‌وان تریپ از رانندگان واجد شرایط در شهر قم دعوت به همکاری می‌کند.",
  },
  {
    id: "ahvaz-driver-1",
    city: "اهواز",
    driverCount: 35,
    title: "استخدام راننده در اهواز",
    description:
      "برای همکاری با ناوگان دات‌وان تریپ در شهر اهواز درخواست خود را ثبت کنید.",
  },
  {
    id: "rasht-driver-1",
    city: "رشت",
    driverCount: 28,
    title: "استخدام راننده در رشت",
    description:
      "فرصت همکاری با دات‌وان تریپ برای رانندگان شهر رشت فراهم شده است.",
  },
  {
    id: "kerman-driver-1",
    city: "کرمان",
    driverCount: 25,
    title: "استخدام راننده در کرمان",
    description:
      "برای فعالیت در ناوگان دات‌وان تریپ در شهر کرمان ثبت‌نام کنید.",
  },
  {
    id: "yazd-driver-1",
    city: "یزد",
    driverCount: 22,
    title: "استخدام راننده در یزد",
    description:
      "دات‌وان تریپ برای تکمیل ناوگان خود در شهر یزد راننده جذب می‌کند.",
  },
  {
    id: "urmia-driver-1",
    city: "ارومیه",
    driverCount: 30,
    title: "استخدام راننده در ارومیه",
    description:
      "برای همکاری به عنوان راننده دات‌وان تریپ در ارومیه ثبت‌نام کنید.",
  },
  {
    id: "hameدان-driver-1",
    city: "همدان",
    driverCount: 20,
    title: "استخدام راننده در همدان",
    description:
      "فرصت همکاری با ناوگان دات‌وان تریپ برای رانندگان شهر همدان.",
  },
  {
    id: "bandar-abbas-driver-1",
    city: "بندرعباس",
    driverCount: 26,
    title: "استخدام راننده در بندرعباس",
    description:
      "برای پیوستن به ناوگان دات‌وان تریپ در بندرعباس درخواست خود را ثبت کنید.",
  },
  {
    id: "ardabil-driver-1",
    city: "اردبیل",
    driverCount: 18,
    title: "استخدام راننده در اردبیل",
    description:
      "دات‌وان تریپ از رانندگان شهر اردبیل برای همکاری با ناوگان دعوت می‌کند.",
  },
];
export default function page() {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Positions
          type="driver"
          title="به عنوان راننده با ما همکاری کنید"
          subtitle="فرصت‌های همکاری رانندگان در شهرهای مختلف را ببینید و بر اساس وضعیت شهر خود، برای استخدام یا پیش‌ثبت‌نام اقدام کنید."
          jobs={driverJobs}
          itemsPerPage={5}
        />
      </div>
      <Footer/>
    </>
  );
}
