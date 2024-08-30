import React, { useEffect, useState } from "react";
import "../assets/css/AdminPanelSection.css";
import DeleteBtn from "./DeleteBtn";

export default function AdminPanelSection() {
  const [activeSection, setActiveSection] = useState("Users");
  const [userList, setUserList] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [originalAppointments, setOriginalAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [addService, setAddService] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDuration, setServiceDuration] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceCategory, setServiceCategory] = useState(1);
  const [editingServiceId, setEditingServiceId] = useState(null);

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
      console.log(body);
      setAppointments(body);
      setOriginalAppointments(body);
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      setAppointments(originalAppointments);
    } else {
      setAppointments(
        originalAppointments.filter((appointment) =>
          appointment.name.toLowerCase().includes(searchTerm)
        )
      );
    }
  };

  const getServices = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/admin/services", {
        method: "GET",
        credentials: "include",
      });
      const body = await req.json();
      setServices(body);
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  };

  const removeService = async (id) => {
    try {
      const req = await fetch(
        `http://localhost:3000/api/admin/services/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const body = await req.json();
      if (body.status === "success") {
        setServices((prevServices) =>
          prevServices.filter((services) => services.id !== id)
        );
      } else {
        console.log("Failed to delete appointment:", body.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createService = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/admin/services", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: serviceName,
          category_id: serviceCategory,
          required_time: serviceDuration,
          price: servicePrice,
        }),
      });
      const body = await req.json();
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditButton = (id) => {
    setEditingServiceId((prevId) => (prevId === id ? null : id));
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
              onClick={() => {
                handleSectionChange("Services");
                getServices();
              }}
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
                    <DeleteBtn action={removeUser} id={id} />
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {activeSection === "Appointments" && (
          <>
            <h1>
              All Appointments{" "}
              {appointments.length > 0 ? `(${appointments.length})` : ""}
            </h1>
            <input
              type="text"
              placeholder="Search by name"
              className="search"
              onChange={handleSearch}
            />
            <ul className="appointments__list">
              {appointments.map((appointment) => {
                const { id, name, phone, start_datetime } = appointment;
                return (
                  <li className="appointments__list--item list-item" key={id}>
                    <h3>{name}</h3>
                    <p>{phone}</p>
                    <p>{start_datetime}</p>
                    <DeleteBtn action={removeAppointment} id={id} />
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {activeSection === "Services" && (
          <>
            <h1>All Services</h1>
            <button
              className="btn addServiceBtn"
              onClick={() => setAddService(!addService)}
            >
              Add Service
            </button>
            {addService ? (
              <form
                className="admin__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  createService();
                }}
              >
                <label htmlFor="name">
                  <input
                    type="text"
                    placeholder="Service name"
                    className=""
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </label>
                <label htmlFor="number">
                  {" "}
                  <input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="Required time(minutes)"
                    onChange={(e) => setServiceDuration(e.target.value)}
                  />
                </label>
                <label htmlFor="price">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Service price"
                    onChange={(e) => setServicePrice(e.target.value)}
                  />
                </label>
                <label htmlFor="serviceChoice">
                  <select
                    name="serviceChoice"
                    id="serviceChoice"
                    onChange={(e) => {
                      setServiceCategory(e.target.value);
                    }}
                  >
                    <option value="1">Manicure</option>
                    <option value="2">Pedicure</option>
                  </select>
                </label>
                <button className="btn">Add</button>
              </form>
            ) : (
              ""
            )}
            <ul className="services__list">
              {services.map((service) => {
                const { id, price, name, category_id, required_time } = service;
                return (
                  <li key={id} className="services__list--item list-item">
                    <h3>
                      Name {name} ({category_id === 1 ? "Manicure" : "Pedicure"}
                      )
                    </h3>
                    <p>Price: {price}</p>
                    <p>Required Time: {required_time} min</p>
                    {editingServiceId !== id && (
                      <DeleteBtn action={removeService} id={id} />
                    )}
                    <button
                      className="btn"
                      onClick={() => handleEditButton(id)}
                    >
                      Edit
                    </button>
                    {editingServiceId === id && (
                      <div className="editService__container fadeIn">
                        <form className="admin__form">
                          <label htmlFor="service__name">
                            Service Name
                            <input
                              type="text"
                              value={name}
                              className="input"
                              id="service__name"
                            />
                          </label>
                          <label htmlFor="service__price">
                            Service Price
                            <input
                              type="number"
                              value={price}
                              className="input"
                              id="service__price"
                            />
                          </label>
                          <label htmlFor="service__time">
                            Required Time
                            <input
                              type="number"
                              value={required_time}
                              className="input"
                              id="service__time"
                            />
                          </label>
                          <label htmlFor="serviceCategory">
                            Category
                            <select
                              name="serviceCategory"
                              id="serviceCategory"
                              value={category_id}
                            >
                              <option value="1">Manicure</option>
                              <option value="2">Pedicure</option>
                            </select>
                          </label>
                          <div className="edit__actionButtons">
                            <button className="btn">Submit</button>
                            <button
                              className="btn"
                              onClick={() => setEditingServiceId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {activeSection === "Settings" && <h1>Settings</h1>}
      </article>
    </section>
  );
}
