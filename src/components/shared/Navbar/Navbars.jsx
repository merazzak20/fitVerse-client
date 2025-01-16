import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import Container from "../../Container";
import userIcon from "../../../assets/user.png";
import useAuth from "../../../hooks/useAuth";
import Loading from "../Loading";

const Navbars = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logOut, loading } = useAuth();
  console.log(user?.photoURL);

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
        <h3 className="font-bold mb-2 text-[18px hover:cursor-default">
          {user?.displayName}
        </h3>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/likedArtifacts">Liked Artifacts</Link>
      </li>
      <li>
        <p onClick={handleSignOut} className="">
          Logout <IoIosLogOut className="text-xl" />
        </p>
      </li>
    </>
  );
  return (
    <div className="bg-zinc-950 bg-opacity-50">
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
              Fit<span className="text-orange-500">Verse</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
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
