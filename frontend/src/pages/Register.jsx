import { useState } from "react";
import Header from "../components/Header";
import RegisterSection from "../components/RegisterSection";
export default function SignInPage() {
  const [mobileHeader, setMobileHeader] = useState(false);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main className={mobileHeader ? "main blur" : "main"}>
        <RegisterSection />
      </main>
    </>
  );
}
