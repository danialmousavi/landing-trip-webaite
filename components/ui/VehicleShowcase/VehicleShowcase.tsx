"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./VehicleShowcase.module.css";
import carSideView from "@/public/figma/vehicles/Car-SideView.svg";
import arrowLeft from "@/public/figma/arrow/arrow-left.svg";
import arrowRight from "@/public/figma/arrow/arrow-right.svg";

type VehicleSpec = {
  label: string;
  value: string;
};

export type Vehicle = {
  id: string;
  name: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
  specs: VehicleSpec[];
  detailsHref?: string;
};

type VehicleShowcaseProps = {
  title?: string;
  description?: string;
  detailsLabel?: string;
  vehicles?: Vehicle[];
};

const defaultVehicles: Vehicle[] = [
  {
    id: "byd-seal-5-dmi",
    name: "بی‌وای‌دی سیل ۵ دی‌ام-آی هیبریدی",
    image: {
      src: carSideView,
      alt: "خودروی بی‌وای‌دی سیل ۵ دی‌ام-آی هیبریدی ناوگان دات‌وان تریپ",
    },
    specs: [
      { label: "نوع خودرو", value: "سواری" },
      { label: "ظرفیت", value: "۴ مسافر" },
      { label: "نوع کاربری", value: "شهری" },
    ],
  },
  {
    id: "byd-seal-06-dmi",
    name: "بی‌وای‌دی سیل ۰۶ دی‌ام-آی هیبریدی",
    image: {
      src: carSideView,
      alt: "خودروی بی‌وای‌دی سیل ۰۶ دی‌ام-آی هیبریدی ناوگان دات‌وان تریپ",
    },
    specs: [
      { label: "نوع خودرو", value: "سواری" },
      { label: "ظرفیت", value: "۴ مسافر" },
      { label: "نوع کاربری", value: "شهری و بین‌شهری" },
    ],
  },
  {
    id: "byd-seal-5-dmi-intercity",
    name: "بی‌وای‌دی سیل ۵ دی‌ام-آی هیبریدی",
    image: {
      src: carSideView,
      alt: "خودروی بی‌وای‌دی سیل ۵ دی‌ام-آی هیبریدی ناوگان دات‌وان تریپ",
    },
    specs: [
      { label: "نوع خودرو", value: "سواری" },
      { label: "ظرفیت", value: "۴ مسافر" },
      { label: "نوع کاربری", value: "بین‌شهری" },
    ],
  },
];

export default function VehicleShowcase({
  title = "خودروی موردنظر خود را دقیق‌تر بشناسید",
  description = "در هر مدل، اطلاعاتی را که برای انتخاب خودرو اهمیت دارد بررسی کنید.",
  detailsLabel = "مشاهده جزییات",
  vehicles = defaultVehicles,
}: VehicleShowcaseProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "center",
    containScroll: false,
    loop: true,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const syncActiveIndex = () => setActiveIndex(emblaApi.selectedScrollSnap());

    syncActiveIndex();
    emblaApi.on("select", syncActiveIndex);

    return () => {
      emblaApi.off("select", syncActiveIndex);
    };
  }, [emblaApi]);

  if (vehicles.length === 0) return null;

  return (
    <section
      className={styles.section}
      dir="rtl"
      aria-roledescription="carousel"
      aria-label="ناوگان دات‌وان تریپ"
    >
      <div className={styles.carouselArea}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.track}>
            {vehicles.map((vehicle, index) => (
              <div
                className={styles.slide}
                key={vehicle.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} از ${vehicles.length}`}
                aria-hidden={index !== activeIndex}
              >
                <article className={styles.frame}>
                  {/* خودرو به‌عنوان لایه پس‌زمینه، ۲۴۸ پیکسل پایین‌تر از بالای فریم */}
                  <div className={styles.header}>
                    <div className={styles.intro}>
                      <h2 className={styles.title}>{title}</h2>
                      <p className={styles.description}>{description}</p>
                    </div>

                    <div className={styles.modelInfo}>
                      <h3 className={styles.vehicleName}>{vehicle.name}</h3>

                      <dl className={styles.specCard}>
                        {vehicle.specs.map((spec) => (
                          <div className={styles.specRow} key={spec.label}>
                            <dt className={styles.specLabel}>{spec.label}:</dt>
                            <dd className={styles.specValue}>{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>

                  <div className={styles.carLayer}>
                    <Image
                      src={vehicle.image.src}
                      alt={vehicle.image.alt}
                      className={styles.carImage}
                      priority={index === 0}
                    />
                  </div>

                  <div className={styles.footer}>
                    <a
                      className={styles.detailsButton}
                      href={vehicle.detailsHref ?? "#"}
                      tabIndex={index === activeIndex ? undefined : -1}
                    >
                      {detailsLabel}
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* فلش‌ها روی لبه‌های راست و چپ فریم فعال قرار می‌گیرند */}
        {vehicles.length > 1 && (
          <div className={styles.navLayer}>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="خودروی قبلی"
            >
              <Image src={arrowRight} alt="" width={38} height={38} unoptimized />
            </button>

            <button
              type="button"
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={() => emblaApi?.scrollNext()}
              aria-label="خودروی بعدی"
            >
              <Image src={arrowLeft} alt="" width={38} height={38} unoptimized />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
