"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./VehicleShowcase.module.css";

import carSideView from "@/public/figma/vehicles/Car-SideView.svg";
import arrowLeft from "@/public/figma/arrow/arrow-left.svg";
import arrowRight from "@/public/figma/arrow/arrow-right.svg";

/* ========================================
   Types
======================================== */

export type VehicleSpec = {
  label: string;
  value: string;
};

export type Vehicle = {
  id: string;

  image: {
    src: StaticImageData;
    alt: string;
  };

  /**
   * مشخصات سمت چپ
   * اگر sideDescription وجود داشته باشد،
   * specs نمایش داده نمی‌شود.
   */
  specs?: VehicleSpec[];

  /**
   * متن بلند سمت چپ
   */
  sideDescription?: string;

  /**
   * متن پایین اسلاید
   * مثلا:
   * بی‌وای‌دی سیل ۵ دی‌ام-آی هیبریدی
   */
  footerText?: string;

  /**
   * اگر این دو مقدار وجود داشته باشند
   * دکمه پایین نمایش داده می‌شود.
   */
  detailsHref?: string;
  detailsLabel?: string;
};

type VehicleShowcaseProps = {
  /**
   * عنوان بالا سمت راست
   */
  title: string;

  /**
   * اگر ارسال شود زیر title نمایش داده می‌شود.
   * اگر ارسال نشود badge نمایش داده می‌شود.
   */
  description?: string;

  /**
   * متن badge زمانی که description نداریم
   */
  badgeText?: string;

  vehicles?: Vehicle[];
};

/* ========================================
   Default Data
======================================== */

const defaultVehicles: Vehicle[] = [
  {
    id: "byd-seal-5-dmi",

    image: {
      src: carSideView,
      alt: "خودروی بی‌وای‌دی سیل ۵ دی‌ام-آی هیبریدی ناوگان دات‌وان تریپ",
    },

    specs: [
      {
        label: "نوع خودرو",
        value: "سواری",
      },
      {
        label: "ظرفیت",
        value: "۴ مسافر",
      },
      {
        label: "نوع کاربری",
        value: "شهری",
      },
    ],

    detailsHref: "#",
    detailsLabel: "مشاهده جزییات",
  },

  {
    id: "byd-seal-06-dmi",

    image: {
      src: carSideView,
      alt: "خودروی بی‌وای‌دی سیل ۰۶ دی‌ام-آی هیبریدی ناوگان دات‌وان تریپ",
    },

    specs: [
      {
        label: "نوع خودرو",
        value: "سواری",
      },
      {
        label: "ظرفیت",
        value: "۴ مسافر",
      },
      {
        label: "نوع کاربری",
        value: "شهری و بین‌شهری",
      },
    ],

    detailsHref: "#",
    detailsLabel: "مشاهده جزییات",
  },
];

/* ========================================
   Component
======================================== */

export default function VehicleShowcase({
  title,
  description,
  badgeText = "درباره دات‌وان تریپ",
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

    const syncActiveIndex = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    syncActiveIndex();

    emblaApi.on("select", syncActiveIndex);

    return () => {
      emblaApi.off("select", syncActiveIndex);
    };
  }, [emblaApi]);

  if (vehicles.length === 0) {
    return null;
  }

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
            {vehicles.map((vehicle, index) => {
              const hasSpecs = vehicle.specs && vehicle.specs.length > 0;

              const hasSideDescription = Boolean(vehicle.sideDescription);

              const hasButton =
                Boolean(vehicle.detailsHref) && Boolean(vehicle.detailsLabel);

              const hasFooterText = Boolean(vehicle.footerText);

              return (
                <div
                  className={styles.slide}
                  key={vehicle.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} از ${vehicles.length}`}
                  aria-hidden={index !== activeIndex}
                >
                  <article className={styles.frame}>
                    {/* ========================================
                        Header
                    ======================================== */}

                    <div className={styles.header}>
                      {/* =========================
                          سمت راست
                      ========================= */}

                      <div className={styles.intro}>
                        {/* اگر description نداریم badge می‌آید */}

                        {!description && (
                          <div className={styles.badge}>
                            <span className={styles.badgeDot} />

                            {badgeText}
                          </div>
                        )}

                        <h2 className={styles.title}>{title}</h2>

                        {/* اگر description داریم زیر title می‌آید */}

                        {description && (
                          <p className={styles.description}>{description}</p>
                        )}
                      </div>

                      {/* =========================
                          سمت چپ
                      ========================= */}
                      <div
                        className={`${styles.modelInfo} ${
                          hasSideDescription ? styles.modelInfoWide : ""
                        }`}
                      >
                        {/* حالت اول:
                            متن بلند
                        */}

                        {hasSideDescription ? (
                          <p className={styles.sideDescription}>
                            {vehicle.sideDescription}
                          </p>
                        ) : (
                          /* حالت دوم:
                             مشخصات خودرو
                          */

                          hasSpecs && (
                            <dl className={styles.specCard}>
                              {vehicle.specs!.map((spec) => (
                                <div
                                  className={styles.specRow}
                                  key={spec.label}
                                >
                                  <dt className={styles.specLabel}>
                                    {spec.label}:
                                  </dt>

                                  <dd className={styles.specValue}>
                                    {spec.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          )
                        )}
                      </div>
                    </div>

                    {/* ========================================
                        Car
                    ======================================== */}

                    <div className={styles.carLayer}>
                      <Image
                        src={vehicle.image.src}
                        alt={vehicle.image.alt}
                        className={styles.carImage}
                        priority={index === 0}
                      />
                    </div>

                    {/* ========================================
                        Footer
                    ======================================== */}

                    {(hasButton || hasFooterText) && (
                      <div className={styles.footer}>
                        {/* حالت دکمه */}

                        {hasButton ? (
                          <a
                            className={styles.detailsButton}
                            href={vehicle.detailsHref}
                            tabIndex={index === activeIndex ? undefined : -1}
                          >
                            {vehicle.detailsLabel}
                          </a>
                        ) : (
                          /* حالت متن */

                          <p className={styles.footerText}>
                            {vehicle.footerText}
                          </p>
                        )}
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================
            Navigation
        ======================================== */}

        {vehicles.length > 1 && (
          <div className={styles.navLayer}>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="خودروی قبلی"
            >
              <Image
                src={arrowRight}
                alt=""
                width={38}
                height={38}
                unoptimized
              />
            </button>

            <button
              type="button"
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={() => emblaApi?.scrollNext()}
              aria-label="خودروی بعدی"
            >
              <Image
                src={arrowLeft}
                alt=""
                width={38}
                height={38}
                unoptimized
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
