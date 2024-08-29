import React from "react";

export default function DeleteBtn({ action, id }) {
  return (
    <button
      className="close__btn"
      aria-label="Remove user"
      onClick={() => {
        action(id);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ fill: "red" }}
      >
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12l-4.88 4.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.88 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.88-4.88c.38-.39.38-1.03 0-1.41z" />
      </svg>
    </button>
  );
}
