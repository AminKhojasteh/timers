import { useState } from "react";
import { useTimersContext } from "./useTimersContext";

export const useDeleteTimer = function () {
  const [deleteTimerLoading, setDeleteTimerLoading] = useState(null);
  const [deleteTimerError, setDeleteTimerError] = useState(null);
  const { dispatch } = useTimersContext();

  const deleteTimer = async function (timerId) {
    setDeleteTimerLoading(true);
    setDeleteTimerError(null);
    const userToken = JSON.parse(localStorage.getItem("timerUser")).token;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/timers/${timerId}`,
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
      setDeleteTimerLoading(false);
      setDeleteTimerError(responseJson.error);
      console.log("Error in deleting timer: ", responseJson.error);

    }
    if (response.ok) {
      // console.log(responseJson);
      dispatch({ type: "DELETE_TIMER", payload: responseJson });

      setDeleteTimerLoading(false);
    }
  };

  return { deleteTimerLoading, deleteTimerError, deleteTimer };
};
