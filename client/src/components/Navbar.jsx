import React, { useState } from "react";
import { Link } from "react-router-dom";

import { bookkeep, analyze, home, menu } from "../assets";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className="flex justify-between px-[5%] lg:px-10 h-[60px] bg-primary-50 ">
      <div className="flex items-center text-xl font-mono font-bold cursor-pointer">
        <Link to={"/"}>S-Insight</Link>
      </div>

      {/* menu for beyond sm */}
      <div className="sm:flex hidden">
        <Link
          to={"/"}
          className="flex gap-2 items-center px-2 hover:bg-primary-300"
        >
          <img className="w-4 h-4" src={home} alt="home" />
          <p>Home</p>
        </Link>
        <Link
          to={"/symbol"}
          className="flex gap-2 items-center px-2 hover:bg-primary-300"
        >
          <img className="w-4 h-4" src={analyze} alt="analyze" />
          <p>Analyze</p>
        </Link>
        <Link
          to={"/add"}
          className="flex gap-2 items-center px-2 hover:bg-primary-300"
        >
          <img className="w-4 h-4" src={bookkeep} alt="bookkeep" />
          <p>Bookkeep</p>
        </Link>
      </div>

      {/* menu for sm */}
      <div className="flex items-center sm:hidden">
        <img
          className="w-5 cursor-pointer"
          src={menu}
          alt="menu"
          onClick={() => setMenuToggle(!menuToggle)}
        />
      </div>

      <div
        className={`${
          menuToggle ? "left-0" : "left-[-100%]"
        } absolute w-[60%] h-screen z-10 bg-primary-200 duration-700 py-10 px-12
        flex flex-col items-start gap-3`}
      >
        <Link
          to={"/"}
          className="flex gap-3 items-center px-2"
          onClick={() => setMenuToggle(!menuToggle)}
        >
          <img className="w-4 h-4" src={home} alt="home" />
          <p>Home</p>
        </Link>
        <Link
          to={"/symbol"}
          className="flex gap-3 items-center px-2"
          onClick={() => setMenuToggle(!menuToggle)}
        >
          <img className="w-4 h-4" src={analyze} alt="analyze" />
          <p>Analyze</p>
        </Link>
        <Link
          to={"/add"}
          className="flex gap-3 items-center px-2"
          onClick={() => setMenuToggle(!menuToggle)}
        >
          <img className="w-4 h-4" src={bookkeep} alt="bookkeep" />
          <p>Bookkeep</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
