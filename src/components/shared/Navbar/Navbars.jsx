import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { IoIosLogOut } from "react-icons/io";
import { FaMoon, FaRegUserCircle, FaSun } from "react-icons/fa";
import Container from "../../Container";
import userIcon from "../../../assets/user.png";
import useAuth from "../../../hooks/useAuth";
import Loading from "../Loading";
import logo from "../../../assets/logo.png";

const Navbars = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logOut, loading } = useAuth();
  // console.log(user?.photoURL);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleSignOut = async () => {
    await logOut()
      .then(() => {
        // console.log("successful sign out");
      })
      .catch((error) => {
        // console.log("failed to sign out .stay here. dont leave me alone");
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allTrainer"> Trainers</NavLink>
      </li>
      <li>
        <NavLink to="/allClasses">Clasess</NavLink>
      </li>
      <li>
        <NavLink to="/allForums">All Forums</NavLink>
      </li>
    </>
  );

  const newUser = (
    <div className="space-y-2">
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </div>
  );
  if (loading) return <Loading></Loading>;
  const dropDownLinks = (
    <>
      <li>
        <Link
          to="/dashboard/profile"
          className="font-bold mb-2 text-[18px hover:cursor-default"
        >
          {user?.displayName}
        </Link>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <Link onClick={handleSignOut} className="">
          Logout <IoIosLogOut className="text-xl" />
        </Link>
      </li>
    </>
  );
  return (
    <div className="bg-zinc-950 bg-opacity-50 py-2">
      <Container>
        <div className="navbar  text-neutral-content">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-zinc-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link to="/" className="text-4xl font-bold">
              {/* Fit<span className="text-orange-500">Verse</span> */}
              <img className="w-44" src={logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            <button className="btn btn-square btn-ghost mr-4">
              <label className="swap swap-rotate w-12 h-12">
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  // show toggle image based on localstorage theme
                  checked={theme === "light" ? false : true}
                />
                {/* dark theme moon image */}
                <FaMoon className="w-8 h-8 swap-off"></FaMoon>
                {/* light theme sun image */}
                <FaSun className="w-8 h-8 swap-on"></FaSun>
              </label>
            </button>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user && user?.photoURL ? (
                    <img
                      className="w-10 border-2 border-orange-500 rounded-full"
                      src={user?.photoURL}
                      alt="Tailwind CSS Navbar component"
                    />
                  ) : (
                    <img
                      className="w-10 border-2 rounded-full"
                      alt="Tailwind CSS Navbar component"
                      src={userIcon}
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-zinc-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {user ? dropDownLinks : newUser}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbars;
