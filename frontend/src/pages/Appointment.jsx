import { useState } from "react";
import Header from "../components/Header";
import AppointmentSection from "../components/AppointmentSection";
import Footer from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
export default function Appointment() {
  useDocumentTitle("Appointment");
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={mobileHeader ? "main bgGradient blur " : "main bgGradient"}
      >
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
