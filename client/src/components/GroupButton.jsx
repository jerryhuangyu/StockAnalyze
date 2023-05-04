import { useState } from "react";
import { Link } from "react-router-dom";

const GroupButton = ({ names }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      {names.map((name, index) => {
        return (
          <Link
            key={index + "btn"}
            to={`/symbol/${name.symbol}`}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 border-y
            hover:bg-primary-50 hover:text-primary-600 focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-600
            first:rounded-l-md last:rounded-r-md first:border last:border"
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
