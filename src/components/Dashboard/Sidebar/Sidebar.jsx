import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import MenuItem from "../Menu/MenuItem";
import AdminMenu from "../Menu/AdminMenu ";
import TrainerMenu from "../Menu/TrainerMenu";
import MemberMenu from "../Menu/MemberMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const role = "admin";

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div>
      {/* Small Screen Navbar */}
      <div className="bg-orange-300 text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <h2 className="text-2xl font-bold">FitVerse</h2>
              {/* <img
                // className='hidden md:block'
                src={}
                alt="logo"
                width="100"
                height="100"
              /> */}
            </Link>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-orange-900"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-orange-300 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 rounded-none justify-center items-center bg-orange-500 mx-auto">
              <Link to="/">
                <h2 className="text-2xl font-bold">FitVerse</h2>
                {/* <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                /> */}
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/*  Menu Items */}
              {role === "member" && <MemberMenu />}
              {role === "trainer" && <TrainerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-zinc-800 hover:bg-orange-500   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
