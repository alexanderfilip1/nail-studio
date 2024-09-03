import { useEffect, useState } from "react";
import Header from "../components/Header";
import AdminPanelSection from "../components/AdminPanelSection";
import useAuthToken from "../hooks/useAuthToken";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function AdminPanel() {
  const [mobileHeader, setMobileHeader] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const userStatus = useAuthToken();
  const navigate = useNavigate();
  useDocumentTitle("Admin Panel");
  const checkIfAdmin = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/checkAdmin", {
        method: "GET",
        credentials: "include",
      });
      const body = await req.json();
      setIsAdmin(body.isAdmin);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userStatus === null) {
      return;
    }

    if (userStatus.status === true && userStatus.user) {
      checkIfAdmin(userStatus.user.id);
    } else if (userStatus.status === false) {
      console.log("User is not authenticated");
    } else if (userStatus.status === "error") {
      console.error("Error verifying authentication");
    }
  }, [userStatus]);

  useEffect(() => {
    if (!isAdmin) {
      const intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        navigate("/");
      }

      return () => clearInterval(intervalId);
    }
  }, [isAdmin, countdown, navigate]);

  return (
    <>
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={mobileHeader ? "main bgGradient blur " : "main bgGradient"}
      >
        {isAdmin ? (
          <AdminPanelSection />
        ) : (
          <h1 className="notAuthorized">
            Not Authorized! Redirecting in {countdown}...
          </h1>
        )}
      </main>
    </>
  );
}
