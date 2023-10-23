import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-primary-out relative py-2 px-4 rounded-full text-white cursor-pointer"
      onClick={() => navigate("/")}
    >
      <div className="absolute top-1 right-0 w-full h-10 animate-[ping_0.8s_ease-in_infinite] bg-primary-hover blur-md opacity-40 -z-10 rounded-full"></div>
      Launch back Home
    </button>
  );
};
export default HomeButton;
