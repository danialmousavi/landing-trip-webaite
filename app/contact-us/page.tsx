import ContactForm from "@/components/forms/ContactForm";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/Header/Header";
import React from "react";

export default function page() {
  return (
    <>
      <Header />
      <div className="mt-20">
        <ContactForm />
      </div>
      <Footer/>
    </>
  );
}
