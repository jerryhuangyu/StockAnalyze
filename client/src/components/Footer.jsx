const Footer = () => {
  return (
    <>
      <div className="text-center p-3 mt-6 bg-zinc-300">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a
          className="text-dark"
          href="https://portfolio-peach-one-10.vercel.app/"
        >
          Jerry Huang
        </a>
      </div>
    </>
  );
};

export default Footer;
