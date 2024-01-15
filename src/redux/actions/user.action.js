export const userLogin = (user) => {
    return {
      type: "USER_LOGIN",
      payload: user,
    };
  };

  export const LOGOUT = () => {
    return {
      type: "LOG_OUT",
    };
  };