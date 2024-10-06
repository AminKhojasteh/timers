import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext = function () {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider.");
  }
  return context;
};
