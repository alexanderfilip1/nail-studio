import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/ResetPassword.css";
import Loader from "../components/Loader";
import Header from "../components/Header";

export default function ResetPasswordSection() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [loader, setLoader] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const [mobileHeader, setMobileHeader] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setNotification("");
    try {
      setLoader(true);
      const req = await fetch("http://localhost:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
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
      setError("An error occurred while resetting your password.");
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
        <section className="reset-password__section">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <label htmlFor="password">
              <input
                type="password"
                placeholder="Enter new password"
                id="password"
                className="input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <label htmlFor="confirmPassword">
              <input
                type="password"
                placeholder="Confirm new password"
                id="confirmPassword"
                className="input"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </label>
            <p className={error ? "error" : "hide"}>{error}</p>
            <p className={notification ? "notification" : "hide"}>
              {notification}
            </p>
            <button type="submit" className="btn">
              Reset Password
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
