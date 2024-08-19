import React from "react";
import logo from "../assets/images/manicure.svg";
import links from "../components/HeaderLinks";
import "../assets/css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer container">
      <section className="footer__section">
        <img src={logo} alt="Manicure logo" className="footer__logo" />
        <nav className="footer__navbar">
          <ul className="footer__links">
            {links.map((item) => {
              const { path, link } = item;
              return (
                <li className="footer__links--item" key={link}>
                  <a href={link} className="footer__links--anchor">
                    {path}
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className="footer__socialLinks">
            <li className="footer__socialLinks--item">
              <a href="#" className="footer__socialLinks--anchor">
                Instagram
              </a>
            </li>
            <li className="footer__socialLinks--item">
              <a href="#" className="footer__socialLinks--anchor">
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="footer__bottom">
        <p className="footer__copy">
          &copy; 2024 Your Company Name. All rights reserved.
        </p>
      </section>
    </footer>
  );
}
