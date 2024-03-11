import { useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";

import { LoginButton, NavbarLink } from "./";
import { bookkeep, analyze, profileIcon, home, menu, guide } from "../assets";
import { showGuide } from "../utils/guide";

const DesktopNavbar = () => (
  <div className="sm:flex hidden">
    <NavbarLink icon={home} linkName={"Home"} linkTo={"/"} />
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
        showGuide(false);
        e.stopPropagation();
      }}
    />
    <LoginButton />
  </div>
);

const MobileNavbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
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
          icon={home}
          linkName={"Home"}
          linkTo={"/"}
          onClick={() => setMenuToggle(!menuToggle)}
          className="gap-3 text-lg"
        />
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
            showGuide(true);
            e.stopPropagation();
          }}
          className="gap-3 text-lg"
        />
        <LoginButton
          className="gap-3 text-lg"
          onClick={() => setMenuToggle(!menuToggle)}
        />
      </div>
    </>
  );
};

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <div className="flex justify-between px-[5%] lg:px-10 h-[60px] bg-primary-50 ">
      <div
        data-cy="company-logo"
        className="flex items-center text-xl font-mono font-bold cursor-pointer"
      >
        <Link to={"/"}>S-Insight</Link>
      </div>
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
    </div>
  );
};

export default Navbar;
