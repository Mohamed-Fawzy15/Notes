"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  TokenContextProviderProps,
  TokenContextType,
} from "@/Interfaces/Interfaces";

export const TokenContext = createContext<TokenContextType | null>(null);

export default function TokenContextProvider({
  children,
}: TokenContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  console.log(token);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      Cookies.set("token", newToken, { expires: 7 }); // Expires in 7 days
    } else {
      Cookies.remove("token");
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </TokenContext.Provider>
  );
}
