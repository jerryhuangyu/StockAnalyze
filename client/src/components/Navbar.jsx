import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton, NavbarLink } from "./";
import { bookkeep, analyze, profileIcon, menu, guide } from "../assets";

const Navbar = ({ showOnboardGuide, driver }) => {
  const { user } = useAuth0();
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className="flex justify-between px-[5%] lg:px-10 h-[60px] bg-primary-50 ">
      <div className="flex items-center text-xl font-mono font-bold cursor-pointer">
        <Link to={"/"}>S-Insight</Link>
      </div>

      {/* menu for beyond sm */}
      <div className="sm:flex hidden">
        {/* TODO: naming conflict profile and login */}
        <NavbarLink icon={profileIcon} linkName={"Profile"} linkTo={"/login"} />
        <NavbarLink
          icon={analyze}
          linkName={"Analyze"}
          linkTo={"/symbol"}
          id="step-three"
        />
        <NavbarLink
          icon={bookkeep}
          linkName={"Bookkeep"}
          linkTo={"/add"}
          id="step-four"
        />
        <NavbarLink
          icon={guide}
          linkName={"Guide Me"}
          linkTo={"/"}
          onClick={(e) => {
            showOnboardGuide(driver);
            e.stopPropagation();
          }}
        />
        <LoginButton />
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
        <NavbarLink
          icon={profileIcon}
          linkName={"Profile"}
          linkTo={"/login"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
        <NavbarLink
          icon={analyze}
          linkName={"Analyze"}
          linkTo={"/symbol"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
        <NavbarLink
          icon={bookkeep}
          linkName={"Bookkeep"}
          linkTo={"/add"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
        <NavbarLink
          icon={guide}
          linkName={"Guide Me"}
          onClick={(e) => {
            setMenuToggle(!menuToggle);
            showOnboardGuide(driver);
            e.stopPropagation();
          }}
          className="gap-3 text-lg"
        />
        <LoginButton
          className="gap-3 text-lg"
          onClick={() => setMenuToggle(!menuToggle)}
        />
      </div>
    </div>
  );
};

export default Navbar;
