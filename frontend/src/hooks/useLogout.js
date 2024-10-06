import { useAuthContext } from "./useAuthContext";
import { useTimersContext } from "./useTimersContext";

export const useLogout = function () {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: timerDispatch } = useTimersContext();

  const logout = function () {
    localStorage.removeItem("timerUser");
    authDispatch({ type: "LOGOUT" });
    timerDispatch({ type: "CLEAR_TIMERS" });
  };

  return { logout };
};
