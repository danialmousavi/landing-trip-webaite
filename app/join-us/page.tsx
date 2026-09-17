import Header from "@/components/ui/Header/Header";
import CareerHero from "@/components/ui/join-us/CareerHero";
import careerHeroImage from "@/public/figma/careerHeroImage.png"

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
    </>
  );
}
