import { useAuth0 } from "@auth0/auth0-react";
import { login } from "../assets";

const LoginButton = ({ className = "", onClick = () => {} }) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const handleOnClick = isAuthenticated ? logout : loginWithRedirect;
  const buttonTitle = isAuthenticated ? "Log Out" : "Log In";
  return (
    <div
      className={`flex gap-2 items-center px-2 ${className}`}
      onClick={() => {
        handleOnClick();
        onClick();
      }}
    >
      <img className="w-4 h-4" src={login} alt={`${buttonTitle} botton`} />
      <button>{buttonTitle}</button>
    </div>
  );
};

export default LoginButton;
