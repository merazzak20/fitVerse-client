import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { GrTransaction, GrUserAdmin } from "react-icons/gr";

const MemberMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MenuItem
        icon={GrTransaction}
        label="Payment History"
        address="/dashboard/paymentHistory"
      />

      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </button>
    </>
  );
};

export default MemberMenu;
