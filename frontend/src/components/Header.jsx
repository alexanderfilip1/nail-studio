import React, { useState, useRef, useEffect } from "react";
import "animate.css"; // Import Animate.css
import "../assets/css/Header.css";
import MobileHeader from "./MobileHeader";
import links from "../components/HeaderLinks";
import logo from "../assets/images/logo.svg";

export default function Header({ mobileHeader, setMobileHeader }) {
  const [animation, setAnimation] = useState("");
  const mobileHeaderRef = useRef(null);

  const toggleMobileHeader = () => {
    if (mobileHeader) {
      setAnimation("fadeOutUp");
      setTimeout(() => {
        setMobileHeader(false);
      }, 750);
    } else {
      setMobileHeader(true);
      setAnimation("fadeInDown");
    }
  };

  const handleClickOutside = (event) => {
    if (
      mobileHeaderRef.current &&
      !mobileHeaderRef.current.contains(event.target)
    ) {
      setAnimation("fadeOutUp");
      setTimeout(() => {
        setMobileHeader(false);
      }, 750);
    }
  };

  useEffect(() => {
    if (mobileHeader) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileHeader]);

  return (
    <header className="header bgBeige container">
      <nav className="header__navbar">
        <a href="/" className="header__logo">
          <img
            src={logo}
            className="header__logo--img"
            alt="Anastasya Nails Artist logo"
          />
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
            {mobileHeader ? (
              <>
                <path
                  d="M6 18L18 6"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </svg>
        </div>
        {mobileHeader && (
          <div ref={mobileHeaderRef} className={`mobileHeader ${animation}`}>
            <MobileHeader />
          </div>
        )}
      </nav>
    </header>
  );
}
