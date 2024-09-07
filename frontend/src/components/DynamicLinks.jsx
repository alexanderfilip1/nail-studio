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

  const checkIfAdmin = async () => {
    try {
      const req = await fetch("http://localhost:3000/api/checkAdmin", {
        method: "GET",
        credentials: "include",
      });
      const body = await req.json();
      return body.isAdmin;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    if (authStatus === null) return;

    const updateLinks = async () => {
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

      const isAdmin = await checkIfAdmin();
      if (isAdmin) {
        baseLinks = [
          {
            path: "Admin",
            link: "/admin",
            className: "adminBtn",
          },
          ...baseLinks,
        ];
      }

      if (authStatus.status === true && authStatus.user) {
        baseLinks.push(
          {
            path: "Profile",
            link: "/profile",
          },
          {
            path: "Book Now",
            link: "/book",
            className: "bookBtn",
          }
        );
      } else if (authStatus.status === false) {
        baseLinks.push(
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
          }
        );
      } else if (authStatus.status === "error") {
        console.error("Error verifying authentication");
      }

      setLinks(baseLinks);
    };

    updateLinks();
  }, [authStatus]);

  return Array.isArray(links) ? links : [];
};

export default DynamicLinks;
