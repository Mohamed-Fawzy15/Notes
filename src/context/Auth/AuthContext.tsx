"use client";
import { loginInterface, signUpInterface } from "@/Interfaces/Interfaces";
import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext(null);

const addUser = (values: signUpInterface) => {
  return axios
    .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const loginUser = (values: loginInterface) => {
  return axios
    .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
export default function AuthContextProvider({ children }) {
  return (
    <AuthContext.Provider value={{ addUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
}
