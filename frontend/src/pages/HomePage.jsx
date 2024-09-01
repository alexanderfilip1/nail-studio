import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import PriceListSection from "../components/PriceListSection";
import Footer from "../components/Footer";
import useAuthToken from "../hooks/useAuthToken.jsx";
import ReviewSection from "../components/ReviewSection.jsx";

export default function HomePage() {
  const [mobileHeader, setMobileHeader] = useState(false);

  const authStatus = useAuthToken();

  console.log(authStatus);

  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main className={mobileHeader ? "main blur" : "main"}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PriceListSection />
        <ReviewSection />
      </main>
      <Footer />
    </>
  );
}
