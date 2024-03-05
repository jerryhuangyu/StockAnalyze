import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginWellcome = ({ userName, userPic, handleSignOut }) => {
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <img src={userPic} alt="user" className="w-20 aspect-square" />
      <h3>{userName}</h3>
      <button
        className="cursor-pointer h-8 w-[100px] px-3 bg-secondary-300 rounded-md"
        onClick={() => handleSignOut()}
      >
        Sign out
      </button>
      <button className="cursor-pointer bg-primary-100 h-8 w-[100px] rounded-md">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

const Login = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return (
    <div className="h-screen mt-16">
      {/* {console.log(user)} */}
      {isAuthenticated && (
        <LoginWellcome
          userName={user.name || user.nickname}
          userPic={user.picture}
          handleSignOut={() =>
            logout({
              logoutParams: { returnTo: window.location.origin },
            })
          }
        />
      )}
    </div>
  );
};

export default Login;
