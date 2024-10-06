import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useTimersContext } from "./useTimersContext";

export const useDeleteUser = function () {
  const [deleteUserLoading, setDeleteUserLoading] = useState(null);
  const [deleteUserError, setDeleteUserError] = useState(null);
  const { dispatch: userDispatch } = useAuthContext();
  const { dispatch: timerDispatch } = useTimersContext();

  const deleteUser = async function () {
    setDeleteUserLoading(true);
    setDeleteUserError(null);
    const userToken = JSON.parse(localStorage.getItem("timerUser")).token;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    const responseJson = await response.json();
    if (!response.ok) {
      setDeleteUserLoading(false);
      setDeleteUserError(responseJson.error);
      console.log("Error in deleting user: ", responseJson.error);
    }
    if (response.ok) {
      console.log(responseJson);
      userDispatch({ type: "LOGOUT" });
      timerDispatch({ type: "CLEAR_TIMERS" });
      localStorage.removeItem("timerUser");
      setDeleteUserLoading(false);
    }
  };

  return { deleteUserLoading, deleteUserError, deleteUser };
};
