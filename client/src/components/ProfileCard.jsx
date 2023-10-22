import { useAuth0 } from "@auth0/auth0-react";
import { question } from "../assets";
import { Link } from "react-router-dom";
import { bell } from "../assets";

const LoginLink = () => (
  <Link
    to="/login"
    className="cursor-pointer bg-primary-hover hover:bg-primary-out px-3 rounded-full"
  >
    Login Now
  </Link>
);

const ProfileCard = () => {
  const { user } = useAuth0();
  const src = (user && user.picture) || question;
  const name = (user && (user.name || user.nickname)) || <LoginLink />;

  return (
    <div className="flex justify-between" id="step-one">
      <div className="flex gap-6">
        <img
          src={src}
          alt="member"
          className="w-[60px] object-cover aspect-square rounded-full"
        />
        <div>
          <p className="text-primary-300">Hello, good morning!</p>
          <p className="mt-2">{name}</p>
        </div>
      </div>
      <div className="flex items-center">
        <img src={bell} alt="notification" className="w-6 h-6" />
      </div>
    </div>
  );
};
export default ProfileCard;
