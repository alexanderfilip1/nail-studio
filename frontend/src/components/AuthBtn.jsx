import React from "react";

export default function AuthBtn({ action }) {
  return (
    <>
      <button type="submit" className="btn">
        {action}
      </button>
    </>
  );
}
