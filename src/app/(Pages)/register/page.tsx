"use client";

import { Box, TextField } from "@mui/material";
import Image from "next/image";
import signupImage from "../../../assets/signup.svg";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { signUpInterface } from "@/Interfaces/Interfaces";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { RiNextjsFill } from "react-icons/ri";

export default function Register() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register must be used within an AuthContextProvider");
  }
  const { addUser } = authContext;

  const router = useRouter();

  const schema = z.object({
    name: z
      .string()
      .min(3, "name must be more than 3 characters")
      .max(12, "name must be more than 12 characters"),
    email: z.string().email("Email must be valid"),
    password: z
      .string()
      .regex(/^[a-zA-Z0-9]{8,}$/, "Password must be at least 8 characters"),
    age: z.coerce
      .number()
      .min(16, "Age must be more than 16 characters")
      .max(100, "Age must be less than 100 characters"),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Phone must be egyption number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<signUpInterface>({ mode: "all", resolver: zodResolver(schema) });

  const registerUser = async (values: signUpInterface): Promise<void> => {
    const data = await addUser(values);

    if (data.msg === "done") {
      Swal.fire({
        title: "Sign up successful",
        icon: "success",
        draggable: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  return (
    <div className=" flex items-center flex-col justify-center min-h-screen">
      <Box
        component="section"
        sx={{ p: 2, bgcolor: "#eee" }}
        className="rounded-lg w-2/3 text-center shadow-lg flex items-center justify-center"
      >
        <div className="w-1/2 hidden md:flex items-center">
          <Image
            src={signupImage}
            alt="signup Image"
            className="w-full"
            width={100}
            height={100}
          />
        </div>

        <div className=" md:w-1/2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center">
              <RiNextjsFill className="text-[#2B7FFF] text-3xl" />
            </div>
            <h1 className="text-3xl ">Sign Up</h1>
          </div>

          <form
            onSubmit={handleSubmit(registerUser)}
            className="flex flex-col items-center"
          >
            {/* name */}
            <div className="w-full my-3">
              <TextField
                id="outlined-basic"
                label="Your Name"
                variant="outlined"
                {...register("name")}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                    backgroundColor: "white", // Moved here from hardcoded class
                    borderRadius: "20px", // Moved here from hardcoded class
                    overflow: "hidden", // Moved here from hardcoded class
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
              />
              {errors.name && (
                <div className="text-red-500 text-sm ">
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* email */}
            <div className="w-full my-3">
              <TextField
                id="outlined-basic"
                label="Your Email"
                variant="outlined"
                {...register("email")}
                type="email"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                    backgroundColor: "white", // Moved here from hardcoded class
                    borderRadius: "20px", // Moved here from hardcoded class
                    overflow: "hidden", // Moved here from hardcoded class
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
              />
              {errors.email && (
                <div className="text-red-500 text-sm ">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* password */}
            <div className="w-full my-3">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                {...register("password")}
                type="password"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                    backgroundColor: "white", // Moved here from hardcoded class
                    borderRadius: "20px", // Moved here from hardcoded class
                    overflow: "hidden", // Moved here from hardcoded class
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
              />
              {errors.password && (
                <div className="text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="flex justify-between gap-2 w-full my-3">
              <div className="w-1/3">
                {/* Age */}
                <TextField
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  {...register("age")}
                  type="text"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "blue",
                      },
                      backgroundColor: "white", // Moved here from hardcoded class
                      borderRadius: "20px", // Moved here from hardcoded class
                      overflow: "hidden", // Moved here from hardcoded class
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                  }}
                />

                {errors.age && (
                  <div className="text-red-500 text-sm">
                    {errors.age.message}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="w-2/3">
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  {...register("phone")}
                  type="tel"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "blue",
                      },
                      backgroundColor: "white", // Moved here from hardcoded class
                      borderRadius: "20px", // Moved here from hardcoded class
                      overflow: "hidden", // Moved here from hardcoded class
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                  }}
                />

                {errors.phone && (
                  <div className="text-red-500 text-sm">
                    {errors.phone.message}
                  </div>
                )}
              </div>
            </div>

            <button
              className={`${styles.animatedButton} disabled:cursor-not-allowed `}
              disabled={!isValid || !isDirty}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arr2}
                viewBox="0 0 24 24"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
              <span className={styles.text}>Sign Up</span>
              <span className={styles.circle} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arr1}
                viewBox="0 0 24 24"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
            </button>
          </form>
        </div>
      </Box>
    </div>
  );
}
