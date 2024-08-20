import { useState } from "react";
import Header from "../components/Header";
import AppointmentSection from "../components/AppointmentSection";
import Footer from "../components/Footer";

export default function Appointment() {
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main className={mobileHeader ? "main blur" : "main bgBeige"}>
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
