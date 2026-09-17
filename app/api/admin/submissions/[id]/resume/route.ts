import { readSessionUser } from "@/lib/auth";
import { jsonError } from "@/lib/http/errors";
import { getCareerResume } from "@/lib/submissions/service";
import { readResume } from "@/lib/storage/resumes";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await readSessionUser();
  if (!user) return jsonError(401, "نشست نامعتبر است.");

  const { id } = await context.params;
  const resume = await getCareerResume(id);
  if (!resume) return jsonError(404, "رزومه‌ای پیدا نشد.");

  try {
    const bytes = await readResume(resume.resumeStorageKey);
    return new Response(bytes, {
      headers: {
        "Content-Type": resume.resumeMimeType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(resume.resumeOriginalName)}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return jsonError(404, "فایل رزومه در دسترس نیست.");
  }
}
