import React, { useState } from "react";
import { Link } from "react-router-dom";

import { bookkeep, analyze, home, menu, login } from "../assets";

const MenuLink = ({ icon, linkName, linkTo, onClick, className, id }) => {
  return (
    <Link
      to={linkTo}
      className={`flex gap-2 items-center px-2 ${className}`}
      onClick={onClick}
      id={id}
    >
      <img className="w-4 h-4" src={icon} alt={linkName} />
      <p>{linkName}</p>
    </Link>
  );
};

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className="flex justify-between px-[5%] lg:px-10 h-[60px] bg-primary-50 ">
      <div className="flex items-center text-xl font-mono font-bold cursor-pointer">
        <Link to={"/"}>S-Insight</Link>
      </div>

      {/* menu for beyond sm */}
      <div className="sm:flex hidden">
        <MenuLink icon={home} linkName={"Home"} linkTo={"/"} />
        <MenuLink
          icon={analyze}
          linkName={"Analyze"}
          linkTo={"/symbol"}
          id="step-three"
        />
        <MenuLink
          icon={bookkeep}
          linkName={"Bookkeep"}
          linkTo={"/add"}
          id="step-four"
        />
        <MenuLink icon={login} linkName={"Login"} linkTo={"/login"} />
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
        } absolute w-[40%] min-w-[235px] max-w-[300px] h-screen z-10 bg-primary-200 duration-700 py-10 px-12
        flex flex-col items-start gap-3`}
      >
        <MenuLink
          icon={home}
          linkName={"Home"}
          linkTo={"/"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
        <MenuLink
          icon={analyze}
          linkName={"Analyze"}
          linkTo={"/symbol"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
        <MenuLink
          icon={bookkeep}
          linkName={"Bookkeep"}
          linkTo={"/add"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
        <MenuLink
          icon={login}
          linkName={"Login"}
          linkTo={"/login"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
      </div>
    </div>
  );
};

export default Navbar;
