import { useState } from "react";
import Header from "../components/Header";
import RegisterSection from "../components/RegisterSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
export default function Register() {
  const [mobileHeader, setMobileHeader] = useState(false);
  useDocumentTitle("Register");
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={mobileHeader ? "auth bgGradient blur" : "auth bgGradient"}
      >
        <RegisterSection />
      </main>
    </>
  );
}
