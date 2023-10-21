import { toast } from "react-toastify";

const showToast = () => {
  toast.error("Why not login first?", { toastId: "login_required" });
};

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
      showToast();
    } else {
      console.log(JSON.stringify(e));
    }
  }
};
