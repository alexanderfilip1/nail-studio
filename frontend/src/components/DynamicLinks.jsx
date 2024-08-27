import React, { useState, useEffect } from "react";
import useAuthToken from "../hooks/useAuthToken";

const DynamicLinks = () => {
  const [links, setLinks] = useState([
    {
      path: "About",
      link: "/about",
    },
    {
      path: "Services",
      link: "/services",
    },
    {
      path: "Contact",
      link: "/contact",
    },
  ]);

  const authStatus = useAuthToken();

  useEffect(() => {
    if (authStatus === null) return;

    let baseLinks = [
      {
        path: "About",
        link: "/about",
      },
      {
        path: "Services",
        link: "/services",
      },
      {
        path: "Contact",
        link: "/contact",
      },
    ];

    if (authStatus.status === true && authStatus.user) {
      baseLinks = [
        ...baseLinks,
        {
          path: "Profile",
          link: "/profile",
        },
        {
          path: "Book Now",
          link: "/book",
          className: "bookBtn",
        },
      ];
    } else if (authStatus.status === false) {
      baseLinks = [
        ...baseLinks,
        {
          path: "Log In",
          link: "/login",
        },
        {
          path: "Register",
          link: "/register",
        },
        {
          path: "Book Now",
          link: "/book",
          className: "bookBtn",
        },
      ];
    } else if (authStatus.status === "error") {
      console.error("Error verifying authentication");
    }

    setLinks(baseLinks);
  }, [authStatus]);

  return Array.isArray(links) ? links : [];
};

export default DynamicLinks;
