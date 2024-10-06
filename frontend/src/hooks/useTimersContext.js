import { useContext } from "react";
import { TimersContext } from "../context/timersContext";

export const useTimersContext = function () {
  const context = useContext(TimersContext);
  if (!context) {
    throw Error(
      "useTimersContext must be used inside an TimersContextProvider.",
    );
  }
  return context;
};
