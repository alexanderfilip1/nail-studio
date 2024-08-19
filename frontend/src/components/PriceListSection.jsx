import React from "react";
import "../assets/css/PriceListSection.css";

export default function PriceListSection() {
  return (
    <>
      <section className="priceList__section container bgBrown">
        <div className="priceList__content">
          <h1 className="priceList__title">Price List</h1>
          <article className="priceList__article">
            <ul className="priceList__list">
              <li className="priceList__item">Item 1 - $10</li>
              <li className="priceList__item">Item 2 - $20</li>
              <li className="priceList__item">Item 3 - $30</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
