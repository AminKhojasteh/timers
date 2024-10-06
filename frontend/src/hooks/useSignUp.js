import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = function () {
  const [signUpError, setSignUpError] = useState(null);
  const [signUpLoading, setSingUpLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async function (email, password) {
    setSingUpLoading(true);
    setSignUpError(null);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    const responseJson = await response.json();
    if (!response.ok) {
      setSingUpLoading(false);
      setSignUpError(responseJson.error);
    }
    if (response.ok) {
      localStorage.setItem("timerUser", JSON.stringify(responseJson));
      dispatch({ type: "LOGIN", payload: responseJson });
      setSingUpLoading(false);
    }
  };

  return { signUpLoading, signUpError, signup };
};
