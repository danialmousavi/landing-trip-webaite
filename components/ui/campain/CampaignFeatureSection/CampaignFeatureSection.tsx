import React from 'react';
import styles from './CampaignFeatureSection.module.css';

import eyeIcon from '@/public/figma/svgs/eye.svg';
import rankingIcon from '@/public/figma/svgs/eye.svg';
import routingIcon from '@/public/figma/svgs/routing-2.svg';
import fingerScanIcon from '@/public/figma/svgs/finger-scan.svg';

export const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: "توجه پیوسته در تمام مسیر",
      description: "مسافر در طول سفر در فضایی آرام با نمایشگر روبه‌روست و پیام برند شما فرصت بیشتری برای دیده‌شدن و ماندگاری در ذهن مخاطب دارد.",
      icon: eyeIcon
    },
    {
      id: 2,
      title: "تعامل واقعی با مخاطب",
      description: "این رسانه فقط برای نمایش تبلیغ نیست؛ مخاطب در طول سفر فرصت کافی دارد تا پیام، هویت و ارزش برند شما را درک کند.",
      icon: rankingIcon
    },
    {
      id: 3,
      title: "برندینگ هدفمند در مناطق شهری",
      description: "کمپین خود را در مناطق و مسیرهای پرتردد موردنظر اجرا کنید تا پیام برندتان دقیقاً به مخاطبان همان محدوده نمایش داده شود.",
      icon: routingIcon
    },
    {
      id: 4,
      title: "از آگاهی تا اقدام، در یک اسکن",
      description: "با استفاده از QR Code، کد تخفیف یا لینک اختصاصی، مخاطب می‌تواند بلافاصله با برند شما تعامل کند و نتیجه کمپین قابل اندازه‌گیری باشد.",
      icon: fingerScanIcon
    }
  ];

  return (
    <section className={styles.wrapper} dir="rtl">
      <div className={styles.headerSection}>
        <span className={styles.subtitle}>
          برند شما فقط دیده نمی‌شود؛ در ذهن مسافر ماندگار می‌شود
        </span>
        <h2 className={styles.title}>
          دات‌وان؛ رسانه‌ای برای ماندن در ذهن مخاطب
        </h2>
        <p className={styles.description}>
          برخلاف رسانه‌هایی که در چند ثانیه از کنارشان عبور می‌کنیم، مانیتور داخل تاکسی در تمام مدت سفر همراه مسافر است. این یعنی فرصت بیشتر برای ساخت آگاهی از برند، معرفی محصول و دعوت به اقدام.
        </p>
      </div>

      <div className={styles.featuresList}>
        {features.map((feature) => (
          <div key={feature.id} className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <img 
                src={typeof feature.icon === 'string' ? feature.icon : feature.icon.src} 
                alt={feature.title} 
                className={styles.iconImg}
              />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;