import { Link } from "react-router-dom";

const NavbarLink = ({ icon, linkName, linkTo, onClick, className, id }) => {
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

export default NavbarLink;
