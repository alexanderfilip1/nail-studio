import React from "react";
import DynamicLinks from "../components/DynamicLinks";
import "../assets/css/MobileHeader.css";

export default function MobileHeader() {
  const links = DynamicLinks();

  return (
    <ul className="mobileHeader--list">
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
  );
}
