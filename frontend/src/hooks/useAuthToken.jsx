import { useState, useEffect } from "react";

const useAuthToken = () => {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/verifyToken", {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        if (result.message === "authenticated") {
          setAuthStatus({ status: true, user: result.user });
        } else {
          setAuthStatus({ status: false });
        }
      } catch (err) {
        console.error("Error verifying authentication", err);
        setAuthStatus({ status: "error" });
      }
    };

    fetchAuthToken();
  }, []);

  return authStatus;
};

export default useAuthToken;
