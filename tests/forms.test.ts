import { describe, expect, it } from "vitest";

import {
  contactFormSchema,
  driverFormSchema,
  isValidIranianNationalId,
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

  it("validates national ids", () => {
    expect(isValidIranianNationalId("0000000000")).toBe(false);
    expect(isValidIranianNationalId("0499370901")).toBe(false);
    const valid = findValidNationalId();
    expect(isValidIranianNationalId(valid)).toBe(true);
  });
});

describe("form schemas", () => {
  it("accepts a valid contact payload", () => {
    const parsed = contactFormSchema.safeParse({
      ...meta,
      firstName: "علی",
      lastName: "محمدی",
      phone: "09121234567",
      email: "ali@example.com",
      category: "general",
      message: "نیاز به پیگیری سفر سازمانی برای هفته آینده دارم.",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects markup in messages", () => {
    const parsed = contactFormSchema.safeParse({
      ...meta,
      firstName: "Ali",
      lastName: "Mohammadi",
      phone: "09121234567",
      email: "ali@example.com",
      category: "urgent",
      message: "<script>alert(1)</script> this is a long enough message",
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects an invalid driver national id", () => {
    const parsed = driverFormSchema.safeParse({
      ...meta,
      firstName: "رضا",
      lastName: "کاظمی",
      phone: "09121234567",
      nationalId: "1234567890",
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
});

function findValidNationalId() {
  for (let i = 0; i < 100000000; i += 1) {
    const base = String(i).padStart(9, "0");
    if (/^(\d)\1{8}$/.test(base)) continue;
    const sum = base
      .split("")
      .reduce((total, digit, index) => total + Number(digit) * (10 - index), 0);
    const remainder = sum % 11;
    const check = remainder < 2 ? remainder : 11 - remainder;
    const candidate = `${base}${check}`;
    if (isValidIranianNationalId(candidate)) return candidate;
  }
  throw new Error("Could not find a valid national id");
}
