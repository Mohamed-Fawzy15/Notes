"use client";
import { NotesContext } from "@/context/NotesContext/NotesContext";
import { useContext, useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import UpdateModal from "./(Component)/UpdateModal/UpdateModal";

export default function Home() {
  const { getNotes, removeNote, notes } = useContext(NotesContext);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(null);

  const removeData = async (id) => {
    const data = await removeNote(id);
    if (data.msg === "done") {
      Swal.fire({
        title: "Note deleted successfully",
        icon: "success",
        draggable: true,
      });
    }
  };

  const openUpdateModal = (note) => {
    setNoteToUpdate(note);
    setIsUpdateModalOpen(true);
  };

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div className="w-full">
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note, i) => (
            <div
              className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden rounded-lg"
              key={note._id}
            >
              <div className="w-24 h-24 bg-blue-500 rounded-full absolute -right-5 -top-7">
                <p className="absolute bottom-6 left-7 text-white text-2xl">
                  {i + 1}
                </p>
              </div>
              <div className="fill-violet-500 w-12">
                <GrNotes className="text-3xl text-blue-500" />
              </div>
              <h1 className="font-bold text-xl">{note.title}</h1>
              <p className="text-sm text-zinc-500 leading-6">{note.content}</p>

              <div
                onClick={() => openUpdateModal(note)}
                className="flex justify-between"
              >
                <button className=" cursor-pointer w-8 h-8 rounded-full flex justify-center items-center bg-blue-500">
                  <AiFillEdit className="text-white text-xl" />
                </button>

                <button
                  onClick={() => removeData(note._id)}
                  className="cursor-pointer group relative flex h-8 w-8 flex-col items-center justify-center overflow-hidden rounded-xl  border-red-800 bg-red-400 hover:bg-red-600"
                >
                  <svg
                    viewBox="0 0 1.625 1.625"
                    className="absolute -top-7 fill-white delay-100 group-hover:top-3 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                    height={15}
                    width={15}
                  >
                    <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
                    <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
                    <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
                  </svg>
                  <svg
                    width={16}
                    fill="none"
                    viewBox="0 0 39 7"
                    className="origin-right duration-500 group-hover:rotate-90"
                  >
                    <line
                      strokeWidth={4}
                      stroke="white"
                      y2={5}
                      x2={39}
                      y1={5}
                    />
                    <line
                      strokeWidth={3}
                      stroke="white"
                      y2="1.5"
                      x2="26.0357"
                      y1="1.5"
                      x1={12}
                    />
                  </svg>
                  <svg width={16} fill="none" viewBox="0 0 33 39">
                    <mask fill="white" id="path-1-inside-1_8_19">
                      <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                    </mask>
                    <path
                      mask="url(#path-1-inside-1_8_19)"
                      fill="white"
                      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                    />
                    <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
                    <path strokeWidth={4} stroke="white" d="M21 6V29" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>no notes</p>
        )}

        <UpdateModal
          isOpen={isUpdateModalOpen}
          setIsOpen={setIsUpdateModalOpen}
          noteToUpdate={noteToUpdate}
        />
      </div>
    </div>
  );
}
