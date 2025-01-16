import React from "react";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { PiUsersFill } from "react-icons/pi";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
      <MenuItem
        icon={PiUsersFill}
        label="All Subscribers"
        address="allSubscriber"
      />
    </>
  );
};

export default AdminMenu;
