import React from "react";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";

import { PiUsersFill } from "react-icons/pi";
import { TbGitPullRequest } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";

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
        icon={TbGitPullRequest}
        label="Trainer Applications"
        address="applliedTrainer"
      />
      <MenuItem
        icon={FaUsersGear}
        label="All Trainers"
        address="adminAllTrainer"
      />
    </>
  );
};

export default AdminMenu;
