import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  showErrorToast,
  showErrorToastWithLoginBtn,
} from "../components/toast/utils";

export const useQueryFetch = (
  rtkLazyQuery,
  options = {
    lazy: false,
    arg: [],
    preferCacheValue: true,
  }
) => {
  const [result, setResult] = useState({});
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [trigger, data] = rtkLazyQuery();
  const { user, getAccessTokenSilently } = useAuth0();

  const handleQueryToDatabase = async (userId) => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const triggerArg = { token, userId, ...options.arg };
      const result = await trigger(triggerArg, options.preferCacheValue);
      setResult(result);
      setIsError(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      showErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const lazyTrigger = () => {
    if (!user) showErrorToastWithLoginBtn();
    else handleQueryToDatabase(user.sub);
  };

  useEffect(() => {
    if (!user) {
      const timeoutId = setTimeout(() => {
        showErrorToastWithLoginBtn();
      }, 2500);
      return () => clearTimeout(timeoutId);
    } else if (!options.lazy) {
      handleQueryToDatabase(user.sub);
    }
  }, [user]);

  return {
    data,
    result,
    error,
    isError,
    isLoading,
    lazyTrigger: lazyTrigger,
  };
};

//   try {
//     const token = await getAccessTokenSilently();
//     const result = await queryFunction({ token, userId }, preferCacheValue);
//     return result;
//   } catch (e) {
//     if (e.error === "login_required") {
//       toast.error(<LoginToast msg={e.message} />, { toastId: e.error });
//     } else {
//       console.log(JSON.stringify(e));
//     }
//   }
