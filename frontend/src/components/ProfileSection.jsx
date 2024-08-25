import { useEffect, useState } from "react";
import useAuthToken from "../hooks/useAuthToken.jsx";
import "../assets/css/ProfileSection.css";

export default function ProfileSection() {
  const authStatus = useAuthToken();
  // const userEmail = authStatus.user.email;

  const getUserProfile = async (email) => {
    try {
      const req = await fetch("http://localhost:3000/api/getUser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(email),
      });
      const body = await req.json();
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authStatus !== null) {
      console.log(authStatus);
      getUserProfile(authStatus.user.email);
    }
  }, [authStatus]);

  return (
    <>
      <section className="profile__section container">
        {authStatus ? (
          authStatus.status ? (
            <div>
              <h2>
                Welcome,
                <span className="username">{authStatus.user.email}</span>!
              </h2>
            </div>
          ) : (
            <div className="notLoggedIn">You are not logged in.</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </>
  );
}
