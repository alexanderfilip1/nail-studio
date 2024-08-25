import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";

export default function Profile() {
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={mobileHeader ? "main bgGradient blur " : "main bgGradient"}
      >
        <ProfileSection />
      </main>
      <Footer />
    </>
  );
}
