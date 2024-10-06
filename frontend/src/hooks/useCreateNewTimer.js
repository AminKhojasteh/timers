import { useState } from "react";
import { useTimersContext } from "./useTimersContext";

export const useCreateNewTimer = function () {
  const [createNewTimerLoading, setCreateNewTimerLoading] = useState(null);
  const [createNewTimerError, setCreateNewTimerError] = useState(null);
  const { dispatch } = useTimersContext();

  const createNewTimer = async function () {
    setCreateNewTimerLoading(true);
    setCreateNewTimerError(null);
    const userToken = JSON.parse(localStorage.getItem("timerUser")).token;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/timers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: "",
    });
    const responseJson = await response.json();
    if (!response.ok) {
      setCreateNewTimerLoading(false);
      setCreateNewTimerError(responseJson.error);
      console.log("Error in creating new timer: ", responseJson.error);
    }
    if (response.ok) {
      // console.log(responseJson);
      dispatch({ type: "ADD_TIMER", payload: responseJson });

      setCreateNewTimerLoading(false);
    }
  };

  return { createNewTimerLoading, createNewTimerError, createNewTimer };
};
