"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/figma/logo.png";
import logoDark from "@/public/figma/logo-footer.png";
import ShakeHand from "@/public/figma/agreement.png";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  variant?: "light" | "dark";
};

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "ناوگان", href: "/vehicles" },
  { label: "اخبار", href: "/articles" },
  { label: "بلاگ", href: "/b2b" },
  { label: "درباره ما", href: "#about" },
  { label: "تماس با ما", href: "#contact" },
];

export default function Header({ variant = "light" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const address=usePathname();
  console.log('====================================');
  console.log(address);
  console.log('====================================');
  return (
    <header
      className={`nav-shell ${variant === "dark" ? "nav-dark" : "nav-light"}`}
    >
      {/* Logo */}
      <Link href="/" aria-label="دات‌وان تریپ" className="brand">
        <Image
          src={variant === "dark" ? logo : logoDark}
          alt="دات‌وان تریپ"
          width={140}
          height={50}
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <nav
        className={`main-nav ${menuOpen ? "open" : ""} `}
        aria-label="منوی اصلی"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            <span className={`${item.href==address?"nav-selected":""}`}>
               {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="nav-actions">
        <button type="button" className="button button-brand">
          همکاری با تریپ
          <Image src={ShakeHand} alt="همکاری با تریپ" width={18} height={18} />
        </button>

        <button
          type="button"
          className={`button ${variant === "dark" ? "button-glass" : "button-dark"}`}
        >
          <Download size={18} />
          دانلود اپلیکیشن
        </button>
      </div>

      {/* Mobile Menu */}
      <button
        type="button"
        className="menu-button"
        aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}
