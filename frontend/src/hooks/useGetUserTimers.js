import { useState } from "react";
import { useTimersContext } from "./useTimersContext";

export const useGetUserTimers = function () {
  const [getUserTimersLoading, setGetUserTimersLoading] = useState(null);
  const [getUserTimersError, setGetUserTimersError] = useState(null);
  const { dispatch } = useTimersContext();

  const getUserTimers = async function () {
    setGetUserTimersLoading(true);
    setGetUserTimersError(null);
    const userToken = JSON.parse(localStorage.getItem("timerUser")).token;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/timers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const responseJson = await response.json();
    if (!response.ok) {
      setGetUserTimersLoading(false);
      setGetUserTimersError(responseJson.error);
      console.log("Error in getting user timers: ", responseJson.error);
    }
    if (response.ok) {
      // console.log(responseJson);
      dispatch({ type: "SET_TIMERS", payload: responseJson });

      setGetUserTimersLoading(false);
    }
  };

  return { getUserTimersLoading, getUserTimersError, getUserTimers };
};
