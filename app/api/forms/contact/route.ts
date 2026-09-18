import { contactFormSchema } from "@/lib/forms/contact";
import { handlePublicJsonForm } from "@/lib/http/public-form";
import { createContactSubmission } from "@/lib/submissions/service";

export async function POST(request: Request) {
  return handlePublicJsonForm(
    request,
    "contact",
    contactFormSchema,
    createContactSubmission,
  );
}
