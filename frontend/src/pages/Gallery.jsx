import { useState } from "react";
import Header from "../components/Header";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";

export default function Appointment() {
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={mobileHeader ? "main bgGradient blur " : "main bgGradient"}
      >
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
