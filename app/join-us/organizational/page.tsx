import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/Header/Header";
import { CorporateJobCardProps } from "@/components/ui/join-us/CorporateJobCard/CorporateJobCard";
import Positions from "@/components/ui/positions/Positions";
import React from "react";

export const corporateJobs: CorporateJobCardProps[] = [
  {
    id: "frontend-developer",
    title: "توسعه‌دهنده Front-End",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "backend-developer",
    title: "توسعه‌دهنده Back-End",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "product-designer",
    title: "طراح محصول",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "product-manager",
    title: "مدیر محصول",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "hr-specialist",
    title: "کارشناس منابع انسانی",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "customer-support",
    title: "کارشناس پشتیبانی مشتریان",
    employmentType: "شیفتی",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "accountant",
    title: "کارشناس حسابداری",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "operations-specialist",
    title: "کارشناس عملیات",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "digital-marketing-specialist",
    title: "کارشناس دیجیتال مارکتینگ",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "data-analyst",
    title: "تحلیلگر داده",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "devops-engineer",
    title: "مهندس DevOps",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },

  {
    id: "business-development",
    title: "کارشناس توسعه کسب‌وکار",
    employmentType: "تمام وقت",
    locations: [
      {
        label: "تریپ",
        icon: "/figma/svgs/building.svg",
      },
      {
        label: "تهران",
        icon: "/figma/svgs/location.svg",
      },
    ],
  },
];
export default function page() {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Positions
          type="corporate"
          title="موقعیت‌های شغلی سازمانی"
          subtitle="فرصت‌های شغلی دات‌وان تریپ را بررسی کنید"
          jobs={corporateJobs}
          itemsPerPage={5}
        />
      </div>
      <Footer/>
    </>
  );
}
