"use client";
import { signUpInterface } from "@/Interfaces/Interfaces";
import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext(null);

const addUser = (values: signUpInterface) => {
  return axios
    .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default function AuthContextProvider({ children }) {
  return (
    <AuthContext.Provider value={{ addUser }}>{children}</AuthContext.Provider>
  );
}
