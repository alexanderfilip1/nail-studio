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
        <h1 className="faq__section--title">FAQ</h1>
        {faq.map((item) => {
          const { id, answer, question } = item;
          const isAnswerOpen = openQuestionId === id;

          return (
            <article className="faq__article" key={id}>
              <h3
                className="faq__question"
                onClick={() => handleAnswerOpen(id)}
              >
                {question}
              </h3>
              <p
                className={
                  isAnswerOpen ? "faq__answer show" : "faq__answer hide"
                }
              >
                {answer}
              </p>
            </article>
          );
        })}
      </section>
    </>
  );
}
