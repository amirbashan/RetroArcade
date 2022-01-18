import React, { useState, useEffect, useContext } from "react";
import { SetupDifficulty, SafeMoves, FlagAmount } from "./logic/CreateBoard";
import Cell from "./components/Cell";
import Timer from "./components/Timer";
import Flags from "./components/Flags";
import { AppContext } from "../../Context/AppContext";
import { submitScoreMinesweeper, getTopMinesweepers } from "../../lib/ScoresDB";
import ScoreBoard from "../../components/ScoreBoard";

export default function Board() {
  const [game, setGame] = useState([]);
  const [clock, setClock] = useState(false);
  const [time, setTime] = useState(0);
  const [flagsCounter, setFlagsCounter] = useState(0);
  const [activeGame, setActiveGame] = useState(true);
  const [safeCellCounter, setSafeCellCounter] = useState(1);
  const [level, setLevel] = useState("Beginner");
  const [possibleWin, setPossibleWin] = useState(true);
  const { currentUser, token } = useContext(AppContext);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setActiveGame(true);
    setPossibleWin(true);
    const newGame = SetupDifficulty(level);
    setGame(newGame);
    const number = SafeMoves(level);
    setSafeCellCounter(number);
    setClock(false);
    const counter = FlagAmount(level);
    setFlagsCounter(counter);
    setTime(0);
    getTopMinesweepers(level).then((res) => {
      setScores(res);
    });
  }, [level]);

  useEffect(() => {
    if (safeCellCounter < 1) {
      setActiveGame(false);
      setClock(false);
      setFlagsCounter(0);
      let move = [...game];
      for (let i = 0; i < move.length; i++) {
        for (let j = 0; j < move[i].length; j++) {
          if (move[i][j].value === "X") move[i][j].revealed = true;
        }
      }
      if (currentUser) {
        console.log("win");
        const newRecord = { game: "Minesweeper", lvl: level, score: Math.floor(time) };
        submitScoreMinesweeper(token, newRecord).then((res) => {
          console.log(res);
        });
      }
      setGame(move);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const counter = FlagAmount(level);
    setFlagsCounter(counter);
  };

  const flagIt = (e, x, y) => {
    e.preventDefault();
    if (time === 0) setClock(true);
    let move = [...game];
    move[x][y].flagged = !move[x][y].flagged;
    move[x][y].flagged ? setFlagsCounter((prev) => prev - 1) : setFlagsCounter((prev) => prev + 1);
    setGame(move);
  };

  const revealCell = (x, y) => {
    if (time === 0) setClock(true);
    const nearSafeCell = (x, y) => {
      move[x][y].revealed = true;
      if (move[x][y].flagged) {
        move[x][y].flagged = false;
        setFlagsCounter((prev) => prev + 1);
      }
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
    <div className="d-flex flex-row flex-wrap">
      <div className="d-flex flex-column col-6 flex-wrap align-items-end">
        <div className="">
          <div className="d-flex form-row  flex-column mb-2 mx-1 justify-content-center align-items-center">
            <div className="d-flex form-row flex-wrap justify-content-center">
              <div className="col-2 d-flex clock d-flex justify-content-between align-items-end w-50">
                <Flags flagsCounter={flagsCounter} />
              </div>
              <div className="col-2 d-flex clock d-flex justify-content-between align-items-end w-50">
                <Timer activeGame={activeGame} clock={clock} time={time} setTime={setTime} />
              </div>
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
                          flagIt={flagIt}
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
          <div className="d-flex flex-column justify-content-center align-items-center">
            <select className="form-select mt-1 w-50" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>

            <button onClick={handleNewGame} className="btn btn-primary mt-1">
              New Game
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex col-4 align-items-start mx-5">
        <ScoreBoard scoresArray={scores} difficulty={level} scoreType="sec" />
      </div>
    </div>
  );
}
