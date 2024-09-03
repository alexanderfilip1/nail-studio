import React, { useState } from "react";
import "../assets/css/Login.css";
import AuthBtn from "./AuthBtn";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError();
    setNotification();
    const loginData = {
      email: email,
      password: password,
    };
    try {
      setLoader(true);
      const req = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      const body = await req.json();
      console.log(body);
      switch (body.status) {
        case "success":
          setNotification(`${body.message}. Redirecting...`);
          setTimeout(() => {
            navigate("/");
          }, 4000);
          setError("");
          break;
        case "error":
          setError(body.message);
          break;
        default:
          setError("Unexpected response from the server.");
      }
    } catch (err) {
      setError("An error occurred while registering.");
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      {loader && <Loader />}
      <section className="login__section">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label htmlFor="email">
            <input
              type="text"
              placeholder="Email"
              id="email"
              className="input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <a className="forgotPassword" onClick={handleForgotPasswordClick}>
            Forgot password?
          </a>
          <p className={error ? "error" : "hide"}>{error}</p>
          <p className={notification ? "notification" : "hide"}>
            {notification}
          </p>
          <AuthBtn action={"Login"} />
        </form>
      </section>
    </>
  );
}
