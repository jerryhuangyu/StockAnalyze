import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn = ({ msg }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      onClick={loginWithRedirect}
      className="flex justify-between pr-3 gap-3"
    >
      <p>{msg}</p>
      <button className="text-red-500 rounded-lg bg-white hover:bg-red-100 px-2">
        Login
      </button>
    </div>
  );
};

export default LoginBtn;
