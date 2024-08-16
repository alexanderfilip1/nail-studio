import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="main">
        <HeroSection />
        <AboutSection />
      </main>
    </>
  );
}
