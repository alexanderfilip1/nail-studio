import React from "react";
import "../assets/css/ServicesSection.css";

export default function ServicesSection() {
  return (
    <section className="services__section bgBeige container">
      <div className="services__section--content">
        <h1 className="services__section--title">Services</h1>
        <article className="services__section--cards">
          <article className="services__section--card">
            <img src="https://unsplash.it/300/300" alt="" />
            <ul className="services__section--list">
              <li className="services__section--listItem">
                Manichiura clasica
              </li>
              <li className="services__section--listItem">Manichiura gel</li>
              <li className="services__section--listItem">
                Manichiura semipermanenta
              </li>
              <li className="services__section--listItem">
                Construcție Tips/Sablon
              </li>
            </ul>
          </article>
          <article className="services__section--card">
            <img src="https://unsplash.it/300/300" alt="" />
            <ul className="services__section--list">
              <li className="services__section--listItem">
                Pedichiura clasica
              </li>
              <li className="services__section--listItem">
                Pedichiura semipermanenta
              </li>
              <li className="services__section--listItem">Pedichiura gel</li>
              <li className="services__section--listItem">
                Pedichiură medicală
              </li>
              <li className="services__section--listItem">
                Curățarea tălpilor
              </li>
            </ul>
          </article>
        </article>
      </div>
    </section>
  );
}
