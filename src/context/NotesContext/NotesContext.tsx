"use client";

import { note } from "@/Interfaces/Interfaces";
import axios from "axios";
import { createContext } from "react";

export const NotesContext = createContext(null);

const headers = {
  token: "3b8ny__" + localStorage.getItem("token"),
};

const addNote = (values: note) => {
  return axios
    .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default function NotesContextProvider({ children }) {
  return (
    <NotesContext.Provider value={{ addNote }}>
      {children}
    </NotesContext.Provider>
  );
}
