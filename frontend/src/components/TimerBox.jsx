import { useEffect } from "react";
import { useGetUserTimers } from "../hooks/useGetUserTimers";
import { useTimersContext } from "../hooks/useTimersContext";
import Timer from "./Timer";

function TimerBox() {
  const { getUserTimersLoading, getUserTimersError, getUserTimers } =
    useGetUserTimers();

  useEffect(function () {
    const getAllTimers = async function () {
      await getUserTimers();
    };
    getAllTimers();
  }, []);

  const { timers } = useTimersContext();

  return (
    <div className="flex flex-col gap-1">
      {(getUserTimersLoading || getUserTimersError) && (
        <div className="flex items-center justify-center">
          <p className="text-amber-600">
            {getUserTimersError === null ? "Loading..." : getUserTimersError}
          </p>
        </div>
      )}
      {!getUserTimersLoading &&
        !getUserTimersError &&
        timers.map((timer) => (
          <Timer
            key={timer._id}
            timerId={timer._id}
            timerTitle={timer.title}
            timerDuration={timer.duration}
          />
        ))}
    </div>
  );
}

export default TimerBox;
