import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/css/AppointmentSection.css";

export default function AppointmentSection() {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [services, setServices] = useState([]);

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 3);

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 8).toString().padStart(2, "0")
  );

  const minutes = ["00", "15", "30", "45"];

  return (
    <section className="appointment__section container">
      <Calendar
        onChange={setDate}
        value={date}
        minDate={today}
        maxDate={maxDate}
      />
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
                  className={`picker-item ${m === minute ? "selected" : ""}`}
                  onClick={() => setMinute(m)}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
