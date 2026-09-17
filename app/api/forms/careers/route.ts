import { careerFormSchema } from "@/lib/forms/careers";
import { fieldErrorsFromZod, jsonError } from "@/lib/http/errors";
import { clientIp, consumeRateLimit } from "@/lib/http/rate-limit";
import { createCareerSubmission } from "@/lib/submissions/service";
import {
  assertSafeResume,
  isAllowedResumeMime,
} from "@/lib/storage/resumes";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limited = consumeRateLimit(`careers:${clientIp(request)}`);
  if (!limited.ok) {
    return jsonError(429, "تعداد درخواست‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.");
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError(400, "قالب درخواست نامعتبر است.");
  }

  if (String(formData.get("website") ?? "")) {
    return jsonError(400, "ارسال نامعتبر است.");
  }

  const parsed = careerFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    idempotencyKey: formData.get("idempotencyKey"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return jsonError(422, "اطلاعات فرم ناقص یا نامعتبر است.", {
      fields: fieldErrorsFromZod(parsed.error),
    });
  }

  const file = formData.get("resume");
  if (!(file instanceof File)) {
    return jsonError(422, "اطلاعات فرم ناقص یا نامعتبر است.", {
      fields: { resume: "رزومه را بارگذاری کنید." },
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type;

  try {
    assertSafeResume({
      buffer,
      mimeType,
      originalName: file.name,
      size: file.size,
    });
  } catch {
    return jsonError(422, "اطلاعات فرم ناقص یا نامعتبر است.", {
      fields: { resume: "فقط فایل PDF یا DOCX تا سقف ۵ مگابایت پذیرفته می‌شود." },
    });
  }

  if (!isAllowedResumeMime(mimeType)) {
    return jsonError(422, "اطلاعات فرم ناقص یا نامعتبر است.", {
      fields: { resume: "فقط فایل PDF یا DOCX پذیرفته می‌شود." },
    });
  }

  try {
    const result = await createCareerSubmission(parsed.data, {
      buffer,
      mimeType,
      originalName: file.name,
    });
    return Response.json({ id: result.id, received: true }, { status: 201 });
  } catch {
    console.error("form_submit_failed", "careers");
    return jsonError(500, "ارسال نشد، دوباره تلاش کنید.");
  }
}
