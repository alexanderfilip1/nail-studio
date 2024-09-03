import { useState } from "react";
import Header from "../components/Header";
import LoginSection from "../components/LoginSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
export default function Login() {
  const [mobileHeader, setMobileHeader] = useState(false);
  useDocumentTitle("Sign In");
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={
          mobileHeader ? "auth bgGradient blur bgGradient" : "auth bgGradient"
        }
      >
        <LoginSection />
      </main>
    </>
  );
}
