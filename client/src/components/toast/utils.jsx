import { toast } from "react-toastify";
import LoginBtn from "./LoginBtn";

const showErrorToastWithLoginBtn = () => {
  const option = { toastId: "login required" };
  toast.error(<LoginBtn msg={"login required"} />, option);
};

const showErrorToast = (msg) => {
  toast.error(<LoginBtn msg={msg} />, { toastId: msg });
};

export { showErrorToast, showErrorToastWithLoginBtn };
