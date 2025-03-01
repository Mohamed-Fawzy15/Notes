"use client";

import { Box, TextField } from "@mui/material";
// import Image from "next/image";
// import img from "../../../public/vercel.svg";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { signUpInterface } from "@/Interfaces/Interfaces";
import { isDirty, isValid, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";

export default function Register() {
  const { addUser } = useContext(AuthContext);

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
    formState: { errors },
  } = useForm<signUpInterface>({ mode: "all", resolver: zodResolver(schema) });

  const registerUser = async (values: signUpInterface) => {
    const data = await addUser(values);
    console.log(data);
  };

  return (
    <div className=" flex items-center flex-col justify-center">
      <Box
        component="section"
        sx={{ p: 2, bgcolor: "#eee" }}
        className="rounded-lg w-1/3 text-center shadow-lg"
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            {/* <Image src={img} alt="logo image" width={30} height={30} /> */}
          </div>
          <h1 className="text-3xl ">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit(registerUser)}>
          <div>
            <TextField
              id="outlined-basic"
              label="Your Name"
              variant="outlined"
              {...register("name")}
              sx={{
                width: "100%",
                marginY: "20px",
              }}
            />
            {errors.name && (
              <div className="text-red-500 text-sm m-2">
                {errors.name.message}
              </div>
            )}
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="Your Email"
              variant="outlined"
              {...register("email")}
              type="email"
              sx={{
                width: "100%",
                marginY: "20px",
              }}
            />
            {errors.email && (
              <div className="text-red-500 text-sm m-2">
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              {...register("password")}
              type="password"
              sx={{
                width: "100%",
                marginY: "20px",
              }}
            />
            {errors.password && (
              <div className="text-red-500 text-sm m-2">
                {errors.password.message}
              </div>
            )}
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="Age"
              variant="outlined"
              {...register("age")}
              type="text"
              sx={{
                width: "100%",
                marginY: "20px",
              }}
            />

            {errors.age && (
              <div className="text-red-500 text-sm m-2">
                {errors.age.message}
              </div>
            )}
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              {...register("phone")}
              type="tel"
              sx={{
                width: "100%",
                marginY: "20px",
              }}
            />

            {errors.phone && (
              <div className="text-red-500 text-sm m-2">
                {errors.phone.message}
              </div>
            )}
          </div>

          <button
            className={`${styles.animatedButton} disabled:cursor-not-allowed`}
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
      </Box>
    </div>
  );
}
