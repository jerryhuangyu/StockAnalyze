import React from "react";

const HomeCard = ({ header, description, icon }) => {
  const headerString = String(header);

  return (
    <div className="bg-primary-50 shadow rounded-lg flex justify-between items-center px-9">
      <div className="flex flex-col">
        <h2 className="text-primary-out font-bold drop-shadow-sm text-5xl">
          {headerString ? headerString : "..."}
        </h2>
        <p className="text-primary-200">{description}</p>
      </div>
      <img className="w-10 mr-2" src={icon} alt="" />
    </div>
  );
};

export default HomeCard;
