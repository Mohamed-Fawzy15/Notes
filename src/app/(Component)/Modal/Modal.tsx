"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { note } from "@/Interfaces/Interfaces";
import { useContext } from "react";
import { NotesContext } from "@/context/NotesContext/NotesContext";
import { IoCloseOutline } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  borderRadius: "20px",
  boxShadow: 24,
};

export default function AddModal({ isOpen, setIsOpen }) {
  const handleClose = () => setIsOpen(false);
  const { addNote } = useContext(NotesContext);

  const { register, handleSubmit } = useForm<note>({ mode: "all" });

  const handleSendNote = async (values) => {
    const sendData = await addNote(values);
    console.log(sendData);
  };

  return (
    <div>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-between items-center">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="p-2"
              >
                New Note
              </Typography>

              <button className="w-8 h-8 mx-2 bg-white cursor-pointer rounded-3xl border-2 border-[#5a52fd] shadow-[inset_0px_-2px_0px_1px_#5a52fd] group hover:bg-[#5a52fd] transition duration-300 ease-in-out">
                <span className="font-medium text-[#333] group-hover:text-white flex justify-center items-center">
                  <IoCloseOutline className="text-3xl" />
                </span>
              </button>
            </div>

            <hr />
            <form onSubmit={handleSubmit(handleSendNote)}>
              <div>
                <input
                  type="text"
                  placeholder="Note Title"
                  {...register("title")}
                  className="focus:outline-none mx-2"
                />
              </div>

              <div>
                <textarea
                  placeholder="Write your thought here..."
                  {...register("content")}
                  className="w-full focus:outline-none p-2 resize-none"
                  rows={5}
                ></textarea>
              </div>
              <hr />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer bg-gradient-to-b my-2 mx-2 from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-1 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
                >
                  <div className="relative overflow-hidden">
                    <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Add Note
                    </p>
                    <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Add Note
                    </p>
                  </div>
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
