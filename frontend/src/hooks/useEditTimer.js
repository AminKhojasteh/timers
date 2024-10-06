import { useState } from "react";
import { useTimersContext } from "./useTimersContext";

export const useEditTimer = function () {
  const [editTimerLoading, setEditTimerLoading] = useState(null);
  const [editTimerError, setEditTimerError] = useState(null);
  const { dispatch } = useTimersContext();

  const editTimer = async function (timerId, title, duration) {
    setEditTimerLoading(true);
    setEditTimerError(null);
    const userToken = JSON.parse(localStorage.getItem("timerUser")).token;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/timers/${timerId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ title, duration }),
      },
    );
    const responseJson = await response.json();
    if (!response.ok) {
      setEditTimerLoading(false);
      setEditTimerError(responseJson.error);
      console.log("Error in editing timer: ", responseJson.error);
      
    }
    if (response.ok) {
      // console.log(responseJson);
      dispatch({ type: "EDIT_TIMER", payload: responseJson });

      setEditTimerLoading(false);
    }
  };

  return { editTimerLoading, editTimerError, editTimer };
};
