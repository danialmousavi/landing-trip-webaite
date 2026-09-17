'use client';

import React, { useState, useRef, TouchEvent, MouseEvent } from 'react';
import styles from './CarSpriteViewer.module.css';

interface CarSpriteViewerProps {
  // آدرس تصویر ۶ تکه‌ای که آپلود کردید
  imageUrl?: string;
}

// استخراج ۶ فریم از عکس شما بر اساس موقعیت در تصویر (۲ ستون و ۳ سطر)
const frames = [
  { id: 'front', label: 'جلو', bgPos: '0% 0%' },     // سطر ۱، ستون ۱
  { id: 'right', label: 'راست', bgPos: '100% 50%' }, // سطر ۲، ستون ۲
  { id: 'back', label: 'پشت', bgPos: '100% 0%' },    // سطر ۱، ستون ۲
  { id: 'left', label: 'چپ', bgPos: '0% 50%' },      // سطر ۲، ستون ۱
  { id: 'angle', label: 'زاویه‌دار', bgPos: '0% 100%' }, // سطر ۳، ستون ۱
  { id: 'top', label: 'بالا', bgPos: '100% 100%' },  // سطر ۳، ستون ۲
];

export const CarSpriteViewer: React.FC<CarSpriteViewerProps> = ({ 
  imageUrl = '/figma/car-sprite.png'
}) => {
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startX = useRef<number>(0);

  // حساسیت چرخش: هر 40 پیکسل کشیدن، یک فریم عوض می‌شود
  const DRAG_SENSITIVITY = 40; 
  // فقط 4 فریم اول برای چرخش 360 درجه استفاده می‌شوند (جلو، راست، پشت، چپ)
  const ROTATION_FRAMES = 4;

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;

    const diffX = clientX - startX.current;

    // اگر کاربر ماوس/دست را به اندازه کافی کشیده باشد
    if (Math.abs(diffX) > DRAG_SENSITIVITY) {
      // اگر فقط در ۴ حالت چرخشی هستیم، به چرخش ادامه بده
      if (currentFrame < ROTATION_FRAMES) {
        let nextFrame = currentFrame + (diffX > 0 ? -1 : 1);
        
        // حلقه کردن چرخش (از چپ به جلو و برعکس)
        if (nextFrame < 0) nextFrame = ROTATION_FRAMES - 1;
        if (nextFrame >= ROTATION_FRAMES) nextFrame = 0;
        
        setCurrentFrame(nextFrame);
      } else {
        // اگر روی نمای بالا یا زاویه‌دار بود و درگ کرد، برگرد به نمای جلو
        setCurrentFrame(0);
      }
      // ریست کردن نقطه شروع برای کشیدن پیوسته
      startX.current = clientX;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.wrapper} dir="rtl">
      
      <div className={styles.instruction}>
        برای چرخش، تصویر را بکشید (Drag)
      </div>

      <div 
        className={styles.viewerContainer}
        onMouseDown={(e: MouseEvent) => handleDragStart(e.clientX)}
        onMouseMove={(e: MouseEvent) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e: TouchEvent) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e: TouchEvent) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: frames[currentFrame].bgPos,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      />

      {/* دکمه‌های کنترل سریع برای رفتن به زوایای خاص */}
      <div className={styles.controls}>
        {frames.map((frame, index) => (
          <button
            key={frame.id}
            onClick={() => setCurrentFrame(index)}
            className={`${styles.controlBtn} ${currentFrame === index ? styles.activeBtn : ''}`}
            type="button"
          >
            {frame.label}
          </button>
        ))}
      </div>

    </div>
  );
};

export default CarSpriteViewer;