import React, { useState } from "react";
import Slider from "react-slick";
import "../assets/css/ReviewSection.css";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewSection() {
  const [leaveReview, setLeaveReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewNotification, setReviewNotification] = useState("");
  const [reviews, setReviews] = useState([]);
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

  const getReviews = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/reviews");
      const body = await req.json();
      console.log(body);
      setReviews(body);
    } catch (err) {
      console.log(err);
    }
  };
  const createReview = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          rating: rating,
          name: reviewerName,
          text: reviewText,
        }),
      });
      const body = await req.json();
      setReviewNotification(body.message);
      setRating(0);
      getReviews();
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    getReviews();
  }, []);

  return (
    <section
      className="review-section container bgBeige"
      style={{ paddingTop: "1.5rem" }}
    >
      <h1 className="section-title">Reviews</h1>
      <Slider {...settings}>
        {reviews.map((item) => {
          const { id, name, review_text, stars } = item;
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
              <p className="review-text">{review_text}</p>
            </div>
          );
        })}
      </Slider>
      {!leaveReview && (
        <div className="review__actionBtns">
          <button
            className="btn review__btn"
            style={{ marginTop: "2rem" }}
            onClick={() => setLeaveReview(true)}
          >
            Leave a review
          </button>
        </div>
      )}
      {leaveReview && (
        <>
          <form
            action=""
            className="review__form fadeIn"
            onSubmit={(e) => {
              e.preventDefault();
              createReview();
            }}
          >
            <label htmlFor="name">
              <h3>Name</h3>
              <input
                type="text"
                id="name"
                className="input"
                onChange={(e) => setReviewerName(e.target.value)}
              />
            </label>
            <label htmlFor="review">
              <h3>Review</h3>
              <textarea
                name="reviewText"
                id="review"
                className="textarea__review input"
                maxLength={100}
                cols="30"
                placeholder="Very satisfied"
                rows={5}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </label>
            <label htmlFor="stars">
              <h3>Star Rate</h3>
              <div className="star-rating">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      className={`star ${rating > i ? "filled" : ""}`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
              </div>
            </label>
            <p className="notification">{reviewNotification}</p>
            <div className="review__actionBtns">
              <button className="btn review__btn">Submit</button>
              <button
                className="btn review__btn"
                onClick={() => setLeaveReview(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
