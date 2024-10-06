import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = function (state, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = function ({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const { user } = state;

  useEffect(function () {
    const savedUser = JSON.parse(localStorage.getItem("timerUser"));
    if (savedUser) {
      dispatch({ type: "LOGIN", payload: savedUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
