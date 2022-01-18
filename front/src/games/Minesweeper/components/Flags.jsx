import React, { useEffect } from "react";

export default function Flags(props) {
  const { flagsCounter } = props;

  useEffect(() => {}, [flagsCounter]);

  return (
    <div className="clock form-control d-flex justify-content-between">
      <span>🚩</span>
      <span> {flagsCounter} </span>
      <span>🚩</span>
    </div>
  );
}
