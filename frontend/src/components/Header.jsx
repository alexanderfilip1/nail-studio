import React from "react";
import "../assets/css/Header.css";

const links = [
  {
    path: "About",
    link: "/about",
  },
  {
    path: "Services",
    link: "/services",
  },
  {
    path: "Contact",
    link: "/contact",
  },
  {
    path: "Book Now",
    link: "/book",
    className: "bookBtn",
  },
];

export default function Header() {
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
      </nav>
    </header>
  );
}
