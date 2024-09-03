import React, { useState } from "react";
import "../assets/css/ForgotPassword.css";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function ForgotPasswordSection() {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [mobileHeader, setMobileHeader] = useState(false);

  const handleForgotPassword = async () => {
    setError("");
    setNotification("");
    try {
      setLoader(true);
      const req = await fetch("http://localhost:3000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await req.json();
      if (body.status === "success") {
        setNotification(body.message);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        setError(body.message);
      }
    } catch (err) {
      setError("An error occurred while sending the reset email.");
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <Header mobileHeader={mobileHeader} setMobileHeader={setMobileHeader} />
      <main
        className={
          mobileHeader ? "auth bgGradient blur bgGradient" : "auth bgGradient"
        }
      >
        {loader && <Loader />}
        <section className="forgot-password__section">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
          >
            <label htmlFor="email">
              <input
                type="text"
                placeholder="Enter your email"
                id="email"
                className="input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <p className={error ? "error" : "hide"}>{error}</p>
            <p className={notification ? "notification" : "hide"}>
              {notification}
            </p>
            <button type="submit" className="btn">
              Send Reset Link
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
