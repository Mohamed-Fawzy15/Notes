import { ReactNode } from "react";

export interface signUpInterface {
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
}

export interface loginInterface {
  email: string;
  password: string;
}

export interface note {
  _id?: string; // we make it optional
  title: string;
  content: string;
}

export interface AddModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

// for token context
export interface TokenContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

export interface TokenContextProviderProps {
  children: ReactNode;
}

// for note context
export interface NotesContextType {
  notes: note[];
  setNotes: (notes: note[]) => void;
  getNotes: () => Promise<void>;
  addNote: (values: note) => Promise<{ msg: string } | undefined>; // we make it like that because it return object
  removeNote: (noteId: string) => Promise<void>;
  updateNote: (
    noteId: string,
    updatedNote: note
  ) => Promise<{ msg: string } | undefined>;
}

export interface NotesContextProviderProps {
  children: ReactNode;
}

// for auth context

export interface AuthResponse {
  msg: string;
  token?: string; // Only for loginUser
}
export interface AuthContextType {
  addUser: (values: signUpInterface) => Promise<AuthResponse>;
  loginUser: (values: loginInterface) => Promise<AuthResponse>;
}
export interface AuthContextProviderProps {
  children: ReactNode;
}

// update modal
export interface UpdateModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  noteToUpdate: note | null;
}
