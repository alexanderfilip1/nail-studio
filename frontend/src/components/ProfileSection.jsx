import { useEffect, useState } from "react";
import useAuthToken from "../hooks/useAuthToken.jsx";
import "../assets/css/ProfileSection.css";
import { getUserProfile } from "../services/userProfileService";

export default function ProfileSection() {
  const authStatus = useAuthToken();
  const [profile, setProfile] = useState({
    username: "",
    balance: 0,
    appointments: 0,
    phone: "",
  });

  const getUserData = async () => {
    if (authStatus !== null) {
      const user = await getUserProfile(authStatus.user.email);
      setProfile({
        username: user.username,
        balance: user.balance,
        appointments: user.appointments,
        phone: user.phone,
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    getUserData();
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
            <div className="action__buttons">
              <button className="btn">Show Appointments</button>
              <button className="btn">See Cashback History</button>
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
