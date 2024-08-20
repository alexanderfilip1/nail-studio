import { useState } from "react";
import Header from "../components/Header";
import RegisterSection from "../components/RegisterSection";
export default function Register() {
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main className={mobileHeader ? "auth blur" : "auth"}>
        <RegisterSection />
      </main>
    </>
  );
}
