import { driverFormSchema } from "@/lib/forms/drivers";
import { handlePublicJsonForm } from "@/lib/http/public-form";
import { createDriverSubmission } from "@/lib/submissions/service";

export async function POST(request: Request) {
  return handlePublicJsonForm(
    request,
    "drivers",
    driverFormSchema,
    createDriverSubmission,
  );
}
