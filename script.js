const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMark = (index, marker) => {
    if (index < 0 || index >= board.length || board[index] !== "") {
      console.log(`Cannot place mark at index ${index}. Spot is already taken or invalid.`);
      return false;
    }
    board[index] = marker;
    return true;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", ""];
    console.log("Game board has been reset.");
  };

  return { getBoard, placeMark, resetBoard };
})();

const GameController = (function () {
  let players = [];
  let currentPlayerIndex;
  let isGameOver = false;
})();

const createPlayer = (function (name, marker) {
  return { name, marker };
})();
