import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import AuthContextProvider from "@/context/Auth/AuthContext";
import SideBar from "./(Component)/Sidebar/SideBar";
import TokenContextProvider from "@/context/Token/TokenContext";
import NotesContextProvider from "@/context/NotesContext/NotesContext";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Notes App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <TokenContextProvider>
          <AuthContextProvider>
            <NotesContextProvider>
              <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  <div className="flex min-h-screen">
                    <div className="w-20">
                      <SideBar />
                    </div>

                    <main className="flex-1  w-full ">{children}</main>
                  </div>
                </ThemeProvider>
              </AppRouterCacheProvider>
            </NotesContextProvider>
          </AuthContextProvider>
        </TokenContextProvider>
      </body>
    </html>
  );
}
