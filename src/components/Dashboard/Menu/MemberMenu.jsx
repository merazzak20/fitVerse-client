import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { GrTransaction, GrUserAdmin } from "react-icons/gr";
import { FiTarget } from "react-icons/fi";
import { RiBodyScanFill } from "react-icons/ri";

const MemberMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MenuItem
        icon={RiBodyScanFill}
        label="Be A Trainer"
        address="/dashboard/memberToTrainer"
      />
      <MenuItem
        icon={FiTarget}
        label="My Booking"
        address="/dashboard/myBooking"
      />
      <MenuItem
        icon={GrTransaction}
        label="Payment History"
        address="/dashboard/paymentHistory"
      />
    </>
  );
};

export default MemberMenu;
