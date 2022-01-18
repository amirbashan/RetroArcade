import React, { useState, useEffect } from "react";
import { CellFix } from "../logic/Appearance";

export default function Cell(props) {
  const { details, revealCell, activeGame, safeCellCounter, possibleWin, flagIt } = props;
  const [value, setValue] = useState();
  const [style, setStyle] = useState();
  const [revealedStyle, setRevealedStyle] = useState();

  useEffect(() => {
    const res = CellFix(details);
    setValue(res[0]);
    let revStyle = {
      ...res[1],
      borderTopColor: "#ffffff",
      borderLeftColor: "#ffffff",
      borderBottomColor: "#7B7B7B",
      borderRightColor: "#7B7B7B",
      borderStyle: "solid",
      border: "4px ",
    };
    setStyle(res[1]);
    setRevealedStyle(revStyle);
  }, [details]);

  const handleClick = (e) => {
    if (!details.flagged && !details.revealed && activeGame) {
      revealCell(details.x, details.y);
      if (details.value === "X") setStyle({ background: "red", fontSize: "16px" });
    }
  };

  const handleRightClick = (e) => {
    if (!details.revealed && activeGame) {
      flagIt(e, details.x, details.y);
    } else {
      e.preventDefault();
    }
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleRightClick}
      className="cell d-flex justify-content-center align-items-center"
      style={details.revealed ? style : revealedStyle}
    >
      {!details.revealed && details.flagged && possibleWin ? <span style={{ fontSize: "16px" }}>🚩</span> : ""}
      {details.value === "X" && safeCellCounter === 0 && possibleWin ? "🚩" : details.revealed && value}
      {details.value !== "X" && !possibleWin && details.flagged ? "❌" : ""}
    </div>
  );
}
