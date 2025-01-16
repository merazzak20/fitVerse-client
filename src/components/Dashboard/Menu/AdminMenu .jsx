import React from "react";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";

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
      <MenuItem
        icon={PiUsersFill}
        label="All Trainers"
        address="adminAllTrainer"
      />
    </>
  );
};

export default AdminMenu;
