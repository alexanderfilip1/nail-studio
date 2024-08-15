import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="main">
        <HeroSection />
      </main>
    </>
  );
}
