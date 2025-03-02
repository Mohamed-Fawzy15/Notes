import Image from "next/image";
import img from "../../../assets/vercel.svg";
import { IoMdAdd, IoMdLogIn } from "react-icons/io";
import { RiUserAddFill } from "react-icons/ri";

export default function SideBar() {
  return (
    <div>
      <div>
        <div className="absolute flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[100vh]  max-w-[5rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2">
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Image src={img} alt="logo image" width={30} height={30} />
              </div>
            </h5>
          </div>
          <nav className="flex flex-col justify-between font-sans text-base font-normal h-screen text-gray-700">
            <div>
              <div
                role="button"
                tabIndex={0}
                className="group/navItem flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center bg-black w-10 h-6 rounded-full group-hover/navItem:bg-white">
                  <IoMdAdd className="text-white group-hover/navItem:text-black" />
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="group/navItem flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center bg-black w-10 h-6 rounded-full group-hover/navItem:bg-white">
                  <IoMdLogIn className="text-white group-hover/navItem:text-black" />
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="group/navItem flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center bg-black w-10 h-6 rounded-full group-hover/navItem:bg-white">
                  <RiUserAddFill className="text-white group-hover/navItem:text-black" />
                </div>
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
