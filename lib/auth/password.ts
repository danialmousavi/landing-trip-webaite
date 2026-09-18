import argon2 from "argon2";

import { getEnv } from "@/lib/env";

function peppered(password: string) {
  const pepper = getEnv().AUTH_PASSWORD_PEPPER;
  if (!pepper) {
    throw new Error("AUTH_PASSWORD_PEPPER is required");
  }
  return `${password}:${pepper}`;
}

export async function hashPassword(password: string) {
  return argon2.hash(peppered(password), { type: argon2.argon2id });
}

export async function verifyPassword(hash: string, password: string) {
  try {
    return await argon2.verify(hash, peppered(password));
  } catch {
    return false;
  }
}
