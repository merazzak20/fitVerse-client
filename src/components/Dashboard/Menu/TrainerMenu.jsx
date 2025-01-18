import React from "react";
import MenuItem from "./MenuItem";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";

const TrainerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Plant"
        address="add-plant"
      />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      <MenuItem
        icon={FaCheckToSlot}
        label="Manage Slots"
        address="/dashboard/manageSlots"
      />
    </>
  );
};

export default TrainerMenu;
