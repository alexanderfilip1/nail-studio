import React, { useState } from "react";
import "animate.css"; // Import Animate.css
import "../assets/css/Header.css";
import MobileHeader from "./MobileHeader";
import links from "../components/HeaderLinks";

export default function Header() {
  const [mobileHeader, setMobileHeader] = useState(false);
  const [animation, setAnimation] = useState("");

  const toggleMobileHeader = () => {
    if (mobileHeader) {
      setAnimation("fadeOutUp");
      setTimeout(() => {
        setMobileHeader(false);
      }, 900);
    } else {
      setMobileHeader(true);
      setAnimation("fadeInDown");
    }
  };

  return (
    <header className="header bgBeige container">
      <nav className="header__navbar">
        <a href="/" className="header__logo">
          Nail Artist
        </a>
        <ul className="header__navbar--list">
          {links.map((item, index) => {
            const { path, link, className } = item;
            return (
              <li className="header__navbar--item" key={index}>
                <a
                  href={link}
                  className={
                    className
                      ? `header__navbar--link ${className}`
                      : "header__navbar--link"
                  }
                >
                  {path}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="header__burgerMenu" onClick={toggleMobileHeader}>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {mobileHeader && (
          <div className={`mobileHeader ${animation}`}>
            <MobileHeader />
          </div>
        )}
      </nav>
    </header>
  );
}
