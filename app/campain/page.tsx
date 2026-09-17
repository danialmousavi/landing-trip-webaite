import AdvertisingRequest from "@/components/ui/campain/AdvertisingRequest/AdvertisingRequest";
import AdvertisingGrid from "@/components/ui/campain/AdvertisingSection/AdvertisingGrid/AdvertisingGrid";
import CampaignFeatureSection from "@/components/ui/campain/CampaignFeatureSection/CampaignFeatureSection";
import { CampaignHero } from "@/components/ui/campain/CampaignHero";
import TripCounterHero from "@/components/ui/campain/CounterBanner/TripCounterHero";
import Header from "@/components/ui/Header/Header";
import React from "react";
import advertisingCarImage from "@/public/figma/car3.png"
export default function page() {
  return (
    <>
      <Header />
      <div className="mt-20 md:mt-30">
        <CampaignHero
          posterSrc="/videos/campainVideoPoster.png"
          videoSrc="/videos/campainHero.mp4"
        />
      </div>
      <CampaignFeatureSection/>
<TripCounterHero
  count={46519}
  backgroundImage="/figma/sky.png"
/>
  <AdvertisingGrid />
  <AdvertisingRequest
  image={advertisingCarImage}
/>
    </>
  );
}
