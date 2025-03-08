"use client";

import { note } from "@/Interfaces/Interfaces";
import axios from "axios";
import { createContext, useState } from "react";

export const NotesContext = createContext(null);

const headers = {
  token: "3b8ny__" + localStorage.getItem("token"),
};

export default function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const res = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        { headers }
      );
      setNotes(res.data.notes);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addNote = async (values: note) => {
    try {
      const response = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        values,
        { headers }
      );
      setNotes((prevNotes) => [...prevNotes, response.data.note]); // Add the new note to the state
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const removeNote = async (noteId: string) => {
    try {
      const res = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        {
          headers,
        }
      );
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const updateNote = async (noteId: string, updatedNote: note) => {
    try {
      const res = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        updatedNote,
        { headers }
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, ...updatedNote } : note
        )
      );

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NotesContext.Provider
      value={{ addNote, getNotes, removeNote, notes, setNotes, updateNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}
