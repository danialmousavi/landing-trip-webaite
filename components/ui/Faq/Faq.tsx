"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <section className="w-full max-w-4xl mx-auto px-6 py-16" dir="rtl">
      
      <div className="text-center mb-12 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">آشنایی با دات‌وان تریپ</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          سؤالات متداول
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-xl">
          پاسخ سوالاتی که ممکن است قبل از استفاده از خدمات دات‌وان تریپ برای شما ایجاد شود.
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        {faqItems.map(([question, answer], index) => {
          const isOpen = openFaq === index;

          return (
            <div key={index} className="w-full border-b border-transparent">
              <button
                className="flex w-full items-center justify-between py-4 text-right transition-colors"
                onClick={() => setOpenFaq(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className="text-gray-800 font-medium text-sm md:text-base">
                  {question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-500 text-sm leading-relaxed pr-2">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* دکمه مشاهده بیشتر */}
      <div className="flex justify-center mt-10">
        <button className="bg-[#222] hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
          مشاهده سوالات بیشتر
        </button>
      </div>
      
    </section>
  );
}