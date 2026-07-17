const submit = document.getElementById("submit");

const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");

const playerForm = document.getElementById("playerForm");
const game = document.getElementById("game");

const message = document.querySelector(".message");

const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";

let currentPlayer = "";
let currentSymbol = "x";

let board = ["","","","","","","","",""];

let gameOver = false;

submit.addEventListener("click",function(){

    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if(player1==="" || player2===""){
        return;
    }

    playerForm.style.display="none";
    game.style.display="block";

    currentPlayer=player1;
    currentSymbol="x";

    message.textContent=currentPlayer + ", you're up";
});

cells.forEach(function(cell){

    cell.addEventListener("click",function(){

        if(gameOver) return;

        let index=parseInt(cell.id)-1;

        if(board[index]!="") return;

        board[index]=currentSymbol;

        cell.textContent=currentSymbol;

        if(checkWinner()){

            message.textContent=currentPlayer+" congratulations you won!";

            gameOver=true;

            return;
        }

        if(board.every(item=>item!="")){

            message.textContent="Draw!";

            gameOver=true;

            return;
        }

        if(currentPlayer===player1){

            currentPlayer=player2;
            currentSymbol="o";

        }else{

            currentPlayer=player1;
            currentSymbol="x";
        }

        message.textContent=currentPlayer+", you're up";

    });

});

function checkWinner(){

    const win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i=0;i<win.length;i++){

        let [a,b,c]=win[i];

        if(
            board[a]!="" &&
            board[a]===board[b] &&
            board[b]===board[c]
        ){
            return true;
        }
    }

    return false;
}