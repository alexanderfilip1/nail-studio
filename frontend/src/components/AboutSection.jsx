import React from "react";
import "../assets/css/AboutSection.css";

export default function AboutSection() {
  return (
    <>
      <section className="about__section bgBrown container">
        <article className="about__section--content">
          <h1>About Our</h1>
          <p>
            Meet the passionate team behind our nail artistry. From innovative
            techniques to personalized designs.
          </p>
        </article>
        <div className="about__section--cards">
          <article className="about__section--card">
            <h2>Our Story</h2>
            <p>Crafting Unique Nail Designs for Every</p>
          </article>

          <article className="about__section--card">
            <h2>Services</h2>
            <p>Elevate Your Look with Our Wide Range of Nail</p>
          </article>

          <article className="about__section--card">
            <h2>Contact Us</h2>
            <p>Crafting Unique Nail Designs for Every</p>
          </article>
        </div>
      </section>
    </>
  );
}
