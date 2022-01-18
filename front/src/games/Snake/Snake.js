import React, { useState, useRef, useEffect, useContext } from "react";
import { useInterval } from "../Snake/useInterval";
import "../Snake/Snake.css";
import { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS } from "../Snake/constants";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";
import { submitScore, getTopSnake } from "../../lib/ScoresDB";
import ScoreBoard from "../../components/ScoreBoard";

const Snake = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [counter, setCounter] = useState(0);
  const { currentUser, token } = useContext(AppContext);
  const [level, setLevel] = useState("Normal");
  const [scores, setScores] = useState([]);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode }) => keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  const createApple = () => apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (piece[0] * SCALE >= CANVAS_SIZE[0] || piece[0] < 0 || piece[1] * SCALE >= CANVAS_SIZE[1] || piece[1] < 0) return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }

    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      setCounter(counter + 10);

      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    }
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setCounter(0);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "pink";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "lightblue";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useEffect(() => {
    if (currentUser && counter > 0) {
      const newRecord = { game: "Snake", lvl: level, score: counter };
      submitScore(token, newRecord).then((res) => {});
    }
    getTopSnake(level).then((res) => {
      setScores(res);
    });
  }, [gameOver, currentUser, level]);

  return (
    <div className="d-flex flex-wrap">
      <div className="col-6 gameArea" role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
        <h1 className="snakeButton">Snake</h1>
        <div className="scoreAndDrop">
          {" "}
          <h1 className="counterH1">Points: {counter}</h1>
        </div>

        <canvas style={{ border: "1px solid black", borderRadius: "10px" }} ref={canvasRef} width={`${CANVAS_SIZE[0]}px`} height={`${CANVAS_SIZE[1]}px`} />
        {gameOver && <div className="floatTxt">GAME OVER!</div>}
        <Button className="snakeButton" onClick={startGame}>
          Start Game
        </Button>
      </div>
      <div className="d-flex col-4 align-items-start mx-5">
        <ScoreBoard scoresArray={scores} scoreType="points" />
      </div>
    </div>
  );
};

export default Snake;
