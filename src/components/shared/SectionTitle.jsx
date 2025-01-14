import React from "react";

const SectionTitle = ({ heading }) => {
  return (
    <div className=" my-10">
      <h2 className="text-orange-500 font-bold text-3xl uppercase">
        {heading}
      </h2>
    </div>
  );
};

export default SectionTitle;
