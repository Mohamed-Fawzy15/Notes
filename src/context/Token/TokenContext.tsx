"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const TokenContext = createContext(null);

export default function TokenContextProvider({ children }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  // Function to update token in state and cookies
  const setToken = (newToken: string | null) => {
    if (newToken) {
      Cookies.set("token", newToken, { expires: 7 }); // Set token for 7 days
    } else {
      Cookies.remove("token"); // Remove token on logout
    }
    setTokenState(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
