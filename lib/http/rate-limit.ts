const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export function consumeRateLimit(key: string) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  if (current.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, retryAt: current.resetAt };
  }

  current.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - current.count };
}

export function resetRateLimitForTests() {
  buckets.clear();
}
