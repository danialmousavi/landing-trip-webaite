import Header from "@/components/ui/Header/Header";

import FAQ from "@/components/ui/Faq/Faq";

import PopularArticles from "@/components/ui/PopularArticles/PopularArticles";
import LatestArticles from "@/components/ui/LatestArticles/LatestArticles";
export default function page() {
  return (
    <>
      <Header variant="light" />

      <PopularArticles />
      <LatestArticles />
      <LatestArticles compact />
      <FAQ />
      {/* <Footer/> */}
    </>
  );
}
