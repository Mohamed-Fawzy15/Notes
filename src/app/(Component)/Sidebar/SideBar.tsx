"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiNextjsFill,
} from "react-icons/ri";
import { useContext, useState } from "react";
import { TokenContext } from "@/context/Token/TokenContext";
import { IoMdAddCircle } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddModal from "../Modal/Modal";
import Cookies from "js-cookie";
import { FaBars } from "react-icons/fa";

export default function SideBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // this state for the modal to add new note
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // this state to handle the mobile view

  const router = useRouter();

  const tokenContext = useContext(TokenContext);

  if (!tokenContext) {
    throw new Error("SideBar must be used within a TokenContextProvider");
  }

  const { token, setToken } = tokenContext;

  const handleLogOut = () => {
    setToken(null);
    Cookies.remove("token");
    router.push("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="lg:hidden flex justify-between sticky md:fixed px-5 pb-5 top-4 left-4 right-4 z-50">
        <IconButton
          size="large"
          sx={{
            bgcolor: "#2B7FFF",
            color: "white",
            "&:hover": { bgcolor: "#1a5ecc" },
          }}
        >
          <RiNextjsFill className="text-white text-2xl " />
        </IconButton>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            bgcolor: "#2B7FFF",
            color: "white",
            "&:hover": { bgcolor: "#1a5ecc" },
          }}
        >
          <FaBars />
        </IconButton>
      </div>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "white",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#DDDDDD",
            height: "100vh",
            width: "70px",
            boxShadow: "none",
            left: 0,
            // Responsive behavior
            transform: {
              xs: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // Slide in/out on mobile
              md: "translateX(0)", // Always visible on desktop
            },
            transition: "transform 0.3s ease-in-out", // Smooth slide animation
            zIndex: 1200, // Ensure it’s above content
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Matches your inline style
              alignItems: "center",
              height: "100vh",
              minHeight: "100vh", // Ensures full height
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ py: "10px", px: 0, mx: "auto" }}
              >
                <RiNextjsFill className="text-[#2B7FFF]" />
              </IconButton>

              {token && (
                <div
                  onClick={() => setIsOpen(true)}
                  className=" cursor-pointer bg-blue-500 w-10 h-7 flex justify-center items-center rounded-full"
                >
                  <IoMdAddCircle />
                </div>
              )}

              {!token && (
                <div className="flex flex-col gap-3">
                  <Link href={"/register"}>
                    <IoPersonAdd className="text-2xl my-2 text-blue-700" />
                  </Link>

                  <Link href={"/login"}>
                    <RiLoginCircleLine className="text-2xl my-2 text-blue-700" />
                  </Link>
                </div>
              )}
            </div>

            {token && (
              <div className="my-2">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleLogOut}
                  color="inherit"
                >
                  <RiLogoutCircleLine className="text-blue-700" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                ></Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <AddModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
    </>
  );
}
