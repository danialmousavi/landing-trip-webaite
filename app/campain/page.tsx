import { CampaignHero } from "@/components/ui/campain/CampaignHero";
import Header from "@/components/ui/Header/Header";
import React from "react";

export default function page() {
  return (
    <>
      <Header />
      <div className="mt-20 md:mt-30">
        <CampaignHero
          posterSrc="/videos/campainVideoPoster.png"
          videoSrc="/videos/campainHero.mp4"
        />
        ;
      </div>
    </>
  );
}
