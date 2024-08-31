import React, { useEffect, useState } from "react";
import "../assets/css/AdminPanelSection.css";
import DeleteBtn from "./DeleteBtn";
import { FaStar } from "react-icons/fa";

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

  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editRequiredTime, setEditRequiredTime] = useState(0);
  const [editCategoryId, setEditCategoryId] = useState(1);
  const [reviewsList, setReviewsList] = useState([]);

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
      getUserList();
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

  const handleEditButton = (service) => {
    setEditingServiceId(service.id);
    setEditName(service.name);
    setEditPrice(service.price);
    setEditRequiredTime(service.required_time);
    setEditCategoryId(service.category_id);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(
        `http://localhost:3000/api/admin/services/${editingServiceId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: editName,
            price: editPrice,
            required_time: editRequiredTime,
            category_id: editCategoryId,
          }),
        }
      );
      const body = await req.json();
      if (body.status === "success") {
        setEditingServiceId(null);
        getServices();
      } else {
        console.log("Failed to update service:", body.message);
      }
    } catch (err) {
      console.log("Failed to update service:", err);
    }
  };

  const getReviews = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/reviews");
      const body = await req.json();
      console.log(body);
      setReviewsList(body);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (id) => {
    try {
      const req = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const body = await req.json();
      console.log(body);
      getReviews();
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
              className={activeSection === "Services" ? "active" : ""}
              onClick={() => {
                handleSectionChange("Reviews");
                getReviews();
              }}
            >
              Reviews
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
                      onClick={() => handleEditButton(service)}
                    >
                      Edit
                    </button>
                    {editingServiceId === id && (
                      <div className="editService__container fadeIn">
                        <form
                          className="admin__form"
                          onSubmit={handleEditSubmit}
                        >
                          <label htmlFor="service__name">
                            Service Name
                            <input
                              type="text"
                              value={editName}
                              className="input"
                              id="service__name"
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          </label>
                          <label htmlFor="service__price">
                            Service Price
                            <input
                              type="number"
                              value={editPrice}
                              className="input"
                              id="service__price"
                              onChange={(e) => setEditPrice(e.target.value)}
                            />
                          </label>
                          <label htmlFor="service__time">
                            Required Time
                            <input
                              type="number"
                              value={editRequiredTime}
                              className="input"
                              id="service__time"
                              onChange={(e) =>
                                setEditRequiredTime(e.target.value)
                              }
                            />
                          </label>
                          <label htmlFor="serviceCategory">
                            Category
                            <select
                              name="serviceCategory"
                              id="serviceCategory"
                              value={editCategoryId}
                              onChange={(e) =>
                                setEditCategoryId(e.target.value)
                              }
                            >
                              <option value="1">Manicure</option>
                              <option value="2">Pedicure</option>
                            </select>
                          </label>
                          <div className="edit__actionButtons">
                            <button className="btn" type="submit">
                              Submit
                            </button>
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
        {activeSection === "Reviews" && (
          <div className="reviews__container fadeIn">
            <h1>Reviews</h1>
            <ul className="reviews__list">
              {reviewsList.map((review) => {
                const { id, name, review_text, stars } = review;
                return (
                  <li className="review__list--item list-item" key={id}>
                    <h3>Name: {name}</h3>
                    <b>Review Text: {review_text}</b>
                    <div>
                      {Array(stars)
                        .fill()
                        .map((_, i) => (
                          <FaStar key={i} className="star filled" />
                        ))}
                    </div>
                    <DeleteBtn action={deleteReview} id={id} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {activeSection === "Settings" && <h1>Settings</h1>}
      </article>
    </section>
  );
}
