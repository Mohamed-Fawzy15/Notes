"use client";
import { Box, TextField } from "@mui/material";
import Image from "next/image";
import styles from "./login.module.css";
import loginImg from "../../../assets/login.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInterface } from "@/Interfaces/Interfaces";
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { TokenContext } from "@/context/Token/TokenContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { RiNextjsFill } from "react-icons/ri";

export default function Login() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register must be used within an AuthContextProvider");
  }
  const { loginUser } = authContext;

  const tokenContext = useContext(TokenContext);

  const router = useRouter();

  const schema = z.object({
    email: z.string().email("Email must be valid"),
    password: z
      .string()
      .regex(/^[a-zA-Z0-9]{8,}$/, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<loginInterface>({ mode: "all", resolver: zodResolver(schema) });

  const handleLogin = async (values: loginInterface) => {
    try {
      const data = await loginUser(values);
      if (data.token && tokenContext) {
        tokenContext.setToken(data.token);
        Cookies.set("token", data.token, { expires: 7 });
        if (data.msg === "done") {
          router.push("/");
        }
      } else {
        tokenContext?.setToken(null);
        Cookies.remove("token");
      }
    } catch (error) {
      console.error("Login failed:", error);
      tokenContext?.setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <div>
      <div className="flex items-center flex-col justify-center min-h-screen">
        <Box
          component="section"
          sx={{ p: 2, bgcolor: "#eee" }}
          className="rounded-lg w-2/3 text-center shadow-lg flex items-center"
        >
          <div className="w-1/2 hidden md:flex items-center">
            <Image
              src={loginImg}
              alt="signup Image"
              className="w-full"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center">
                <RiNextjsFill className="text-[#2B7FFF] text-3xl" />
              </div>
              <h1 className="text-3xl">Log In</h1>
            </div>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col items-center"
            >
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
                  <div className="text-red-500 text-sm">
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
                <span className={styles.text}>Log In</span>
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
    </div>
  );
}
