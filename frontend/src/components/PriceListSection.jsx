import React, { useEffect, useState } from "react";
import "../assets/css/PriceListSection.css";

const PriceList = ({ title, prices, categoryId }) => {
  const filteredPrices = prices.filter(
    (item) => item.category_id === categoryId
  );

  return (
    <ul className="priceList__list">
      <h1 className="priceList__list--title">{title}</h1>
      {filteredPrices.length > 0 ? (
        filteredPrices.map(({ id, name, price }) => (
          <li className="priceList__item" key={id}>
            <h1>
              {name} - <span>{price} LEI</span>
            </h1>
          </li>
        ))
      ) : (
        <li className="priceList__item">No prices available</li>
      )}
    </ul>
  );
};

export default function PriceListSection() {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPrices = async () => {
      try {
        const req = await fetch("http://localhost:3000/api/getPrices");
        const body = await req.json();
        setPrices(body);
      } catch (err) {
        setError("Failed to fetch prices");
        console.error(err);
      }
    };

    getPrices();
  }, []);

  return (
    <section className="priceList__section container bgBrown">
      <div className="priceList__content">
        <h1 className="priceList__title">Price List</h1>
        <article className="priceList__article">
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <PriceList title="Manichiură" prices={prices} categoryId={1} />
              <PriceList title="Pedichiură" prices={prices} categoryId={2} />
            </>
          )}
        </article>
      </div>
    </section>
  );
}
