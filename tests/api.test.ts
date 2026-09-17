import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";

import { closeDb } from "@/db";
import { encryptPii, decryptPii, maskNationalId } from "@/lib/crypto/pii";
import { createContactSubmission, findByIdempotencyKey } from "@/lib/submissions/service";
import { POST as contactPost } from "@/app/api/forms/contact/route";
import { resetRateLimitForTests } from "@/lib/http/rate-limit";

const hasDb = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDb)("submissions api", () => {
  afterAll(async () => {
    await closeDb();
  });

  it("creates a contact submission and replays idempotency", async () => {
    resetRateLimitForTests();
    const idempotencyKey = randomUUID();
    const payload = {
      firstName: "Ali",
      lastName: "Mohammadi",
      phone: "09121234567",
      email: "ali@example.com",
      category: "general",
      message: "نیاز به پیگیری سفر سازمانی برای هفته آینده دارم.",
      website: "",
      idempotencyKey,
    };

    const first = await contactPost(
      new Request("http://localhost/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    );
    expect(first.status).toBe(201);
    const firstBody = (await first.json()) as { id: string };

    const second = await contactPost(
      new Request("http://localhost/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    );
    expect(second.status).toBe(201);
    const secondBody = (await second.json()) as { id: string };
    expect(secondBody.id).toBe(firstBody.id);
    expect(await findByIdempotencyKey(idempotencyKey)).toEqual({ id: firstBody.id });
  });

  it("rejects invalid contact payloads", async () => {
    resetRateLimitForTests();
    const response = await contactPost(
      new Request("http://localhost/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: "A" }),
      }),
    );
    expect(response.status).toBe(422);
  });

  it("persists via the service layer", async () => {
    const created = await createContactSubmission({
      firstName: "Nima",
      lastName: "Karimi",
      phone: "09121112233",
      email: "nima@example.com",
      category: "other",
      message: "این یک پیام آزمایشی به اندازه کافی طولانی است.",
      website: "",
      idempotencyKey: randomUUID(),
    });
    expect(created.created).toBe(true);
    expect(created.id).toBeTruthy();
  });
});

describe("pii", () => {
  it("encrypts, decrypts and masks national ids", () => {
    if (!process.env.PII_ENCRYPTION_KEY) return;
    const cipher = encryptPii("0013542419");
    expect(cipher).not.toContain("0013542419");
    expect(decryptPii(cipher)).toBe("0013542419");
    expect(maskNationalId("0013542419")).toBe("********19");
  });
});
