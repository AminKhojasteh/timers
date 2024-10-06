import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = function () {
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async function (email, password) {
    setLoginLoading(true);
    setLoginError(null);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    const responseJson = await response.json();
    if (!response.ok) {
      setLoginLoading(false);
      setLoginError(responseJson.error);
    }
    if (response.ok) {
      localStorage.setItem("timerUser", JSON.stringify(responseJson));
      dispatch({ type: "LOGIN", payload: responseJson });
      setLoginLoading(false);
    }
  };

  return {loginLoading, loginError, login};
};
