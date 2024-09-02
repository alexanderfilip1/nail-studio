import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "../assets/css/AppointmentSection.css";
import Loader from "../components/Loader";
import useAuthToken from "../hooks/useAuthToken.jsx";
import { getUserProfile } from "../services/userProfileService";
import RegisterPopup from "./RegisterPopup.jsx";

export default function AppointmentSection() {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [notification, setNotification] = useState("");
  const [finishAppointment, setFinishAppointment] = useState(false);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [userID, setUserID] = useState(0);
  const [cashback, setCashback] = useState(0);
  const [cashbackUse, setCashbackUse] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [registerPopup, setRegisterPopup] = useState(false);


  const navigate = useNavigate();

  const PriceList = ({ title, prices, categoryId }) => {
    const filteredPrices = prices.filter(
      (item) => item.category_id === categoryId
    );

    return (
      <div className="price-list">
        <h2>{title}</h2>
        {filteredPrices.length > 0 ? (
          filteredPrices.map(({ id, name, price }) => (
            <div
              key={id}
              className={`price-list__item ${
                services.includes(name) ? "selected" : ""
              }`}
              onClick={() => handleServiceClick(name)}
            >
              <span className="price-list__name">{name}</span>
              <span className="price-list__price">{price} LEI</span>
            </div>
          ))
        ) : (
          <p className="price-list__no-data">No prices available</p>
        )}
      </div>
    );
  };

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 3);

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 8).toString().padStart(2, "0")
  );

  const minutes = ["00", "15", "30", "45"];

  const handleServiceClick = (service) => {
    setServices((prevServices) => {
      if (prevServices.includes(service)) {
        return prevServices.filter((s) => s !== service);
      }
      return [...prevServices, service];
    });
  };

  useEffect(() => {
    const getPrices = async () => {
      try {
        const req = await fetch("http://localhost:3000/api/getPrices");
        const body = await req.json();
        setPrices(body);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    getPrices();
  }, []);

  useEffect(() => {
    const getUnavailableSlots = async () => {
      try {
        const req = await fetch(
          `http://localhost:3000/api/getUnavailableSlots?date=${
            date.toLocaleDateString().split("T")[0]
          }`
        );
        const body = await req.json();
        setUnavailableSlots(body);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    getUnavailableSlots();
  }, [date]);

  const calculateTotalPrice = () => {
    let totalPrice = services.reduce((total, service) => {
      const price = prices.find((item) => item.name === service)?.price || 0;
      return total + parseFloat(price);
    }, 0);

    if (cashbackUse) {
      // Apply cashback if it's enabled and the user has enough balance
      totalPrice = Math.max(totalPrice - userBalance, 0);
    }

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  const handleContinue = () => {
    if (currentStep === 1) {
      if (date && hour && minute) {
        setCurrentStep(2);
      } else {
        setError("Please select date and time.");
      }
    } else if (currentStep === 2) {
      if (services.length > 0) {
        setCurrentStep(3);
      } else {
        setError("Please select at least one service.");
      }
    }
  };

  const handleBack = () => {
    setError();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isSlotUnavailable = (hour, minute) => {
    const selectedSlot = new Date(date);
    selectedSlot.setHours(hour);
    selectedSlot.setMinutes(minute);

    return unavailableSlots.some((slot) => {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      return selectedSlot >= start && selectedSlot < end;
    });
  };

  const registerAppointment = async () => {
    setRegisterPopup(false);
    setLoader(true);
    const formattedTime = `${hour}:${minute}`;
    const formattedDate = date.toLocaleDateString().split("T")[0];

    const finalPrice = calculateTotalPrice();
    const cashbackUsed = cashbackUse
      ? Math.min(finalPrice + userBalance, userBalance)
      : 0;

    const appointmentData = {
      name: clientName,
      phone: clientPhone,
      date: formattedDate,
      time: formattedTime,
      service: services,
      userID: userID,
      cashback: cashbackUsed,
    };

    try {
      const req = await fetch("http://localhost:3000/api/createAppointment", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
      const body = await req.json();
      if (body.status === "success") {
        setNotification(body.message);
        setFinishAppointment(true);
        setUserBalance((prevBalance) => prevBalance - cashbackUsed);
      } else {
        setError(body.message);
      }
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  const authStatus = useAuthToken();

  const getUserBalance = async (email) => {
    const { balance } = await getUserProfile(email);
    setUserBalance(balance);
  };

  useEffect(() => {
    if (authStatus === null) {
      return;
    }

    if (authStatus.status === true && authStatus.user) {
      getUserBalance(authStatus.user.email);
      setUserID(authStatus.user.id);
    } else if (authStatus.status === false) {
      console.log("User is not authenticated");
    } else if (authStatus.status === "error") {
      console.error("Error verifying authentication");
    }
  }, [authStatus]);

  useEffect(() => {
    if (authStatus === null) {
      return;
    }
    if (authStatus.status === true) {
      setCashback(Math.round(totalPrice / 10));
    }
  }, [authStatus, totalPrice]);

  const showUserCashback = () => {
    if (authStatus === null) {
      return;
    }
    if (authStatus.status === true && userBalance > 0) {
      return (
        <label>
          <input
            type="checkbox"
            name="cashback"
            id="cashback"
            checked={cashbackUse}
            onChange={() => setCashbackUse(!cashbackUse)}
          />
          USE {userBalance} LEI from your cashback towards your balance
        </label>
      );
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      {loader && <Loader />}
      {registerPopup && (
        <RegisterPopup
          onClose={registerAppointment}
          onRegister={handleRegister}
        />
      )}
      <section className="appointment__section container">
        <h1 className="appointment__section--title">Booking</h1>
        {currentStep === 1 && (
          <div className="step step-1 fadeInLeftBig">
            <h1>Time & Date</h1>
            <div className="calendar-container">
              <Calendar
                onChange={(selectedDate) => {
                  setDate(selectedDate);
                }}
                value={date}
                minDate={today}
                maxDate={maxDate}
              />
            </div>
            <div className="time-picker-container">
              <div className="time-picker">
                <div className="picker-wheel">
                  <div className="picker-content">
                    {hours.map((h) => (
                      <div
                        key={h}
                        className={`picker-item ${
                          h === hour ? "selected" : ""
                        } ${isSlotUnavailable(h, minute) ? "unavailable" : ""}`}
                        onClick={() =>
                          !isSlotUnavailable(h, minute) && setHour(h)
                        }
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="picker-wheel">
                  <div className="picker-content">
                    {minutes.map((m) => (
                      <div
                        key={m}
                        className={`picker-item ${
                          m === minute ? "selected" : ""
                        } ${isSlotUnavailable(hour, m) ? "unavailable" : ""}`}
                        onClick={() =>
                          !isSlotUnavailable(hour, m) && setMinute(m)
                        }
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="error-message">{error}</p>
            <div className="navigation-buttons">
              <button onClick={handleContinue}>Continue</button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="step step-2 fadeInRightBig">
            <h1>Service</h1>
            <div className="service__choose">
              <>
                <PriceList title="Manichiură" prices={prices} categoryId={1} />
                <PriceList title="Pedichiură" prices={prices} categoryId={2} />
                <div className="summary-total">
                  Total Price: {calculateTotalPrice()} LEI
                </div>
                <p className="error-message">{error}</p>
                {showUserCashback()}
                <div className="navigation-buttons">
                  <button onClick={handleBack}>Back</button>
                  <button onClick={handleContinue}>Continue</button>
                </div>
              </>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="step step-3 fadeInRightBig">
            <h1>Client Data</h1>
            <div className="client-info">
              <label>
                Full Name:
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </label>
            </div>
            <div className="summary">
              <h3>Selected Services:</h3>
              <ul>
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))
                ) : (
                  <p>No services selected</p>
                )}
              </ul>
              {services.length > 0 && (
                <div className="summary-total">
                  Total Price: {totalPrice} LEI
                  {!cashbackUse && (
                    <h4> Cashback: {Math.min(cashback, totalPrice)} LEI</h4>
                  )}
                </div>
              )}
            </div>
            <p className="error-message">{error}</p>
            <p className="notification">{notification}</p>
            <div className="navigation-buttons">
              {finishAppointment ? (
                <a href="/" className="btn">
                  Back to homepage
                </a>
              ) : (
                <div className="navigation-buttons">
                  <button onClick={handleBack}>Back</button>
                  <button
                    onClick={() => {
                      if (clientName && clientPhone) {
                        if (authStatus.status === false) {
                          setRegisterPopup(true);
                        }
                        registerAppointment();
                      } else {
                        setError("Enter your name and phone number");
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
