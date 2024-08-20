import React, { useState } from "react";
import "../assets/css/Register.css";
import AuthBtn from "./AuthBtn";

export default function RegisterSection() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const registerData = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const req = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const body = await req.json();
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
              type="text"
              placeholder="Password"
              id="password"
              className="input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <AuthBtn action={"Register"} />
        </form>
      </section>
    </>
  );
}
