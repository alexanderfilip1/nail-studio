import React from "react";
import "../assets/css/RegisterPopup.css";

export default function RegisterPopup({ onClose, onRegister }) {
  const handleRegisterClick = () => {
    onRegister();
  };

  const handleNoThankYouClick = () => {
    onClose();
  };

  return (
    <div className="register-popup ">
      <div className="register-popup__content fadeInRightBig">
        <h2>Register Now and Receive Cashback!</h2>
        <p>
          Register to receive cashback on your appointment. You can use it for
          your next appointment!
        </p>
        <div className="register-popup__buttons">
          <button onClick={handleRegisterClick} className="register-btn">
            Register
          </button>
          <button onClick={handleNoThankYouClick} className="no-thank-you-btn">
            No, Thank You
          </button>
        </div>
      </div>
    </div>
  );
}
