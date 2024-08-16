import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
export default function HomePage() {
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main className={mobileHeader ? "main blur" : "main"}>
        <HeroSection />
        <AboutSection />
      </main>
    </>
  );
}
