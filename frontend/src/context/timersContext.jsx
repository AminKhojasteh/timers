import { createContext, useReducer } from "react";

export const TimersContext = createContext();

const timersReducer = function (state, action) {
  switch (action.type) {
    case "SET_TIMERS":
      return { timers: action.payload };
    case "CLEAR_TIMERS":
      return { timers: [] };
    case "ADD_TIMER":
      return { timers: [action.payload, ...state.timers] };
    case "DELETE_TIMER":
      return {
        timers: state.timers.filter(
          (timer) => timer._id !== action.payload._id,
        ),
      };
    case "EDIT_TIMER":
      return {
        timers: state.timers.map((timer) =>
          timer._id !== action.payload._id ? timer : action.payload,
        ),
      };
    default:
      return state;
  }
};

export const TimersContextProvider = function ({ children }) {
  const [state, dispatch] = useReducer(timersReducer, { timers: [] });
  const { timers } = state;

  return (
    <TimersContext.Provider value={{ timers, dispatch }}>
      {children}
    </TimersContext.Provider>
  );
};
