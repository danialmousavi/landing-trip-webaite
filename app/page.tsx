"use client";

import Header from "@/components/ui/Header/Header";
import {
  Apple,
  BriefcaseBusiness,
  CarFront,
  ChevronDown,
  Download,
  Menu,
  Play,
  Send,
  Smartphone,
  X,
} from "lucide-react";
import { useState } from "react";

const A = "/figma/";
const faqItems = [
  [
    "دات‌وان تریپ در چه شهرهایی فعالیت می‌کند؟",
    "دات‌وان تریپ خدمات خود را به‌صورت مرحله‌ای در شهرهای مختلف توسعه می‌دهد. برای مشاهده شهرهای فعال، فهرست به‌روز مناطق تحت پوشش را بررسی کنید.",
  ],
  [
    "چطور می‌توانم از دات‌وان تریپ سفر بگیرم؟",
    "پس از نصب اپلیکیشن، مبدا و مقصد را انتخاب کنید تا نزدیک‌ترین راننده برای سفر شما اعزام شود.",
  ],
  [
    "آیا خودروهای دات‌وان تریپ برقی هستند؟",
    "بخش بزرگی از ناوگان دات‌وان تریپ از خودروهای برقی و هیبریدی کم‌آلاینده تشکیل شده است.",
  ],
  [
    "رانندگان دات‌وان تریپ چگونه انتخاب می‌شوند؟",
    "رانندگان پس از احراز هویت، ارزیابی سوابق، آموزش و تأیید صلاحیت وارد ناوگان می‌شوند.",
  ],
  [
    "چطور می‌توانم به‌عنوان راننده با دات‌وان تریپ همکاری کنم؟",
    "از بخش همکاری با رانندگان درخواست خود را ثبت کنید تا مراحل ارزیابی و آموزش برای شما ارسال شود.",
  ],
  [
    "آیا امکان خرید خودرو و همکاری با دات‌وان تریپ وجود دارد؟",
    "جزئیات طرح‌های همکاری و لیزینگ در بخش فرصت‌های همکاری اعلام می‌شود.",
  ],
];
const news = [
  [
    "news-1.png",
    "آغاز بهره‌برداری از هاب مرکزی «دات‌وان تریپ» در کرج؛ زیرساختی مدرن برای حمل‌ونقل پاک",
  ],
  ["news-2.png", "اختلالات موقتی در برخی سرویس‌های حمل‌ونقل شهری در البرز"],
  [
    "news-3.png",
    "رئیس شورای عالی استان‌ها: عدم حمایت از سرمایه‌گذار، خیانت به کشور است",
  ],
  ["news-4.png", "آغاز بهره‌برداری از هاب مرکزی دات‌وان تریپ در کرج"],
];

function BrandButton({
  children,
  subtle = false,
}: {
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <button className={subtle ? "button button-subtle" : "button button-brand"}>
      {children}
    </button>
  );
}
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
function FeatureCopy({
  title,
  children,
  bullets,
  button,
}: {
  title: string;
  children: React.ReactNode;
  bullets: string[];
  button?: string;
}) {
  return (
    <div className="feature-copy">
      <h3>{title}</h3>
      <p>{children}</p>
      <ul>
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {button && <button className="button button-dark">{button}</button>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <main dir="rtl">
      <section className="hero" id="home" >
        <img
          className="hero-bg"
          src={`${A}hero-bg.png`}
          alt="خودروی دات‌وان تریپ"
        />
        {/* <header className="nav-shell">
          <a className="brand" href="#home" aria-label="دات‌وان تریپ">
            <img src={`${A}logo.png`} alt="دات‌وان تریپ" />
          </a>
          <nav
            className={menuOpen ? "main-nav open" : "main-nav"}
            aria-label="منوی اصلی"
          >
            <a href="#home">صفحه اصلی</a>
            <a href="#services">خدمات</a>
            <a href="#fleet">ناوگان</a>
            <a href="#news">اخبار</a>
            <a href="#blog">بلاگ</a>
            <a href="#about">درباره ما</a>
            <a href="#contact">تماس با ما</a>
          </nav>
          <div className="nav-actions">
            <button className="button button-brand">
              <BriefcaseBusiness size={18} /> همکاری با تریپ
            </button>
            <button className="button button-glass">
              <Download size={18} /> دانلود اپلیکیشن
            </button>
          </div>
          <button
            className="menu-button"
            aria-label="باز کردن منو"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </header> */}
        <Header variant="dark"/>
        <div className="hero-content">
          <h1>
            نسل جدید حمل‌ونقل،
            <br />
            <span>همین‌جاست</span>
          </h1>
          <p>
            با دات‌وان تریپ تجربه‌ای متفاوت از جابه‌جایی شهری و بین‌شهری را
            تجربه کنید؛ با ناوگان برقی، رانندگان آموزش‌دیده و فناوری‌ای که سفر
            را ساده‌تر، امن‌تر و هوشمندتر می‌کند.
          </p>
          <div className="hero-buttons">
            <BrandButton>
              <CarFront size={18} /> درخواست سفر
            </BrandButton>
            <BrandButton subtle>درباره دات‌وان تریپ</BrandButton>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <strong>+۱٬۲۵۰</strong>
            <span>تعداد رانندگان فعال</span>
          </div>
          <div>
            <strong>+۱۵۰٬۰۰۰</strong>
            <span>سفرهای انجام شده</span>
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-intro">
          <div>
            <span className="pill">درباره دات‌وان تریپ</span>
            <h2>
              دات‌وان تریپ؛
              <br />
              تجربه‌ای تازه در حمل‌ونقل
            </h2>
          </div>
          <p>
            <strong>دات‌وان تریپ</strong> یک پلتفرم حمل‌ونقل مدرن است که با
            ترکیب <b>ناوگان برقی، فناوری و نیروی انسانی آموزش‌دیده،</b> تجربه‌ای
            متفاوت از جابه‌جایی را برای مسافران و سازمان‌ها ایجاد می‌کند.
            <br />
            ما در تریپ تلاش می‌کنیم حمل‌ونقل را از یک جابه‌جایی ساده، به{" "}
            <b>تجربه‌ای ایمن، راحت، سریع و قابل اعتماد</b> تبدیل کنیم.
          </p>
        </div>
        <div className="feature-row fleet-row" id="fleet">
          <img
            className="feature-composite fleet-composite"
            src={`${A}fleet-composite.png`}
            alt="ناوگان مدرن دات‌وان تریپ"
          />
          <FeatureCopy
            title="ناوگان مدرن"
            button="مشاهده ناوگان"
            bullets={[
              "خودروهای برقی و هیبریدی با آلایندگی کمتر",
              "کابین تمیز، جادار و مجهز برای آسایش بیشتر",
              "سرویس و نگهداری دوره‌ای مطابق استاندارد ناوگان",
            ]}
          >
            خودروهای دات‌وان از نسل جدید خودروهای برقی و هیبریدی انتخاب شده‌اند
            تا تجربه‌ای آرام، ایمن و سازگار با محیط‌زیست را برای مسافران فراهم
            کنند. تمام خودروها به‌صورت یکپارچه تحت مدیریت ناوگان نگهداری و سرویس
            می‌شوند.
          </FeatureCopy>
        </div>
        <div className="feature-row reverse">
          <img src={`${A}drivers.png`} alt="رانندگان آموزش‌دیده دات‌وان تریپ" />
          <FeatureCopy
            title="رانندگان آموزش‌دیده"
            button="مشاهده شرایط همکاری"
            bullets={[
              "احراز هویت و بررسی سوابق پیش از شروع همکاری",
              "آموزش رفتار حرفه‌ای و اصول ارتباط با مسافر",
              "آشنایی با استانداردهای ایمنی و خدمات سفر",
            ]}
          >
            رانندگان دات‌وان تنها بر اساس داشتن گواهینامه انتخاب نمی‌شوند؛ آن‌ها
            پس از ارزیابی، آموزش و تأیید صلاحیت وارد ناوگان می‌شوند تا کیفیت
            خدمات در همه سفرها حفظ شود.
          </FeatureCopy>
        </div>
        <div className="feature-row security-row">
          <img
            className="feature-composite security-composite"
            src={`${A}security-composite.png`}
            alt="مرکز کنترل هوشمند سفر"
          />
          <FeatureCopy
            title="امنیت کامل و فناوری هوشمند"
            bullets={[
              "پایش لحظه‌ای موقعیت خودرو و مسیر سفر",
              "ثبت کامل جزئیات و تاریخچه هر سفر",
              "افزایش امنیت از طریق مانیتورینگ و کنترل ناوگان",
            ]}
          >
            زیرساخت نرم‌افزاری دات‌وان تمام مراحل سفر را از درخواست تا پایان
            مسیر به‌صورت هوشمند مدیریت می‌کند تا تجربه‌ای سریع، شفاف و قابل
            اعتماد برای مسافر و راننده ایجاد شود.
          </FeatureCopy>
        </div>
      </section>

      <section className="journey-section">
        <SectionHeading
          eyebrow="تجربه سفر با دات‌وان تریپ"
          title="سفر، از لحظه درخواست شروع می‌شود"
          description="دات‌وان تریپ تلاش می‌کند تمام مسیر سفر، از درخواست تا رسیدن به مقصد، ساده، شفاف و قابل اعتماد باشد."
        />
        <img src={`${A}journey.png`} alt="مراحل سفر با دات‌وان تریپ" />
      </section>
      <section className="coverage section">
        <h2>دات‌وان تریپ در سراسر ایران</h2>
        <div className="coverage-grid">
          <img src={`${A}coverage-chart.png`} alt="آمار پوشش استانی" />
          <img src={`${A}iran-map.png`} alt="نقشه ایران" />
        </div>
        <p>
          <strong>دات‌وان تریپ با توسعه ناوگان و زیرساخت حمل‌ونقل،</strong>{" "}
          خدمات خود را به‌صورت مرحله‌ای در <b>استان‌های مختلف ایران</b> ارائه
          می‌دهد.
        </p>
      </section>

      <section className="services" id="services">
        <div className="section wide">
          <div className="services-heading">
            <div>
              <span className="pill cyan">خدمات دات‌وان تریپ</span>
              <h2>هر سفر، یک راه‌حل متناسب</h2>
            </div>
            <p>
              دات‌وان تریپ مجموعه‌ای از خدمات حمل‌ونقل را برای نیازهای مختلف
              مسافران، کسب‌وکارها و سازمان‌ها ارائه می‌دهد.
            </p>
          </div>
          <div className="services-grid">
            <article className="service-card large">
              <div>
                <h3>حمل‌ونقل شهری</h3>
                <p>
                  برای سفرهای روزمره شهری، با خودروهای مدرن و رانندگان
                  آموزش‌دیده.
                </p>
              </div>
              <img src={`${A}service-city.png`} alt="حمل‌ونقل شهری" />
              <BrandButton>مشاهده سرویس</BrandButton>
            </article>
            <article className="service-card">
              <div>
                <h3>سفرهای بین‌شهری</h3>
                <p>
                  راهکاری مطمئن برای سفرهای بین‌شهری با تمرکز بر راحتی، امنیت و
                  کیفیت تجربه سفر.
                </p>
              </div>
              <img src={`${A}service-intercity.png`} alt="سفرهای بین‌شهری" />
              <BrandButton>مشاهده سرویس</BrandButton>
            </article>
            <article className="service-card">
              <div>
                <h3>حمل‌ونقل سازمانی</h3>
                <p>
                  مدیریت یکپارچه سفرهای کارکنان و سرویس‌های سازمانی با امکان
                  کنترل و پایش عملکرد.
                </p>
              </div>
              <img src={`${A}service-business.png`} alt="حمل‌ونقل سازمانی" />
              <BrandButton>درخواست مشاوره</BrandButton>
            </article>
            <article className="service-card large">
              <div>
                <h3>خدمات اختصاصی</h3>
                <p>
                  راهکار اختصاصی متناسب با نوع سفر، تعداد مسافران و شرایط سازمان
                  شما.
                </p>
              </div>
              <img src={`${A}service-custom.png`} alt="خدمات اختصاصی" />
              <BrandButton>با ما در ارتباط باشید</BrandButton>
            </article>
          </div>
        </div>
      </section>

      <section className="join section">
        <div className="join-copy">
          <span>به دات‌وان تریپ بپیوندید</span>
          <h2>
            دات‌وان تریپ فقط یک سفر نیست؛
            <br />
            یک فرصت برای ساختن آینده است.
          </h2>
          <p>
            اگر می‌خواهید بخشی از نسل جدید حمل‌ونقل باشید، دات‌وان تریپ مسیرهای
            مختلفی برای همکاری در اختیار شما قرار می‌دهد.
          </p>
          <div>
            <BrandButton>مشارکت در دات‌وان تریپ</BrandButton>
            <BrandButton subtle>فرصت‌های استخدام</BrandButton>
          </div>
        </div>
        <img src={`${A}recruiting.png`} alt="تیم رانندگان دات‌وان تریپ" />
      </section>
      <section className="vehicle section">
        <div className="vehicle-copy">
          <span className="pill">درباره دات‌وان تریپ</span>
          <h2>ناوگان دات‌وان تریپ را بشناسید</h2>
          <p>
            در دات‌وان تریپ، خودرو فقط وسیله‌ای برای رسیدن به مقصد نیست؛ بخشی از
            تجربه سفر است. ناوگان دات‌وان با تمرکز بر ایمنی، راحتی، عملکرد و
            فناوری انتخاب شده تا کیفیت سفر از لحظه ورود تا رسیدن به مقصد حفظ
            شود.
          </p>
        </div>
        <div className="vehicle-visual">
          <img
            src={`${A}vehicle-slide.png`}
            alt="خودروی بی‌وای‌دی سیل ۰۶ دی‌ام-آی هیبریدی"
          />
        </div>
      </section>
      <section className="download section">
        <div>
          <span>دانلود اپلیکیشن</span>
          <h2>دات‌وان تریپ همیشه همراه شماست</h2>
          <p>
            اپلیکیشن دات‌وان تریپ را دانلود کنید و درخواست سفر، مدیریت مسیر و
            پرداخت را سریع‌تر و ساده‌تر از همیشه تجربه کنید.
          </p>
          <div className="store-buttons">
            <button>
              <Smartphone /> مایکت
            </button>
            <button>
              <Play /> کافه بازار
            </button>
            <button>
              <Apple /> وب اپلیکیشن کاربران iOS
            </button>
          </div>
        </div>
        <img src={`${A}phones.png`} alt="اپلیکیشن دات‌وان تریپ" />
      </section>

      <section className="news section" id="news">
        <SectionHeading
          eyebrow="اخبار و رویدادها"
          title="دات‌وان تریپ در مسیر توسعه"
          description="آخرین اخبار، رویدادها و اتفاقات دات‌وان تریپ را دنبال کنید."
        />
        <div className="news-grid">
          <article className="featured-news">
            <img
              src={`${A}news-main.png`}
              alt="بهره‌برداری رسمی از ناوگان دات‌وان"
            />
            <div>
              <h3>
                بهره‌برداری رسمی از ناوگان تاکسی‌های هوشمند دات‌وان در کرج با
                حضور مهندس بابک زنجانی
              </h3>
              <p>
                همکاری و هم‌افزایی مجموعه‌های اجرایی، عامل مهمی در سرعت‌گیری
                اجرای پروژه و آغاز رسمی فعالیت ناوگان در استان بوده است.
              </p>
              <button className="button button-dark">مشاهده خبر</button>
            </div>
          </article>
          <div className="news-list">
            {news.map(([image, title]) => (
              <article key={title}>
                <img src={`${A}${image}`} alt="" />
                <div>
                  <h3>{title}</h3>
                  <span>۵ آذر ۱۴۰۴</span>
                  <button className="button button-dark">مشاهده خبر</button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <button className="button button-dark news-more">
          مشاهده همه اخبار
        </button>
      </section>

      <section className="faq section">
        <SectionHeading
          eyebrow="آشنایی با دات‌وان تریپ"
          title="سؤالات متداول"
          description="پاسخ سوالاتی که ممکن است قبل از استفاده از خدمات دات‌وان تریپ برای شما ایجاد شود."
        />
        <div className="faq-list">
          {faqItems.map(([question, answer], index) => (
            <button
              className={openFaq === index ? "faq-item active" : "faq-item"}
              key={question}
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              aria-expanded={openFaq === index}
            >
              <span>{question}</span>
              <ChevronDown />
              <p>{answer}</p>
            </button>
          ))}
        </div>
        <button className="button button-dark">مشاهده سوالات بیشتر</button>
      </section>
      <section className="bottom-cta section" id="contact">
        <img src={`${A}cta-car.png`} alt="خودروی دات‌وان تریپ" />
        <div>
          <span>آینده حمل‌ونقل را تجربه کنید</span>
          <h2>آماده تجربه نسل جدید حمل‌ونقل هستید؟</h2>
          <p>
            اپلیکیشن دات‌وان تریپ را دانلود کنید یا با خدمات و ناوگان ما بیشتر
            آشنا شوید.
          </p>
          <div>
            <BrandButton>
              <CarFront size={18} /> درخواست سفر
            </BrandButton>
            <BrandButton subtle>درباره دات‌وان تریپ</BrandButton>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-brand">
          <img src={`${A}logo-footer.png`} alt="دات‌وان تریپ" />
          <h2>
            دات‌وان تریپ<span>!</span>
          </h2>
          <p>
            <b>مجموعه آوان سفر</b> با رویکرد ارائه خدمات سفرهای درون‌شهری و
            برون‌شهری، حفظ محیط زیست و استفاده از ناوگان برقی، برترین کیفیت
            خدمات سفر را به مسافران ارائه می‌کند.
          </p>
          <div className="socials">
            <b>in</b>
            <Send />
            <Play />
            <b>◎</b>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h3>خدمات</h3>
            <a>سفر شهری</a>
            <a>سفر بین‌شهری</a>
            <a>حمل‌ونقل سازمانی</a>
            <a>سرویس اختصاصی</a>
            <a>دانلود اپلیکیشن</a>
          </div>
          <div>
            <h3>درباره دات‌وان تریپ</h3>
            <a>درباره ما</a>
            <a>تماس با ما</a>
            <a>پرسش‌های متداول</a>
            <a>حریم خصوصی</a>
            <a>قوانین و مقررات</a>
          </div>
          <div>
            <h3>اخبار و مجله</h3>
            <a>آخرین اخبار</a>
            <a>رویدادها</a>
            <a>توسعه ناوگان</a>
            <a>مقالات</a>
            <a>راهنمای سفر</a>
          </div>
          <div>
            <h3>همکاری با دات‌وان تریپ</h3>
            <a>استخدام رانندگان</a>
            <a>طرح‌های لیزینگ</a>
            <a>فرصت‌های همکاری</a>
            <a>شرایط همکاری</a>
            <a>ثبت درخواست</a>
          </div>
          <div>
            <h3>دانلود اپلیکیشن</h3>
            <a>دانلود برای Android</a>
            <a>دانلود برای iOS</a>
          </div>
        </div>
        <p className="copyright">
          تمامی حقوق این سایت متعلق به شرکت دات وان تریپ می‌باشد
        </p>
      </footer>
    </main>
  );
}
