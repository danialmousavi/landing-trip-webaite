import { z } from "zod";

import { HttpError } from "@/lib/http/errors";

const uuidSchema = z.string().uuid();

export function parseUuid(value: string | undefined | null) {
  const parsed = uuidSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export async function readJsonBody(
  request: Request,
  limitBytes = 32 * 1024,
): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > limitBytes) {
    throw new HttpError(413, "درخواست بیش از حد بزرگ است.");
  }

  const text = await request.text();
  if (text.length > limitBytes) {
    throw new HttpError(413, "درخواست بیش از حد بزرگ است.");
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new HttpError(400, "قالب درخواست نامعتبر است.");
  }
}
