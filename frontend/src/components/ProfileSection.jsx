import { useEffect, useState } from "react";
import useAuthToken from "../hooks/useAuthToken.jsx";
import "../assets/css/ProfileSection.css";
import { getUserProfile } from "../services/userProfileService";

export default function ProfileSection() {
  const authStatus = useAuthToken();
  const [profile, setProfile] = useState({
    id: "1",
    username: "",
    balance: 0,
    appointments: 0,
    phone: "",
  });
  const [appointmentsHistory, setAppointmentsHistory] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getUserData = async () => {
    if (authStatus !== null) {
      const user = await getUserProfile(authStatus.user.email);
      setProfile({
        id: user.id,
        username: user.username,
        balance: user.balance,
        appointments: user.appointments,
        phone: user.phone,
      });
    }
  };

  const getAppointmentHistory = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/fetchAppointments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userID: profile.id }),
      });
      const body = await req.json();
      if (body.status === "success") {
        console.log(body);
        setAppointments(body.appointments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [authStatus]);

  useEffect(() => {
    if (appointmentsHistory) {
      getAppointmentHistory();
    }
  }, [appointmentsHistory]);

  return (
    <section className="profile__section container">
      {authStatus ? (
        authStatus.status ? (
          <>
            <h1 className="profile__section--title">
              Welcome, <span className="username">{profile.username}</span>!
            </h1>
            <div className="profile__info">
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Cashback Balance:</strong> ${profile.balance.toFixed(2)}
              </p>
              <p>
                <strong>Appointments:</strong> {profile.appointments}
              </p>
              <p>
                <strong>Phone Number:</strong> {profile.phone}
              </p>
            </div>
            <div className="action__buttons">
              <button
                className="btn"
                onClick={() => setAppointmentsHistory(!appointmentsHistory)}
                aria-expanded={appointmentsHistory}
              >
                {appointmentsHistory
                  ? "Hide Appointments"
                  : "Show Appointments"}
              </button>
              <button className="btn">See Cashback History</button>
            </div>
            {appointmentsHistory && (
              <ul className="appointment__history--list">
                {appointments.map((item) => {
                  const {
                    id,
                    services,
                    start_datetime,
                    total_price,
                    cashback_used,
                  } = item;

                  const formattedDate = new Date(start_datetime).toLocaleString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    }
                  );

                  return (
                    <li className="appointment__history--item bgBeige" key={id}>
                      <h2 className="service__title">
                        Service:{" "}
                        <span className="service__name">
                          {services.join(", ")}
                        </span>
                      </h2>

                      <p>Total Price: {total_price} LEI</p>
                      <p>Cashback Used: {cashback_used} LEI</p>
                      <p>Start Time: {formattedDate}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <div className="notLoggedIn">
            <p>You are not logged in.</p>
          </div>
        )
      ) : (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </section>
  );
}
