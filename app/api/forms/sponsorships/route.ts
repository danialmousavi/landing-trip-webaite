import { sponsorshipFormSchema } from "@/lib/forms/sponsorships";
import { handlePublicJsonForm } from "@/lib/http/public-form";
import { createSponsorshipSubmission } from "@/lib/submissions/service";

export async function POST(request: Request) {
  return handlePublicJsonForm(
    request,
    "sponsorships",
    sponsorshipFormSchema,
    createSponsorshipSubmission,
  );
}
