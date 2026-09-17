import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
} from "node:crypto";

import { getEnv } from "@/lib/env";

const ALGO = "aes-256-gcm";

function getKey() {
  const { PII_ENCRYPTION_KEY } = getEnv();
  if (!PII_ENCRYPTION_KEY) {
    throw new Error("PII_ENCRYPTION_KEY is required");
  }

  const key = Buffer.from(PII_ENCRYPTION_KEY, "base64");
  if (key.byteLength !== 32) {
    throw new Error("PII_ENCRYPTION_KEY must decode to 32 bytes");
  }
  return key;
}

export function encryptPii(plainText: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return [iv, tag, encrypted].map((part) => part.toString("base64")).join(".");
}

export function decryptPii(cipherText: string) {
  const [ivPart, tagPart, dataPart] = cipherText.split(".");
  if (!ivPart || !tagPart || !dataPart) {
    throw new Error("Invalid ciphertext");
  }

  const decipher = createDecipheriv(
    ALGO,
    getKey(),
    Buffer.from(ivPart, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tagPart, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataPart, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

export function piiBlindIndex(value: string) {
  return createHmac("sha256", getKey()).update(value).digest("hex");
}

export function maskNationalId(value: string) {
  if (value.length < 2) return "**********";
  return `${"*".repeat(Math.max(0, value.length - 2))}${value.slice(-2)}`;
}
