import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import PriceListSection from "../components/PriceListSection";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
export default function HomePage() {
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main className={mobileHeader ? "main blur" : "main"}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PriceListSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
