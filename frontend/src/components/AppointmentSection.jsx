import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/css/AppointmentSection.css";

export default function AppointmentSection() {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

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

  const calculateTotalPrice = () => {
    return services.reduce((total, service) => {
      const price = prices.find((item) => item.name === service)?.price || 0;
      return total + parseFloat(price);
    }, 0);
  };

  const serviceSummary = () => {
    return (
      <div className="summary">
        <h3>Selected Services:</h3>
        <ul>
          {services.length > 0 ? (
            services.map((service, index) => <li key={index}>{service}</li>)
          ) : (
            <p>No services selected</p>
          )}
        </ul>
        {services.length > 0 && (
          <div className="summary-total">
            Total Price: {calculateTotalPrice()} LEI
          </div>
        )}
      </div>
    );
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (date && hour && minute) {
        setCurrentStep(2);
      } else {
        alert("Please select date and time.");
      }
    } else if (currentStep === 2) {
      if (services.length > 0) {
        setCurrentStep(3);
      } else {
        alert("Please select at least one service.");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="appointment__section container">
      <h1 className="appointment__section--title">Booking</h1>
      {currentStep === 1 && (
        <div className="step step-1">
          <h1>Time & Date</h1>
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
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
                      className={`picker-item ${h === hour ? "selected" : ""}`}
                      onClick={() => setHour(h)}
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
                      }`}
                      onClick={() => setMinute(m)}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="navigation-buttons">
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="step step-2">
          <h1>Service</h1>
          <div className="service__choose">
            {error ? (
              <p className="error-message">
                {error.message || "An error occurred"}
              </p>
            ) : (
              <>
                <PriceList title="Manichiură" prices={prices} categoryId={1} />
                <PriceList title="Pedichiură" prices={prices} categoryId={2} />
                <div className="summary-total">
                  Total Price: {calculateTotalPrice()} LEI
                </div>
                <div className="navigation-buttons">
                  <button onClick={handleBack}>Back</button>
                  <button onClick={handleContinue}>Continue</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="step step-3">
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
          {serviceSummary()}
          <div className="navigation-buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={() => alert("Appointment booked!")}>Submit</button>
          </div>
        </div>
      )}
    </section>
  );
}
