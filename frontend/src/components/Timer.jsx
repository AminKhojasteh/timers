import { useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useDeleteTimer } from "../hooks/useDeleteTimer";
import { useEditTimer } from "../hooks/useEditTimer";

function Timer({ timerTitle, timerDuration, timerId }) {
  const [time, setTime] = useState(timerDuration);
  const [isTimerWorking, setIsTimerWorking] = useState(false);
  const startTime = useRef(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [title, setTitle] = useState(timerTitle);
  const [isEditing, setIsEditing] = useState(false);
  const titleInput = useRef(null);
  const { deleteTimerLoading, deleteTimer } = useDeleteTimer();
  const { editTimerLoading, editTimer } = useEditTimer();
  const isAppBusy = deleteTimerLoading || editTimerLoading;

  const formatTime = function (milliSeconds) {
    const totalSeconds = Math.round(milliSeconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = (totalSeconds - seconds) / 60;
    const minutes = totalMinutes % 60;
    const hours = (totalMinutes - minutes) / 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleTitleInputChange = function (e) {
    setTitle(e.target.value);
  };

  const handleEditClick = function () {
    setIsEditing(true);
    setTimeout(function () {
      titleInput.current.focus();
    }, 100);
  };

  const handleTickClick = async function () {
    setIsEditing(false);
    await editTimer(timerId, title, time);
  };

  const handleTitleFormSubmit = async function (e) {
    e.preventDefault();
    setIsEditing(false);
    await editTimer(timerId, title, time);
  };

  const handleStartStopClick = async function () {
    const thisMoment = Date.now();
    if (!isTimerWorking) {
      startTime.current = thisMoment;
    }
    if (isTimerWorking) {
      const workingInterval = thisMoment - startTime.current;
      const newTime = time + workingInterval;
      setTime(newTime);
      await editTimer(timerId, title, newTime);
    }
    setIsTimerWorking((s) => !s);
  };

  const handleResetClick = async function () {
    if (confirm("Are you sure you want to reset the Timer?")) {
      setTime(0);
      setIsTimerWorking(false);
      startTime.current = 0;
      await editTimer(timerId, title, 0);
    }
  };

  const handleSetTimeClick = async function () {
    const newTime = (60 * Number(hours) + Number(minutes)) * 60000;
    if (confirm("Are you sure you want to set the Timer?")) {
      setTime(newTime);
      setIsTimerWorking(false);
      startTime.current = 0;
      setHours(0);
      setMinutes(0);
      await editTimer(timerId, title, newTime);
    }
  };

  const handleMinutesChange = function (e) {
    const newMinutes = e.target.value;
    if (newMinutes > 59) return setMinutes(59);
    if (newMinutes < 0) return setMinutes(0);
    setMinutes(newMinutes);
  };

  const handleHoursChange = function (e) {
    const newHours = e.target.value;
    if (newHours < 0) return setHours(0);
    setHours(newHours);
  };

  const handleDeleteClick = async function () {
    if (confirm("Are you sure you want to delete this timer?")) {
      await deleteTimer(timerId);
    }
  };

  return (
    <div className="grid w-full grid-cols-8 items-center gap-x-1 rounded-lg bg-amber-800 p-2 font-courier">
      {
        <form onSubmit={handleTitleFormSubmit} className="col-span-6">
          <input
            type="text"
            value={title}
            disabled={!isEditing}
            ref={titleInput}
            onChange={handleTitleInputChange}
            className="focus: bg-amber-800 pl-2 text-lg font-bold text-amber-950 outline-none"
          ></input>
        </form>
      }
      <button
        disabled={isAppBusy}
        className="cursor-pointer justify-self-end text-xl text-amber-950"
      >
        {isEditing ? (
          <TiTick onClick={handleTickClick} />
        ) : (
          <MdOutlineEdit onClick={handleEditClick} />
        )}
      </button>
      <button
        disabled={isAppBusy}
        onClick={handleDeleteClick}
        className="cursor-pointer justify-self-end text-xl text-amber-950"
      >
        <TiDeleteOutline />
      </button>
      <p className="col-span-6 text-center text-[3rem] font-bold text-amber-950">
        {formatTime(time)}
      </p>
      <button
        disabled={isAppBusy}
        onClick={handleStartStopClick}
        className={`col-span-2 rounded-lg pb-2 pt-3 text-xl font-bold tracking-wide text-amber-700 ${isTimerWorking ? "bg-red-950" : "bg-green-950"}`}
      >
        {isTimerWorking ? "STOP" : "START"}
      </button>
      <button
        disabled={isAppBusy}
        onClick={handleSetTimeClick}
        className="col-span-2 h-full w-full rounded-lg bg-amber-950 px-1 pb-0.5 pt-1 text-xs text-amber-700"
      >
        Set Time
      </button>
      <div className="col-span-3 grid h-full grid-cols-2 gap-x-1">
        <input
          type="number"
          value={hours}
          placeholder="hour"
          onChange={handleHoursChange}
          className="rounded-md bg-amber-950 pt-0.5 text-center text-sm text-amber-700"
        />
        <input
          type="number"
          value={minutes}
          placeholder="min"
          onChange={handleMinutesChange}
          className="rounded-md bg-amber-950 pt-0.5 text-center text-sm text-amber-700"
        />
      </div>
      <button
        disabled={isAppBusy}
        onClick={handleResetClick}
        className="col-span-2 col-start-7 h-full w-full rounded-lg bg-amber-950 px-1 pb-0.5 pt-1 text-xs text-amber-700"
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
