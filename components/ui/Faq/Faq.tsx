"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";

const faqItems = [
  [
    "چطور می‌توانم با دات‌وان سفر کنم؟",
    "از طریق اپلیکیشن دات‌وان، مبدأ و مقصد خود را مشخص و درخواست سفر را ثبت کنید.",
  ],
  [
    "آیا می‌توانم موقعیت خودرو را در طول سفر ببینم؟",
    "بله، پس از تأیید سفر توسط راننده، می‌توانید موقعیت لحظه‌ای خودرو را روی نقشه اپلیکیشن مشاهده کنید.",
  ],
  [
    "رانندگان دات‌وان چگونه انتخاب می‌شوند؟",
    "رانندگان پس از احراز هویت، ارزیابی سوابق، آموزش و تأیید صلاحیت وارد ناوگان می‌شوند.",
  ],
  [
    "خودروهای دات‌وان چه ویژگی‌هایی دارند؟",
    "بخش بزرگی از ناوگان دات‌وان تریپ از خودروهای برقی و هیبریدی کم‌آلاینده تشکیل شده است.",
  ],
  [
    "دات‌وان در چه شهرهایی فعال است؟",
    "دات‌وان تریپ خدمات خود را به‌صورت مرحله‌ای توسعه می‌دهد. برای مشاهده شهرهای فعال، فهرست به‌روز را بررسی کنید.",
  ],
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>آشنایی با دات‌وان تریپ</span>
        <h2 className={styles.title}>سؤالات متداول</h2>
        <p className={styles.intro}>
          پاسخ سوالاتی که ممکن است قبل از استفاده از خدمات دات‌وان تریپ برای شما ایجاد شود.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqItems.map(([question, answer], index) => {
          const isOpen = openFaq === index;

          return (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.question}
                onClick={() => setOpenFaq(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{question}</span>
                <ChevronDown
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                />
              </button>

              <div
                className={`${styles.answerWrapper} ${
                  isOpen ? styles.answerWrapperOpen : ""
                }`}
              >
                <div className={styles.answerInner}>
                  <p className={styles.answerText}>{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.moreBtnWrapper}>
        <button className={styles.moreBtn}>مشاهده سوالات بیشتر</button>
      </div>
    </section>
  );
}