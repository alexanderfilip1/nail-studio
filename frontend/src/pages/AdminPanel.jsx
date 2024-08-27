import { useEffect, useState } from "react";
import Header from "../components/Header";
import AdminPanelSection from "../components/AdminPanelSection";
import useAuthToken from "../hooks/useAuthToken";

export default function AdminPanel() {
  const [mobileHeader, setMobileHeader] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userStatus = useAuthToken();

  const checkIfAdmin = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/adminCheck");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userStatus === null) {
      return;
    }

    if (userStatus.status === true && userStatus.user) {
      console.log(userStatus);
      setIsAdmin(true);
    } else if (userStatus.status === false) {
      console.log("User is not authenticated");
    } else if (userStatus.status === "error") {
      console.error("Error verifying authentication");
    }
  }, [userStatus]);
  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={mobileHeader ? "main bgGradient blur " : "main bgGradient"}
      >
        {isAdmin && <AdminPanelSection />}
      </main>
    </>
  );
}
