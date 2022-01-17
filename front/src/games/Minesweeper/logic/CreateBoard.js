function BoardSetup(row, col, bombs) {
  let bombsCount = bombs;
  if (bombs >= row * col) {
    console.alert("bombs count is too high! we will fix it for you.");
    bombsCount = (row * col) / 4;
  }

  //Make the game board (all is 0)
  let board = [];
  for (let i = 0; i < row; i++) {
    let columns = [];
    for (let j = 0; j < col; j++) {
      columns.push({ value: 0, revealed: false, x: i, y: j });
    }
    board.push(columns);
  }

  //places the bombs
  while (bombsCount > 0) {
    let x = Math.floor(Math.random() * row);
    let y = Math.floor(Math.random() * col);
    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      bombsCount--;
    }
  }

  const fixCellValue = (x, y, maxX, MaxY) => {
    let bombs = 0;
    //top left
    if (x !== 0 && y !== 0) if (board[x - 1][y - 1].value === "X") bombs++;
    //top
    if (y !== 0) if (board[x][y - 1].value === "X") bombs++;
    //top right
    if (x !== maxX && y !== 0) if (board[x + 1][y - 1].value === "X") bombs++;
    //left
    if (x !== 0) if (board[x - 1][y].value === "X") bombs++;
    //right
    if (x !== maxX) if (board[x + 1][y].value === "X") bombs++;
    //bottom left
    if (x !== 0 && y !== MaxY) if (board[x - 1][y + 1].value === "X") bombs++;
    //bottom
    if (y !== MaxY) if (board[x][y + 1].value === "X") bombs++;
    //bottom right
    if (x !== maxX && y !== MaxY) if (board[x + 1][y + 1].value === "X") bombs++;
    return bombs;
  };

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j].value !== "X") board[i][j].value = fixCellValue(i, j, row - 1, col - 1);
    }
  }
  return board;
}

export function SetupDifficulty(lvl) {
  let newGame;
  switch (lvl) {
    case "Intermediate":
      newGame = BoardSetup(16, 16, 40);
      break;
    case "Expert":
      newGame = BoardSetup(16, 30, 99);
      break;
    default:
      newGame = BoardSetup(9, 9, 10);
  }
  return newGame;
}

export function SafeMoves(lvl) {
  let amount;
  switch (lvl) {
    case "Beginner":
      amount = 71;
      break;
    case "Intermediate":
      amount = 216;
      break;
    case "Expert":
      amount = 381;
      break;
    default:
      amount = 71;
      break;
  }
  return amount;
}
