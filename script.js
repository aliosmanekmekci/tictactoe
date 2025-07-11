const createPlayer = function (name, marker) {
  return { name, marker };
};

const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];

  const placeMark = (index, marker) => {
    if (index < 0 || index >= board.length || board[index] !== "") {
      console.log(`Cannot place mark at index ${index}. Spot is already taken or invalid.`);
      return false;
    }
    board[index] = marker;
    return true;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    console.log("Game board has been reset.");
  };

  return { getBoard, placeMark, resetBoard };
})();

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const messageElement = document.querySelector(".game-message");
  const restartButton = document.querySelector(".restart-button");

  const _addCellClickListeners = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        const clickedIndex = parseInt(e.target.dataset.index);
        GameController.playRound(clickedIndex);
      });
    });

    restartButton.addEventListener("click", (e) => {
      GameController.startGame();
    });
  };

  const renderBoard = () => {
    const currentBoard = Gameboard.getBoard();

    cells.forEach((cell, index) => {
      cell.textContent = currentBoard[index];
    });
  };

  const setGameMessage = (message) => {
    messageElement.textContent = message;
    console.log("Game message:", message);
  };

  _addCellClickListeners();

  return {
    renderBoard,
    setGameMessage,
  };
})();

const GameController = (function () {
  let players = [];
  let currentPlayerIndex;
  let isGameOver = false;

  const _checkWin = () => {
    const currentBoard = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return true;
      }
    }
    return false;
  };

  const _checkTie = () => {
    const currentBoard = Gameboard.getBoard();
    return currentBoard.every((cell) => cell !== "") && !_checkWin();
  };

  const _switchTurn = () => {
    currentPlayerIndex = 1 - currentPlayerIndex;
    DisplayController.setGameMessage(
      `It's ${players[currentPlayerIndex].name}'s turn ${players[currentPlayerIndex].marker}.`
    );
  };

  const startGame = () => {
    players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];
    currentPlayerIndex = 0;
    isGameOver = false;
    console.log("Game started!");

    DisplayController.setGameMessage(
      `It's ${players[currentPlayerIndex].name}'s turn which is ${players[currentPlayerIndex].marker}.`
    );
  };

  const playRound = (index) => {
    if (isGameOver) {
      DisplayController.setGameMessage(`The Game is over! Start a new game to play again.`);
      return;
    }

    const currentPlayer = players[currentPlayerIndex];
    const markPlaced = Gameboard.placeMark(index, currentPlayer.marker);

    if (markPlaced) {
      DisplayController.renderBoard();
      if (_checkWin()) {
        DisplayController.setGameMessage(`${currentPlayer.name} (${currentPlayer.marker}) wins!`);
        isGameOver = true;
        return;
      }
      if (_checkTie()) {
        DisplayController.setGameMessage(`It's a tie!`);
        isGameOver = true;
        return;
      }
      _switchTurn();
    } else {
      DisplayController.setGameMessage(`Invalid move. Try again!`);
    }
  };

  return {
    startGame,
    playRound,
  };
})();
