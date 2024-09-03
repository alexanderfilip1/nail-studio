import React from "react";

const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.6 19c1.1-2.8 4-4.8 6.4-4.8s5.3 2 6.4 4.8" />
  </svg>
);

export default UserIcon;
