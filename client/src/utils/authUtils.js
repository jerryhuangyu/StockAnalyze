const showToast = () => {
  // TODO: show hint user to login
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
