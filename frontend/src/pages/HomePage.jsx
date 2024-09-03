import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import PriceListSection from "../components/PriceListSection";
import Footer from "../components/Footer";
import useAuthToken from "../hooks/useAuthToken.jsx";
import ReviewSection from "../components/ReviewSection.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.jsx";

export default function HomePage() {
  const [mobileHeader, setMobileHeader] = useState(false);
  useDocumentTitle("Homepage");

  const authStatus = useAuthToken();

  console.log(authStatus);

  const logVisit = async () => {
    try {
      await fetch("http://localhost:3000/api/log-visit", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log("Error logging visit:", err);
    }
  };

  useEffect(() => {
    logVisit();
  }, []);

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
