"use client";

import {
  note,
  NotesContextProviderProps,
  NotesContextType,
} from "@/Interfaces/Interfaces";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { TokenContext } from "../Token/TokenContext";

export const NotesContext = createContext<NotesContextType | null>(null);

export default function NotesContextProvider({
  children,
}: NotesContextProviderProps) {
  const [notes, setNotes] = useState<note[]>([]);

  const tokenContext = useContext(TokenContext);

  if (!tokenContext) {
    throw new Error("UpdateModal must be used within a NotesContextProvider");
  }

  const { token } = tokenContext;

  const headers = {
    token: "3b8ny__" + token,
  };

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
      throw err;
    }
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
      throw err;
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
