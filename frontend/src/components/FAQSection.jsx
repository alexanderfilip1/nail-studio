import React, { useState } from "react";
import "../assets/css/FAQSection.css";
import faq from "../components/FAQList";

export default function FAQSection() {
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const handleAnswerOpen = (id) => {
    setOpenQuestionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <section className="faq__section bgBeige container">
        <div className="faq__wrapper">
          <h1 className="faq__section--title">FAQ</h1>
          <div className="articles__wrapper">
            {faq.map((item) => {
              const { id, answer, question } = item;
              const isAnswerOpen = openQuestionId === id;

              return (
                <article className="faq__article" key={id}>
                  <div className="question__wrapper">
                    <h3
                      className="faq__question"
                      onClick={() => handleAnswerOpen(id)}
                    >
                      {question}
                    </h3>
                  </div>
                  <div
                    className={
                      isAnswerOpen
                        ? "answer__wrapper fadeInDown show"
                        : "answer__wrapper fadeOutUp hide"
                    }
                  >
                    <p>{answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
