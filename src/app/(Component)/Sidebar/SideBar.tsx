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

export default function SideBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const { token, setToken } = useContext(TokenContext);

  const handleLogOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "white",
        ".mui-ptdwpq-MuiPaper-root-MuiAppBar-root": {
          backgroundColor: "#DDDDDD",
          height: "100vh",
          width: "70px",
          position: "fixed",
        },
        ".MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.mui-1ygil4i-MuiToolbar-root":
          {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        ".mui-w6cvuv-MuiButtonBase-root-MuiIconButton-root": {
          marginLeft: "0",
          marginRight: "0",
        },
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <div className="flex flex-col justify-center items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
              }}
            >
              <RiNextjsFill className="text-black" />
            </IconButton>

            {token && (
              <div
                onClick={() => setIsOpen(true)}
                className=" cursor-pointer bg-gray-700 w-10 h-7 flex justify-center items-center rounded-full"
              >
                <IoMdAddCircle />
              </div>
            )}

            {!token && (
              <div>
                <Link href={"/register"}>
                  <IoPersonAdd className="text-2xl my-2 text-gray-700" />
                </Link>

                <Link href={"/login"}>
                  <RiLoginCircleLine className="text-2xl my-2 text-gray-700" />
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
                <RiLogoutCircleLine className="text-gray-700" />
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
  );
}
