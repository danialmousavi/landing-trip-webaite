import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

import { getDb } from "@/db";
import { users } from "@/db/schema";
import {
  SESSION_COOKIE,
  clearFailedLogins,
  cookieOptions,
  createSession,
  registerFailedLogin,
} from "@/lib/auth";
import { verifyPassword } from "@/lib/auth/password";
import { jsonError, HttpError } from "@/lib/http/errors";
import { isAllowedFormOrigin } from "@/lib/http/origin";
import { readJsonBody } from "@/lib/http/body";
import { clientIp, consumeRateLimit } from "@/lib/http/rate-limit";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(80),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  if (!isAllowedFormOrigin(request)) {
    return jsonError(403, "درخواست نامعتبر است.");
  }

  const limited = consumeRateLimit(`login:${clientIp(request)}`);
  if (!limited.ok) {
    return jsonError(429, "تعداد تلاش‌ها بیش از حد مجاز است.");
  }

  let payload: unknown;
  try {
    payload = await readJsonBody(request, 8 * 1024);
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonError(error.status, error.message);
    }
    return jsonError(400, "قالب درخواست نامعتبر است.");
  }

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonError(400, "نام کاربری یا رمز عبور نادرست است.");
  }

  const [user] = await getDb()
    .select()
    .from(users)
    .where(eq(users.username, parsed.data.username.toLowerCase()))
    .limit(1);

  if (!user || !user.isActive) {
    return jsonError(401, "نام کاربری یا رمز عبور نادرست است.");
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return jsonError(423, "حساب به‌طور موقت قفل شده است. بعداً تلاش کنید.");
  }

  const valid = await verifyPassword(user.passwordHash, parsed.data.password);
  if (!valid) {
    await registerFailedLogin(user.id, user.failedLoginCount);
    return jsonError(401, "نام کاربری یا رمز عبور نادرست است.");
  }

  await clearFailedLogins(user.id);
  const token = await createSession(user.id);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, cookieOptions());

  return Response.json({
    ok: true,
    user: { username: user.username, role: user.role },
  });
}
