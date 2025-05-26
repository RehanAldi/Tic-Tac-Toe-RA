const board = document.getElementById("board");
const statusText = document.getElementById("status");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const nameX = document.getElementById("nameX");
const nameO = document.getElementById("nameO");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let boardState = Array(9).fill("");
let scores = { X: 0, O: 0 };
let playerSymbols = { X: "Player X", O: "Player O" };
let lastWinner = null;
let gameOver = false;

function showPlayerForm() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("playerForm").style.display = "block";
}

function startGame() {
  playerSymbols.X = playerXInput.value.trim() || "Player X";
  playerSymbols.O = playerOInput.value.trim() || "Player O";
  nameX.textContent = playerSymbols.X;
  nameO.textContent = playerSymbols.O;

  document.getElementById("playerForm").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  currentPlayer = "X"; // Reset giliran tiap game baru
  startBoard();
}

function startBoard() {
  board.innerHTML = "";
  boardState = Array(9).fill("");
  gameOver = false;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    cell.addEventListener(
      "click",
      () => makeMove(i),
      { once: true }
    );
    board.appendChild(cell);
  }
  updateStatus();
}

function makeMove(index) {
  if (boardState[index] || gameOver) return;
  const cells = board.querySelectorAll(".cell");
  boardState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    scores[currentPlayer]++;
    updateScore();
    lastWinner = currentPlayer;
    statusText.textContent = `${playerSymbols[currentPlayer]} (${currentPlayer}) menang! 🎉`;
    gameOver = true;
  } else if (boardState.every((cell) => cell)) {
    statusText.textContent = `Permainan Seri 🤝`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];
  return winPatterns.some(
    ([a, b, c]) =>
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
  );
}

function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function updateStatus() {
  const name = currentPlayer === "X" ? playerSymbols.X : playerSymbols.O;
  statusText.textContent = `Giliran: ${name} (${currentPlayer})`;
}

function switchFirstPlayer() {
  currentPlayer = lastWinner || "X";
}

function resetBoardOnly() {
  switchFirstPlayer();
  startBoard();
}

function goToNameForm() {
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("playerForm").style.display = "block";

  playerXInput.value = playerSymbols.X;
  playerOInput.value = playerSymbols.O;
}

function swapSymbols() {
  // Tukar nama pemain
  [playerSymbols.X, playerSymbols.O] = [playerSymbols.O, playerSymbols.X];

  // Tukar input form
  [playerXInput.value, playerOInput.value] = [playerOInput.value, playerXInput.value];

  // Tukar skor
  [scores.X, scores.O] = [scores.O, scores.X];
  updateScore();

  // Update nama di tampilan
  nameX.textContent = playerSymbols.X;
  nameO.textContent = playerSymbols.O;

  // Ganti pemain aktif agar sesuai
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}
