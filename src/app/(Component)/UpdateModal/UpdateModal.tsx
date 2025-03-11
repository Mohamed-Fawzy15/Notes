"use client";
import { useContext, useEffect } from "react";
import { NotesContext } from "@/context/NotesContext/NotesContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import { Modal, Box, Typography } from "@mui/material";
import { note } from "@/Interfaces/Interfaces"; // Ensure note includes _id

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 350,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "20px",
};

interface UpdateModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  noteToUpdate: note | null;
}

export default function UpdateModal({
  isOpen,
  setIsOpen,
  noteToUpdate,
}: UpdateModalProps) {
  const notesContext = useContext(NotesContext);

  if (!notesContext) {
    throw new Error("UpdateModal must be used within a NotesContextProvider");
  }

  const { updateNote } = notesContext;

  const { register, handleSubmit, setValue } = useForm<note>({ mode: "all" });

  useEffect(() => {
    if (noteToUpdate) {
      setValue("title", noteToUpdate.title);
      setValue("content", noteToUpdate.content);
    }
  }, [noteToUpdate, setValue]);

  const handleUpdateNote = async (values: note): Promise<void> => {
    if (!noteToUpdate || !noteToUpdate._id) {
      toast.error("No note or note ID selected to update");
      return;
    }
    const sendData = await updateNote(noteToUpdate._id, values);
    if (sendData?.msg === "done") {
      toast.success("Note updated successfully");
      setIsOpen(false);
    } else {
      toast.error("Failed to update note");
    }
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={style}>
        <div className="flex justify-between items-center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="p-2"
          >
            Update Note
          </Typography>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 mx-2 bg-white cursor-pointer rounded-3xl border-2 border-[#2B7FFF] shadow-[inset_0px_-2px_0px_1px_#2B7FFF] group hover:bg-[#2B7FFF] transition duration-300 ease-in-out"
          >
            <span className="font-medium text-[#333] group-hover:text-white flex justify-center items-center">
              <IoCloseOutline className="text-3xl" />
            </span>
          </button>
        </div>
        <hr />
        <form onSubmit={handleSubmit(handleUpdateNote)}>
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
            />
          </div>
          <hr />
          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer bg-gradient-to-b my-2 mx-2 from-blue-500 to-blue-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-1 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
            >
              <div className="relative overflow-hidden">
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Update Note
                </p>
                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Update Note
                </p>
              </div>
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
