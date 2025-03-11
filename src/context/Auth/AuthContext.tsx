"use client";
import {
  AuthContextProviderProps,
  AuthContextType,
  loginInterface,
  signUpInterface,
} from "@/Interfaces/Interfaces";
import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

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
export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{ addUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
}
