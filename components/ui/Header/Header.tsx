"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/figma/logo.png";
import logoDark from "@/public/figma/logo-footer.png";
import ShakeHand from "@/public/figma/agreement.png";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type HeaderProps = {
  variant?: "light" | "dark";
};

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "ناوگان", href: "/vehicles" },
  { label: "اخبار", href: "/articles" },
  { label: "بلاگ", href: "/b2b" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "#contact" },
];

export default function Header({ variant = "light" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const address = usePathname();

  // منطق: variant === "light" → هدر سفید، variant === "dark" → هدر مشکی
  const isLightVariant = variant === "light";

  return (
    <header
      className={`${styles.navShell} ${
        isLightVariant ? styles.navLight : styles.navDark
      }`}
    >
      {/* Logo */}
      <Link href="/" aria-label="دات‌وان تریپ" className={styles.brand}>
        <Image
          src={isLightVariant ? logoDark : logo}
          alt="دات‌وان تریپ"
          width={140}
          height={50}
          priority
        />
      </Link>

      {/* Desktop & Mobile Navigation */}
      <nav
        className={`${styles.mainNav} ${menuOpen ? styles.open : ""}`}
        aria-label="منوی اصلی"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            <span
              className={`${item.href === address ? styles.navSelected : ""}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className={styles.navActions}>
        <Link href="/forms#join-drivers" className="button button-brand">
          همکاری با تریپ
          <Image src={ShakeHand} alt="همکاری با تریپ" width={18} height={18} />
        </Link>

        <button
          type="button"
          className={`button ${
            isLightVariant ? "button-dark" : "button-glass"
          }`}
        >
          <Download size={18} />
          دانلود اپلیکیشن
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className={styles.menuButton}
        aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}