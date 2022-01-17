import React, { useState, useEffect, useContext } from "react";
import { SetupDifficulty, SafeMoves } from "./logic/CreateBoard";
import Cell from "./components/Cell";
import Timer from "./components/Timer";
import { AppContext } from "../../Context/AppContext";
import { submitScoreMinesweeper } from "../../lib/ScoresDB";

export default function Board() {
  const [game, setGame] = useState([]);
  const [clock, setClock] = useState(false);
  const [time, setTime] = useState(0);
  const [activeGame, setActiveGame] = useState(true);
  const [safeCellCounter, setSafeCellCounter] = useState(1);
  const [level, setLevel] = useState("Beginner");
  const [possibleWin, setPossibleWin] = useState(true);
  const { currentUser, token } = useContext(AppContext);

  useEffect(() => {
    setActiveGame(true);
    setPossibleWin(true);
    const newGame = SetupDifficulty(level);
    setGame(newGame);
    const number = SafeMoves(level);
    setSafeCellCounter(number);
    setClock(false);
    setTime(0);
  }, [level]);

  useEffect(() => {
    if (safeCellCounter < 1) {
      setActiveGame(false);
      setClock(false);
      let move = [...game];
      for (let i = 0; i < move.length; i++) {
        for (let j = 0; j < move[i].length; j++) {
          if (move[i][j].value === "X") move[i][j].revealed = true;
        }
      }
      if (currentUser) {
        console.log("win");
        const newRecord = { game: "Minesweeper", lvl: level, score: time };
        const res = submitScoreMinesweeper(token, newRecord).then(() => {
          console.log(res);
        });
      }
      setGame(move);
    }
  }, [safeCellCounter, currentUser]);

  const handleNewGame = (e) => {
    setClock(false);
    let newNumber = SafeMoves(level);
    setSafeCellCounter(newNumber);
    const changeGame = SetupDifficulty(level);
    setGame(changeGame);
    setActiveGame(true);
    setPossibleWin(true);
    setTime(0);
  };

  const revealCell = (x, y) => {
    if (time === 0) setClock(true);
    const nearSafeCell = (x, y) => {
      move[x][y].revealed = true;
      setSafeCellCounter((prev) => prev - 1);
      setGame(move);
      if (move[x][y].value === 0) {
        if (x !== 0 && y !== 0 && !move[x - 1][y - 1].revealed) nearSafeCell(x - 1, y - 1);
        if (y !== 0 && !move[x][y - 1].revealed) nearSafeCell(x, y - 1);
        if (x !== move.length - 1 && y !== 0 && !move[x + 1][y - 1].revealed) nearSafeCell(x + 1, y - 1);
        if (x !== 0 && !move[x - 1][y].revealed) nearSafeCell(x - 1, y);
        if (x !== move.length - 1 && !move[x + 1][y].revealed) nearSafeCell(x + 1, y);
        if (x !== 0 && y !== move[x].length - 1 && !move[x - 1][y + 1].revealed) nearSafeCell(x - 1, y + 1);
        if (y !== move[x].length - 1 && !move[x][y + 1].revealed) nearSafeCell(x, y + 1);
        if (x !== move.length - 1 && y !== move[x].length - 1 && !move[x + 1][y + 1].revealed) nearSafeCell(x + 1, y + 1);
      }
    };
    let move = [...game];
    move[x][y].revealed = true;
    if (move[x][y].value === "X") {
      setActiveGame(false);
      setPossibleWin(false);
      setClock(false);
      for (let i = 0; i < move.length; i++) {
        for (let j = 0; j < move[i].length; j++) {
          if (move[i][j].value === "X") move[i][j].revealed = true;
        }
      }
    }
    move[x][y].value === 0 ? nearSafeCell(x, y) : setSafeCellCounter((prev) => prev - 1);
    setGame(move);
  };

  return (
    <>
      <div className="d-flex row mb-2 mx-5 justify-content-center">
        <div className="col-2 d-flex flex-wrap align-items-end">
          <label>Difficulty : </label>
          <select className="form-select" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div className="col-2 d-flex justify-content-center align-items-end">
          <Timer activeGame={activeGame} clock={clock} time={time} setTime={setTime} />
        </div>
      </div>
      <div className="d-flex flex-column align-items-center ">
        <div className="GameFrame">
          {game.map((row, i) => {
            return (
              <div className="d-flex " key={i}>
                {row.map((details, j) => {
                  return (
                    <Cell
                      key={j * 1000}
                      details={details}
                      revealCell={revealCell}
                      activeGame={activeGame}
                      safeCellCounter={safeCellCounter}
                      possibleWin={possibleWin}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={handleNewGame} className="btn btn-primary mt-3">
        New Game
      </button>
    </>
  );
}
