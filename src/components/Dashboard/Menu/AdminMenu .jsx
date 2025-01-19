import React from "react";
import MenuItem from "./MenuItem";
import { PiUsersFill } from "react-icons/pi";
import { TbGitPullRequest } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";
import { MdAssignmentAdd, MdOutlineQueryStats } from "react-icons/md";

const AdminMenu = () => {
  return (
    <>
      {/* <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" /> */}
      <MenuItem
        icon={MdOutlineQueryStats}
        label="Statistics"
        address="/dashboard"
      />
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
      <MenuItem
        icon={MdAssignmentAdd}
        label="Add Classes"
        address="addClasses"
      />
    </>
  );
};

export default AdminMenu;
