import { describe, expect, it } from "vitest";

import {
  contactFormSchema,
  driverFormSchema,
  isTrustedEmailAddress,
  isValidIranianNationalId,
  nationalIdSchema,
  normalizeIranianMobile,
  sponsorshipFormSchema,
} from "@/lib/forms";

const meta = {
  website: "",
  idempotencyKey: "11111111-1111-4111-8111-111111111111",
};

describe("phone and national id", () => {
  it("normalizes Iranian mobiles", () => {
    expect(normalizeIranianMobile("+989121234567")).toBe("09121234567");
    expect(normalizeIranianMobile("00989121234567")).toBe("09121234567");
    expect(normalizeIranianMobile("9121234567")).toBe("09121234567");
    expect(normalizeIranianMobile("02112345678")).toBeNull();
  });

  it("accepts real 10-digit national ids including leading zeros", () => {
    expect(isValidIranianNationalId("0011823589")).toBe(true);
    expect(isValidIranianNationalId("۰۰۱۱۸۲۳۵۸۹")).toBe(true);
    expect(nationalIdSchema.parse("0011823589")).toBe("0011823589");
    expect(nationalIdSchema.parse("001-182-3589")).toBe("0011823589");
    expect(isValidIranianNationalId("001182358")).toBe(false);
    expect(isValidIranianNationalId("00118235890")).toBe(false);
    expect(isValidIranianNationalId("abcdefghij")).toBe(false);
  });
});

describe("trusted emails", () => {
  it("accepts personal and organizational providers", () => {
    expect(isTrustedEmailAddress("ali@gmail.com")).toBe(true);
    expect(isTrustedEmailAddress("ops@dotone.ir")).toBe(true);
    expect(isTrustedEmailAddress("nima@example.com")).toBe(true);
  });

  it("rejects disposable and untrusted providers", () => {
    expect(isTrustedEmailAddress("bot@mailinator.com")).toBe(false);
    expect(isTrustedEmailAddress("bot@yopmail.com")).toBe(false);
    expect(isTrustedEmailAddress("bot@tempmail.com")).toBe(false);
    expect(isTrustedEmailAddress("bot@guerrillamail.com")).toBe(false);
  });
});

describe("form schemas", () => {
  it("accepts a valid contact payload", () => {
    const parsed = contactFormSchema.safeParse({
      ...meta,
      firstName: "علی",
      lastName: "محمدی",
      phone: "09121234567",
      email: "ali@gmail.com",
      category: "general",
      message: "نیاز به پیگیری سفر سازمانی برای هفته آینده دارم.",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects disposable emails", () => {
    const parsed = contactFormSchema.safeParse({
      ...meta,
      firstName: "علی",
      lastName: "محمدی",
      phone: "09121234567",
      email: "temp@mailinator.com",
      category: "general",
      message: "نیاز به پیگیری سفر سازمانی برای هفته آینده دارم.",
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects markup in messages", () => {
    const parsed = contactFormSchema.safeParse({
      ...meta,
      firstName: "Ali",
      lastName: "Mohammadi",
      phone: "09121234567",
      email: "ali@gmail.com",
      category: "urgent",
      message: "<script>alert(1)</script> this is a long enough message",
    });
    expect(parsed.success).toBe(false);
  });

  it("accepts a driver payload with a 10-digit national id", () => {
    const parsed = driverFormSchema.safeParse({
      ...meta,
      firstName: "رضا",
      lastName: "کاظمی",
      phone: "09121234567",
      nationalId: "0011823589",
      province: "تهران",
      city: "تهران",
      address: "خیابان آزادی پلاک ۱۲",
      description: "سابقه پنج سال رانندگی شهری و بین‌شهری دارم.",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects a national id that is not exactly 10 digits", () => {
    const parsed = driverFormSchema.safeParse({
      ...meta,
      firstName: "رضا",
      lastName: "کاظمی",
      phone: "09121234567",
      nationalId: "123456789",
      province: "تهران",
      city: "تهران",
      address: "خیابان آزادی پلاک ۱۲",
      description: "سابقه پنج سال رانندگی شهری و بین‌شهری دارم.",
    });
    expect(parsed.success).toBe(false);
  });

  it("accepts a sponsorship payload", () => {
    const parsed = sponsorshipFormSchema.safeParse({
      ...meta,
      fullName: "سارا احمدی",
      phone: "09121234567",
      brandName: "برند نمونه",
      activityDomain: "tech",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects XSS and markup in stored fields", () => {
    const parsed = contactFormSchema.safeParse({
      ...meta,
      firstName: "علی",
      lastName: "محمدی",
      phone: "09121234567",
      email: "ali@gmail.com",
      category: "general",
      message: "نیاز به پیگیری سفر سازمانی دارم onclick=alert(1)",
    });
    expect(parsed.success).toBe(false);

    const injected = driverFormSchema.safeParse({
      ...meta,
      firstName: "<img src=x onerror=alert(1)>",
      lastName: "کاظمی",
      phone: "09121234567",
      nationalId: "0011823589",
      province: "تهران",
      city: "تهران",
      address: "خیابان آزادی پلاک ۱۲",
      description: "سابقه پنج سال رانندگی شهری و بین‌شهری دارم.",
    });
    expect(injected.success).toBe(false);
  });
});
