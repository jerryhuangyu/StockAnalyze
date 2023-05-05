import React from "react";
import { Link } from "react-router-dom";
import {
  bookkeep,
  analyze,
  home,
} from "../assets";

const Navbar = () => {
  return (
    <div className="flex justify-between px-10 gap-3 h-12 bg-primary-200">
      <div className="flex items-center text-xl font-mono font-bold cursor-pointer">
        <Link to={"/"}>
          Olulu Stock
        </Link>
      </div>
      <div className="flex">
        <Link to={"/"} className="flex gap-1 items-center px-2 hover:bg-primary-300">
          <img className="w-4 h-4" src={home} alt="home" />
          <p>Home</p>
        </Link>
        <Link to={"/symbol"} className="flex gap-1 items-center px-2 hover:bg-primary-300">
          <img className="w-4 h-4" src={analyze} alt="analyze" />
          <p>Analyze</p>
        </Link>
        <Link to={"/add"} className="flex gap-1 items-center px-2 hover:bg-primary-300">
          <img className="w-4 h-4" src={bookkeep} alt="bookkeep" />
          <p>Bookkeep</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
