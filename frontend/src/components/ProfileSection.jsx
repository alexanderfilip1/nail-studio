import { useEffect, useState } from "react";
import useAuthToken from "../hooks/useAuthToken.jsx";
import "../assets/css/ProfileSection.css";

export default function ProfileSection() {
  const authStatus = useAuthToken();
  const [profile, setProfile] = useState({
    username: "",
    balance: 0,
    appointments: 0,
    phone: "",
  });

  const getUserProfile = async (email) => {
    try {
      const req = await fetch("http://localhost:3000/api/getUser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await req.json();
      console.log(body);

      setProfile({
        username: body.username,
        balance: body.balance,
        appointments: body.appointments,
        phone: body.phone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authStatus !== null) {
      console.log(authStatus);
      getUserProfile(authStatus.user.email);
    } else {
      return;
    }
  }, [authStatus]);

  return (
    <section className="profile__section container">
      {authStatus ? (
        authStatus.status ? (
          <>
            <h2 className="profile__section--title">
              Welcome,
              <span className="username"> {profile.username}</span>!
            </h2>
            <div className="profile__info">
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Cashback Balance:</strong> {profile.balance.toFixed(2)}
              </p>
              <p>
                <strong>Appointments:</strong> {profile.appointments}
              </p>
              <p>
                <strong>Phone Number:</strong> {profile.phone}
              </p>
            </div>
          </>
        ) : (
          <div className="notLoggedIn">You are not logged in.</div>
        )
      ) : (
        <div className="loading">Loading...</div>
      )}
    </section>
  );
}
