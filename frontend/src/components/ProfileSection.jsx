import { useEffect, useState } from "react";
import useAuthToken from "../hooks/useAuthToken.jsx";
import "../assets/css/ProfileSection.css";
import { getUserProfile } from "../services/userProfileService";

export default function ProfileSection() {
  const authStatus = useAuthToken();
  const [profile, setProfile] = useState({
    id: "",
    username: "",
    balance: 0,
    appointments: 0,
    phone: "",
  });
  const [appointmentsHistory, setAppointmentsHistory] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [cashbackHistory, setCashbackHistory] = useState(false);
  const [cashback, setCashback] = useState([]);

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
    if (profile.id) {
      try {
        const req = await fetch("http://localhost:3000/api/fetchAppointments", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userID: profile.id }),
        });
        const body = await req.json();
        if (body.status === "success") {
          setAppointments(body.appointments);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getCashbackHistory = async () => {
    if (profile.id) {
      try {
        const req = await fetch("http://localhost:3000/api/cashbackHistory", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userID: profile.id }),
        });
        const body = await req.json();
        if (body.status === "success") {
          setCashback(body.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [authStatus]);

  useEffect(() => {
    if (appointmentsHistory && profile.id) {
      setCashbackHistory(false);
      getAppointmentHistory();
    }
  }, [appointmentsHistory, profile.id]);

  useEffect(() => {
    if (cashbackHistory && profile.id) {
      setAppointmentsHistory(false);
      getCashbackHistory();
    }
  }, [cashbackHistory, profile.id]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

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
              <button
                className="btn"
                onClick={() => {
                  setCashbackHistory(!cashbackHistory);
                }}
              >
                {cashbackHistory
                  ? "Hide Cashback History"
                  : "See Cashback History"}
              </button>
            </div>
            {appointmentsHistory &&
              (appointments.length > 0 ? (
                <ul className="appointment__history--list fadeIn">
                  {appointments.map((item) => {
                    const {
                      id,
                      services,
                      start_datetime,
                      total_price,
                      cashback_used,
                    } = item;

                    const formattedDate = formatDate(start_datetime);

                    return (
                      <li
                        className="appointment__history--item bgBeige"
                        key={id}
                      >
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
              ) : (
                <h2>No appointment history available.</h2>
              ))}

            {cashbackHistory &&
              (cashback.length > 0 ? (
                <ul className="appointment__history--list fadeIn">
                  {cashback.map((item) => {
                    const { id, cashback, usage_date, op } = item;
                    const formattedDate = formatDate(usage_date);

                    const cashbackClass =
                      op === "+" ? "cashback-positive" : "cashback-negative";

                    return (
                      <li
                        className={`appointment__history--item ${cashbackClass}`}
                        key={id}
                      >
                        <h2 className="service__title">
                          Cashback Amount:{" "}
                          <span className="service__name">
                            {op}
                            {cashback}
                          </span>
                        </h2>
                        <p>Usage date: {formattedDate}</p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <h2>No cashback history available.</h2>
              ))}
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
