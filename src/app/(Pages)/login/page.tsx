"use client";
import { Box, TextField } from "@mui/material";
import Image from "next/image";
import styles from "./login.module.css";
import loginImg from "../../../assets/login.svg";
import img from "../../../assets/vercel.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInterface } from "@/Interfaces/Interfaces";
import { isDirty, isValid, z } from "zod";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { TokenContext } from "@/context/Token/TokenContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const { setToken } = useContext(TokenContext);
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
    formState: { errors },
  } = useForm<loginInterface>({ mode: "all", resolver: zodResolver(schema) });

  const handleLogin = async (values: loginInterface) => {
    const data = await loginUser(values);
    localStorage.setItem("token", data.token);
    setToken(data.token);
    if (data.msg === "done") {
      router.push("/");
    }
  };
  return (
    <div>
      <div className=" flex items-center flex-col justify-center min-h-screen">
        <Box
          component="section"
          sx={{ p: 2, bgcolor: "#eee" }}
          className="rounded-lg w-2/3 text-center shadow-lg flex items-center"
        >
          <div className="w-1/2 flex items-center">
            <Image
              src={loginImg}
              alt="signup Image"
              className="w-full"
              width={100}
              height={100}
            />
          </div>
          <div className="w-1/2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Image src={img} alt="logo image" width={30} height={30} />
              </div>
              <h1 className="text-3xl ">log In</h1>
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
                        borderColor: "blue", // Change focus border color
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "black",
                        // Change focus label color
                      },
                    },
                    "& .mui-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        backgroundColor: "white",
                      },
                    ".mui-1t3gl92-MuiInputBase-root-MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      overflow: "hidden",
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
                        borderColor: "blue", // Change focus border color
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "black",
                        // Change focus label color
                      },
                    },
                    "& .mui-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        backgroundColor: "white",
                      },
                    ".mui-1t3gl92-MuiInputBase-root-MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      overflow: "hidden",
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
