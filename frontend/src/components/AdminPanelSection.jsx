import React, { useState } from "react";
import "../assets/css/AdminPanelSection.css";

export default function AdminPanelSection() {
  const [activeSection, setActiveSection] = useState("Users");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

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
              onClick={() => handleSectionChange("Appointments")}
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
        {activeSection === "Users" && <h1>All Users</h1>}
        {activeSection === "Appointments" && <h1>All Appointments</h1>}
        {activeSection === "Services" && <h1>All Services</h1>}
        {activeSection === "Settings" && <h1>Settings</h1>}
      </article>
    </section>
  );
}
