import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/css/AppointmentSection.css";

export default function AppointmentSection() {
  const [value, onChange] = useState(new Date());

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 3);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDate={today}
        maxDate={maxDate}
      />
    </div>
  );
}
