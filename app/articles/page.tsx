import Header from "@/components/ui/Header/Header";
import HeroDynamic from "@/components/ui/Hero/HeroDynamic";
import React from "react";
import taxiIcon from "@/public/figma/taxi.png";
import heroImage from "@/public/figma/svgs/service-city.svg";
import importIcon from "@/public/figma/import.png";
import dotIcon from "@/public/figma/dot.png";
import FeatureSection from "@/components/ui/FeatureSection/FeatureSection";
import driverImage from "@/public/figma/drivers.png";
import TripExperience from "@/components/ui/TripExperience/TripExperience";
import DownloadBanner from "@/components/ui/DownloadBanner/DownloadBanner";
import FAQ from "@/components/ui/Faq/Faq";
import CoverageMap from "@/components/ui/CoverageMap/CoverageMap";
import VehicleShowcase from "@/components/ui/VehicleShowcase/VehicleShowcase";
import ChallengeSolution from "@/components/ui/ChallengeSolution/ChallengeSolution";
import UseCaseGallery from "@/components/ui/UseCaseGallery/UseCaseGallery";
import ProcessSteps from "@/components/ui/ProcessSteps/ProcessSteps";
import PopularArticles from "@/components/ui/PopularArticles/PopularArticles";
import LatestArticles from "@/components/ui/LatestArticles/LatestArticles";
// import Footer from "@/components/ui/Footer/Footer"
export default function page() {
  return (
    <>
      <Header variant="light" />
    
    <PopularArticles/>
    <LatestArticles/>
 
    <FAQ/>
    {/* <Footer/> */}
    </>
  );
}
