"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import linkdinIcon from "@/public/figma/linkdin.png";
import telegramIcon from "@/public/figma/telegram.png";
import youtubeIcon from "@/public/figma/youtube.png";
import instagramIcon from "@/public/figma/instagram.png";
import aparatIcon from "@/public/figma/aparat.png";
import whatsappIcon from "@/public/figma/whatsapp.png";
import logoImage from "@/public/figma/DotOneTrip-Logo.png"; // ایمپورت لوگو

const footerLinks = [
  {
    title: "خدمات",
    links: [
      { label: "سفر شهری", href: "/services" },
      { label: "سفر بین‌شهری", href: "/vehicles" },
      { label: "حمل‌ونقل سازمانی", href: "/b2b" },
      { label: "سرویس اختصاصی", href: "/oncall" },
      { label: "دانلود اپلیکیشن", href: "/#cta" },
    ],
  },
  {
    title: "درباره دات‌وان تریپ",
    links: [
      { label: "درباره ما", href: "/#about" },
      { label: "تماس با ما", href: "/#contact" },
      { label: "پرسش‌های متداول", href: "/#faq" },
      { label: "حریم خصوصی", href: "/#contact" },
      { label: "قوانین و مقررات", href: "/#contact" },
    ],
  },
  {
    title: "",
    links: [
      { label: "تبلیغات در اپلیکیشن", href: "/b2b#sponsorship" },
      { label: "تبلیغات در خودروها", href: "/b2b#sponsorship" },
      { label: "همکاری در تبلیغات", href: "/b2b#sponsorship" },
    ],
  },
  {
    title: "اخبار و مجله",
    links: [
      { label: "آخرین اخبار", href: "/articles" },
      { label: "رویدادها", href: "/articles" },
      { label: "توسعه ناوگان", href: "/vehicles" },
      { label: "مقالات", href: "/articles" },
      { label: "راهنمای سفر", href: "/articles" },
    ],
  },
  {
    title: "همکاری با دات‌وان تریپ",
    links: [
      { label: "استخدام رانندگان", href: "/#join-drivers" },
      { label: "طرح‌های لیزینگ", href: "/#join" },
      { label: "فرصت‌های همکاری", href: "/#join-office" },
      { label: "شرایط همکاری", href: "/#join" },
      { label: "ثبت درخواست", href: "/#join" },
    ],
  },
  {
    title: "دانلود اپلیکیشن",
    links: [
      { label: "دانلود برای Android", href: "/#cta" },
      { label: "دانلود برای iOS", href: "/#cta" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} dir="rtl">
      <div className={styles.container}>
        
        <div className={styles.topSection}>
          
          <div className={styles.brandWrapper}>
            <Image
              src={logoImage}
              alt="لوگو دات‌وان تریپ"
              width={70} 
              height={70} 
              className={styles.logoImage}
            />
            <div className={styles.brandText}>
              <span className={styles.brandName}>دات‌وان تریپ</span>
              <span className={styles.brandExclamation}>!</span>
            </div>
          </div>

          <p className={styles.description}>
            <strong>مجموعه آوان سفر</strong> با رویکرد ارائه خدمات سفرهای درون شهری و برون شهری با انواع وسایل نقلیه شامل اتوبوس، مینی بوس، ون، سواری، موتورسیکلت، دوچرخه و اسکوتر ضمن توجه به سهم خود در <strong>حفظ محیط زیست</strong> با تامین خودروهای برقی که تماما با زیرساخت‌های تکنولوژی روز کشورهای توسعه یافته تجهیز شده بر آن است تا برترین کیفیت خدمات را به شما مسافران عزیز ارائه نماید.
          </p>

          <div className={styles.socialIcons} style={{direction:"ltr"}}>
            <Link href="#" aria-label="LinkedIn" className={styles.socialLink}>
              <Image src={linkdinIcon} alt="لینکدین" />
            </Link>
            <Link href="#" aria-label="Telegram" className={styles.socialLink}>
              <Image src={telegramIcon} alt="تلگرام" />
            </Link>
            <Link href="#" aria-label="YouTube" className={styles.socialLink}>
              <Image src={youtubeIcon} alt="یوتوب" />
            </Link>
            <Link href="#" aria-label="WhatsApp" className={styles.socialLink}>
              <Image src={whatsappIcon} alt="واتساپ" />
            </Link>
            <Link href="#" aria-label="Instagram" className={styles.socialLink}>
              <Image src={instagramIcon} alt="اینستاگرام" />
            </Link>
            <Link href="#" aria-label="Aparat" className={styles.socialLink}>
              <Image src={aparatIcon} alt="آپارات" />
            </Link>
          </div>
        </div>

        <div className={styles.linksGrid}>
          {footerLinks.map((column, index) => (
            <div key={index} className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>{column.title}</h4>
              <ul className={styles.linkList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.linkItem}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* === بخش پایینی (کپی‌رایت) === */}
      <div className={styles.bottomSection}>
        <p>تمامی حقوق این سایت متعلق به شرکت <strong>دات وان تریپ</strong> می باشد</p>
      </div>
    </footer>
  );
}