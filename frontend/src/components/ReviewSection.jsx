import React from "react";
import Slider from "react-slick";
import "../assets/css/ReviewSection.css";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewSection() {
  const reviews = [
    {
      id: 1,
      name: "Alex",
      review: "Very good service",
      stars: 5,
    },
    {
      id: 2,
      name: "John",
      review: "Nice",
      stars: 4,
    },
    {
      id: 3,
      name: "Benjamin",
      review: "Good service",
      stars: 4,
    },
    {
      id: 4,
      name: "Alice",
      review: "satisfied",
      stars: 3,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <section className="review-section container bgBeige">
      <h1 className="section-title">Reviews</h1>
      <Slider {...settings}>
        {reviews.map((item) => {
          const { id, name, review, stars } = item;
          return (
            <div className="review-card" key={id}>
              <div className="review-header">
                <h3 className="reviewer-name">{name}</h3>
                <div className="review-stars">
                  {Array(stars)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                </div>
              </div>
              <p className="review-text">{review}</p>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
