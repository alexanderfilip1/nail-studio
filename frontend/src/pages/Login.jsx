import { useState } from "react";
import Header from "../components/Header";
import LoginSection from "../components/LoginSection";
export default function Login() {
  const [mobileHeader, setMobileHeader] = useState(false);
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
