import { ZodSchema } from "zod";

import { fieldErrorsFromZod, HttpError, jsonError } from "@/lib/http/errors";
import { readJsonBody } from "@/lib/http/body";
import { clientIp, consumeRateLimit } from "@/lib/http/rate-limit";

const JSON_LIMIT = 32 * 1024;

export async function handlePublicJsonForm<T>(
  request: Request,
  routeKey: string,
  schema: ZodSchema<T>,
  persist: (values: T) => Promise<{ id: string; created: boolean }>,
) {
  const limited = consumeRateLimit(`${routeKey}:${clientIp(request)}`);
  if (!limited.ok) {
    return jsonError(429, "تعداد درخواست‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.");
  }

  let payload: unknown;
  try {
    payload = await readJsonBody(request, JSON_LIMIT);
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonError(error.status, error.message);
    }
    return jsonError(400, "قالب درخواست نامعتبر است.");
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return jsonError(422, "اطلاعات فرم ناقص یا نامعتبر است.", {
      fields: fieldErrorsFromZod(parsed.error),
    });
  }

  const values = parsed.data as T & { website?: string };
  if (values.website) {
    return jsonError(400, "ارسال نامعتبر است.");
  }

  try {
    const result = await persist(parsed.data);
    return Response.json({ id: result.id, received: true }, { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonError(error.status, error.message, error.payload);
    }
    console.error("form_submit_failed", routeKey);
    return jsonError(500, "ارسال نشد، دوباره تلاش کنید.");
  }
}
