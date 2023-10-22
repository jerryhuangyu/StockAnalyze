import { toast } from "react-toastify";
import LoginToast from "../components/toast/LoginToast";

export const getTokenAndQuery = async (
  queryFunction,
  getAuthToken,
  useCache = true
) => {
  try {
    const token = await getAuthToken();
    const result = await queryFunction(token, useCache);
    return result;
  } catch (e) {
    if (e.error === "login_required") {
      toast.error(<LoginToast msg={e.message} />, { toastId: e.error });
    } else {
      console.log(JSON.stringify(e));
    }
  }
};
