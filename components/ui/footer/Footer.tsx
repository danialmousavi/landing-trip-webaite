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
    links: ["سفر شهری", "سفر بین‌شهری", "حمل‌ونقل سازمانی", "سرویس اختصاصی", "دانلود اپلیکیشن"],
  },
  {
    title: "درباره دات‌وان تریپ",
    links: ["درباره ما", "تماس با ما", "پرسش‌های متداول", "حریم خصوصی", "قوانین و مقررات"],
  },
  {
    title: "", // این ستون هدر ندارد (برای بخش تبلیغات در طرح)
    links: ["تبلیغات در اپلیکیشن", "تبلیغات در خودروها", "همکاری در تبلیغات"],
  },
  {
    title: "اخبار و مجله",
    links: ["آخرین اخبار", "رویدادها", "توسعه ناوگان", "مقالات", "راهنمای سفر"],
  },
  {
    title: "همکاری با دات‌وان تریپ",
    links: ["استخدام رانندگان", "طرح‌های لیزینگ", "فرصت‌های همکاری", "شرایط همکاری", "ثبت درخواست"],
  },
  {
    title: "دانلود اپلیکیشن",
    links: ["دانلود برای Android", "دانلود برای iOS"],
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
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className={styles.linkItem}>
                      {link}
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