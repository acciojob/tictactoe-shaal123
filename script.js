const submitBtn = document.getElementById("submit");
const form = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameOver = false;

const board = Array(9).fill("");

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    form.style.display = "none";
    game.style.display = "block";

    currentPlayer = player1;
    currentSymbol = "X";

    message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (gameOver) return;

        const index = Number(cell.id) - 1;

        if (board[index] !== "") return;

        board[index] = currentSymbol;
        cell.textContent = currentSymbol;

        if (checkWinner()) {
            message.textContent = `${currentPlayer} congratulations you won!`;
            gameOver = true;
            return;
        }

        if (board.every((value) => value !== "")) {
            message.textContent = "It's a Draw!";
            gameOver = true;
            return;
        }

        if (currentPlayer === player1) {
            currentPlayer = player2;
            currentSymbol = "O";
        } else {
            currentPlayer = player1;
            currentSymbol = "X";
        }

        message.textContent = `${currentPlayer}, you're up`;
    });
});

function checkWinner() {
    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    return winPatterns.some(pattern => {
        const [a,b,c] = pattern;
        return (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    });
}