import { useNavigate } from "react-router-dom";

const LoginToast = ({ msg }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/login");
  return (
    <div onClick={handleClick} className="flex justify-between pr-3 gap-3">
      <p>{msg}</p>
      <button className="text-red-500 rounded-lg bg-white hover:bg-red-100 px-2">
        Login
      </button>
    </div>
  );
};
export default LoginToast;
