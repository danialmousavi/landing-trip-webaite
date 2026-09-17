import Header from "@/components/ui/Header/Header";


import PopularArticles from "@/components/ui/PopularArticles/PopularArticles";
import LatestArticles from "@/components/ui/LatestArticles/LatestArticles";
import Footer from "@/components/ui/footer/Footer";
export default function page() {
  return (
    <>
      <Header variant="light" />

      <PopularArticles />
      <LatestArticles />
      <LatestArticles compact />
      <Footer/>
    </>
  );
}
