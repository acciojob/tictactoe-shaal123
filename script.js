const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
const game = document.getElementById("game");
const message = document.querySelector(".message");

let player1 = "";
let player2 = "";

let currentPlayer = "";
let currentSymbol = "x";

let board = ["","","","","","","","",""];
let gameOver = false;

submitBtn.addEventListener("click", function(){

    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    if(player1==="" || player2===""){
        return;
    }

    form.style.display="none";
    game.style.display="block";

    currentPlayer = player1;
    currentSymbol = "x";

    message.textContent = `${currentPlayer}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell=>{

    cell.addEventListener("click",function(){

        if(gameOver) return;

        let index = Number(cell.id)-1;

        if(board[index]!="") return;

        board[index]=currentSymbol;
        cell.textContent=currentSymbol;

        if(checkWinner()){
            message.textContent=`${currentPlayer} congratulations you won!`;
            gameOver=true;
            return;
        }

        if(board.every(item=>item!="")){
            message.textContent="It's a Draw!";
            gameOver=true;
            return;
        }

        if(currentPlayer===player1){
            currentPlayer=player2;
            currentSymbol="o";
        }
        else{
            currentPlayer=player1;
            currentSymbol="x";
        }

        message.textContent=`${currentPlayer}, you're up`;

    });

});

function checkWinner(){

    const winPatterns=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let pattern of winPatterns){

        let [a,b,c]=pattern;

        if(
            board[a]!=="" &&
            board[a]===board[b] &&
            board[b]===board[c]
        ){
            return true;
        }

    }

    return false;

}