import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Profile() {
  const [mobileHeader, setMobileHeader] = useState(false);
  useDocumentTitle("My Profile");
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
