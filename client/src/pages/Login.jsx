import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { render } from "react-dom";
import { Link } from "react-router-dom";

const LoginOptions = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 border w-[280px] py-6">
      <h3>Login Options</h3>
      <div id="signInDiv"></div>
    </div>
  );
};

const LoginWellcome = ({ user, handleSignOut }) => {
  // console.log(user);
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <img src={user.picture} alt="user" className="w-20 aspect-square" />
      <h3>{user.name}</h3>
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

const Login = ({ user, setUser }) => {
  const [isLogin, setIsLogin] = useState(Object.keys(user).length);
  const initGoogleLogin = () => {
    google.accounts.id.initialize({
      client_id:
        "759855032131-pn9b9ko6glu6925r5nna6dp9salgdneb.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
  };
  const renderGoogleLoginButton = () => {
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  };
  const handleCallbackResponse = (res) => {
    var userObject = jwt_decode(res.credential);
    setUser(userObject);
    setIsLogin(true);
  };
  const handleSignOut = () => {
    setUser({});
    setIsLogin(false);
  };

  useEffect(() => {
    initGoogleLogin();
    renderGoogleLoginButton();
  }, []);
  useEffect(() => {
    renderGoogleLoginButton();
  }, [isLogin]);

  return (
    <div className="h-screen mt-16">
      {!isLogin && <LoginOptions />}
      {Object.keys(user).length !== 0 && (
        <LoginWellcome user={user} handleSignOut={handleSignOut} />
      )}
    </div>
  );
};

export default Login;
