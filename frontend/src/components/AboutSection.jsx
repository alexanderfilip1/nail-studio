import React from "react";
import "../assets/css/AboutSection.css";
import nailsWork from "../assets/images/nails_work.webp";

export default function AboutSection() {
  return (
    <section className="about__section bgBrown container">
      <article className="about__section--content">
        <h1>About Our Team</h1>
        <p>
          Meet the passionate team behind our nail artistry. From innovative
          techniques to personalized designs, we bring creativity and expertise
          to every manicure.
        </p>
      </article>
      <div className="about__image--text">
        <div className="about__image fadeInLeftBig">
          <img
            src={nailsWork}
            loading="lazy"
            alt="Anastasia working on nail art"
          />
        </div>
        <div className="about__side-text fadeInRightBig">
          <p>
            I am a skilled nail artist with over 3 years of experience
            specializing in manicures and pedicures. My passion for nail
            artistry is reflected in the meticulous care and creativity I bring
            to each client. With more than 100 happy clients, I take pride in
            delivering personalized and high-quality services that leave my
            clients feeling pampered and confident. Whether it's a classic look
            or a unique design, I strive to make every manicure and pedicure a
            masterpiece.
          </p>
        </div>
      </div>
    </section>
  );
}
