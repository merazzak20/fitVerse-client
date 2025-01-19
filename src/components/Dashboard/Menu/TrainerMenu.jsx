import React from "react";
import MenuItem from "./MenuItem";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import { GrChapterAdd } from "react-icons/gr";

const TrainerMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaCheckToSlot}
        label="Manage Slots"
        address="/dashboard/manageSlots"
      />
      <MenuItem icon={GrChapterAdd} label="Add Slots" address="addSlots" />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
    </>
  );
};

export default TrainerMenu;
