import React from "react";

const Footer = () => {
  return (
    <div
      className="text-center p-3 mt-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      &copy; {new Date().getFullYear()} Copyright:{" "}
      <a className="text-dark" href="https://portfolio-peach-one-10.vercel.app/">
        Jerry Huang
      </a>
    </div>
  );
};

export default Footer;
