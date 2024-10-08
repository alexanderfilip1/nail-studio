import React, { useState } from "react";
import "../assets/css/Register.css";
import AuthBtn from "./AuthBtn";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function RegisterSection() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const registerData = {
      username: username,
      email: email,
      password: password,
    };
    try {
      setLoader(true);
      const req = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const body = await req.json();
      console.log(body);
      switch (body.status) {
        case "success":
          setNotification(`${body.message}. Redirecting to log in...`);
          setTimeout(() => {
            navigate("/login");
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

  return (
    <>
      {loader && <Loader />}
      <section className="register__section">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <label htmlFor="username">
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="input"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
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
          <p className={error ? "error" : "hide"}>{error}</p>
          <p className={notification ? "notification" : "hide"}>
            {notification}
          </p>
          <AuthBtn action={"Register"} />
        </form>
      </section>
    </>
  );
}
