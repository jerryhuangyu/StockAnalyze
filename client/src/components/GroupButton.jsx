import { useState } from "react";
import { Link } from "react-router-dom";

const GroupButton = ({ names }) => {
  return (
    <div className="inline-flex rounded-md gap-[2px] shadow-sm">
      {names.map((name, index) => {
        return (
          <Link
            key={index + "btn"}
            to={`/symbol/${name.symbol}`}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 drop-shadow
            hover:bg-primary-50 hover:text-primary-600 focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-600
            first:rounded-l-lg first:rounded-r-sm rounded-sm last:rounded-r-lg last:rounded-l-sm"
            type="button"
          >
            {name.symbol}
          </Link>
        );
      })}
    </div>
  );
};

export default GroupButton;
