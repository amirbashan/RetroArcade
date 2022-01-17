import React, { useEffect } from "react";

export default function Timer(props) {
  const { clock, time, setTime } = props;

  useEffect(() => {
    let newTime;
    const addSec = () => {
      setTimeout(() => {
        newTime = time + 0.5;
        setTime(newTime);
      }, 500);
    };
    if (clock) addSec();
  }, [time, setTime, clock]);

  return (
    <div className="clock form-control d-flex justify-content-between">
      <span>⏰</span>
      <span> {Math.floor(time)} </span>
      <span>⏰</span>
    </div>
  );
}
