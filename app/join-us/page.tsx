import Header from "@/components/ui/Header/Header";
import { CooperationCard } from "@/components/ui/join-us/CooperationCardItem/CooperationCardItem";
import CooperationSection from "@/components/ui/join-us/CooperationSection/CooperationSection";
import careerHeroImage from "@/public/figma/careerHeroImage.png";
import driverImage from "@/public/figma/femailDrivers.png";
import partnershipImage from "@/public/figma/partenrShip.png";
import careerImage from "@/public/figma/parkedCars.png";
import CareerHero from "@/components/ui/join-us/CareerHero/CareerHero";
import CorporateJobCard from "@/components/ui/join-us/CorporateJobCard/CorporateJobCard";
import DriverHiringCard from "@/components/ui/join-us/DriverHiringCard/DriverHiringCard";

const cooperationCards: CooperationCard[] = [
  {
    title: "همکاری به عنوان راننده",
    description:
      "با پیوستن به شبکه رانندگان، در شهرهای فعال با ما همکاری کنید. اگر هنوز در شهر شما فعالیت خود را آغاز نکرده‌ایم، می‌توانید برای همکاری در آینده پیش‌ثبت‌نام کنید.",
    buttonText: "همکاری به عنوان راننده",
    image: driverImage,
    imageAlt: "همکاری به عنوان راننده",
    position: "bottom",
  },

  {
    title: "فرصت‌های شغلی سازمانی",
    description:
      "دات‌وان تریپ برای توسعه تیم خود، فرصت‌های شغلی سازمانی متنوعی فراهم کرده است. موقعیت‌های فعال را بررسی کنید و مسیر همکاری خود را آغاز کنید.",
    buttonText: "مشاهده فرصت‌های شغلی",
    image: careerImage,
    imageAlt: "فرصت‌های شغلی",
    position: "top",
  },
  {
    title: "همکاری به‌صورت مشارکتی",
    description:
      "با سرمایه‌گذاری روی توسعه ناوگان و بهره‌برداری از آن در شبکه ما، از طریق مدل مشارکتی با ما همکاری کنید.",
    buttonText: "همکاری به‌صورت مشارکتی",
    image: partnershipImage,
    imageAlt: "همکاری به صورت مشارکتی",
    position: "bottom",
  },
];
export default function page() {
  return (
    <>
      <Header />
      <CareerHero
        badge="فرصت‌های همکاری"
        highlightedText="مسیر همکاری"
        title="خود را انتخاب کنید"
        description="چه قصد داشته باشید به‌عنوان راننده با ناوگان تریپ همکاری کنید، چه از طریق فرصت‌های شغلی وارد مجموعه شوید، با تیم حرفه‌ای ما همراه شوید و مسیر مناسب همکاری را انتخاب کنید."
        image={careerHeroImage}
        imageAlt="همکاری با دات‌وان تریپ"
      />
      <CooperationSection
        title="سه مسیر برای همکاری با ما"
        subtitle="متناسب با هدف و شرایط خود، مسیر همکاری مناسب را انتخاب کنید."
        cards={cooperationCards}
      />
    <DriverHiringCard
        city="مشهد"
        driverCount={20}
        title="فراخوان استخدام"
        description="دات‌وان تریپ برای استان مشهد به تعداد ۲۰ نفر فراخوان استخدام راننده دارد."
        buttonText="ثبت‌نام"
     
      />
            <CorporateJobCard
        title="نوع پوزیشن کاری"
        employmentType="تمام وقت"
        employmentIcon="/figma/svgs/clock.svg"
        locations={[
          {
            label: "تریپ",
            icon: "/figma/svgs/building.svg",
          },
          {
            label: "تهران",
            icon: "/figma/svgs/location.svg",
          },
        ]}
        buttonText="ثبت‌نام"
   
      />
  
    </>
  );
}
