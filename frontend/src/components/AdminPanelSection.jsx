import React, { useEffect, useState } from "react";
import "../assets/css/AdminPanelSection.css";

export default function AdminPanelSection() {
  const [activeSection, setActiveSection] = useState("Users");
  const [userList, setUserList] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const getUserList = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/admin/users", {
        method: "GET",
        credentials: "include",
      });
      const body = await req.json();
      setUserList(body);
    } catch (err) {
      console.log(err);
    }
  };

  const removeUser = async (id) => {
    try {
      const req = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const body = await req.json();
      setAppointments(body);
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  };

  const getAppointments = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/admin/appointments", {
        method: "GET",
        credentials: "include",
      });
      const body = await req.json();
      setAppointments(body);
    } catch (err) {
      console.log(err);
    }
  };

  const removeAppointment = async (id) => {
    try {
      const req = await fetch(
        `http://localhost:3000/api/admin/appointments/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const body = await req.json();
      if (body.status === "success") {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      } else {
        console.log("Failed to delete appointment:", body.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <section className="admin__section container">
      <aside className="admin__aside">
        <ul className="admin__aside--list">
          <li className="admin__aside--item">
            <button
              className={activeSection === "Users" ? "active" : ""}
              onClick={() => handleSectionChange("Users")}
            >
              Users
            </button>
          </li>
          <li className="admin__aside--item">
            <button
              className={activeSection === "Appointments" ? "active" : ""}
              onClick={() => {
                handleSectionChange("Appointments");
                getAppointments();
              }}
            >
              Appointments
            </button>
          </li>
          <li className="admin__aside--item">
            <button
              className={activeSection === "Services" ? "active" : ""}
              onClick={() => handleSectionChange("Services")}
            >
              Services
            </button>
          </li>
          <li className="admin__aside--item">
            <button
              className={activeSection === "Settings" ? "active" : ""}
              onClick={() => handleSectionChange("Settings")}
            >
              Settings
            </button>
          </li>
        </ul>
      </aside>
      <article className="admin__content">
        {activeSection === "Users" && (
          <>
            <h1>
              All Users{userList.length > 0 ? `(${userList.length})` : ""}
            </h1>
            <ul className="user__list">
              {userList.map((user) => {
                const { id, username, email, balance, appointment, phone } =
                  user;
                return (
                  <li key={id} className="user__list--item list-item">
                    <h3>Username: {username}</h3>
                    <p>Email :{email}</p>
                    <p>Balance: {balance}</p>
                    <p>Appointments: {appointment}</p>
                    <p>Phone Number: {phone}</p>
                    <button
                      className="close__btn"
                      aria-label="Remove user"
                      onClick={() => {
                        removeUser(id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ fill: "red" }}
                      >
                        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12l-4.88 4.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.88 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.88-4.88c.38-.39.38-1.03 0-1.41z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {activeSection === "Appointments" && (
          <>
            <h1>All Appointments</h1>
            <ul className="appointments__list">
              {appointments.map((appointment) => {
                const { id, name, phone, start_datetime } = appointment;
                return (
                  <li className="appointments__list--item list-item" key={id}>
                    <h3>{name}</h3>
                    <p>{phone}</p>
                    <p>{start_datetime}</p>
                    <button
                      className="close__btn"
                      aria-label="Remove user"
                      onClick={() => {
                        removeAppointment(id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ fill: "red" }}
                      >
                        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12l-4.88 4.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.88 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.88-4.88c.38-.39.38-1.03 0-1.41z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {activeSection === "Services" && <h1>All Services</h1>}
        {activeSection === "Settings" && <h1>Settings</h1>}
      </article>
    </section>
  );
}
