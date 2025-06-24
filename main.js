function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i][j] = "";
        }
    }

    const getBoard = () => board;

    const placeMark = (row, col, mark) => {
        if (board[row][col] === ""){
            board[row][col] = mark;
            return true;
        }
        return false;
    }

    const reset = () => {
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                board[i][j] = "";
            }
        }
    }

    return {getBoard, placeMark, reset};
}

function Player(name, mark, score){
    return {name, mark, score};
}

function gameController(){
    const player1 = Player("Player 1", "X", 0);
    const player2 = Player("Player 2", "O", 0);
    let tieScore = 0;
    let currentPlayer = player1;
    const gameboard = Gameboard();
    let isGameOver = false;

    function checkWinner(){
        const board = gameboard.getBoard();
        const mark = currentPlayer.mark;

        //check rows
        for (let i = 0; i < 3; i++){
            if(board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) return true;
        }

        //check columns
        for (let i = 0; i < 3; i++){
            if(board[0][i] === mark && board[1][i] === mark && board[2][i] === mark) return true;
        }
        
        //check diagonals
        if (board[0][0] === mark && board[1][1] === mark && board[2][1] === mark || 
            board[0][2] === mark && board[1][1] === mark && board[2][0] === mark){
                return true;
            }
            return false;
    }

    function checkDraw(){
        const board = gameboard.getBoard();
        return board.flat().every(cell => cell != "");
    }

    function playRound(row, col){
        if (isGameOver) return;

        const success = gameboard.placeMark(row, col, currentPlayer.mark);
        if (!success) return;

        if (checkWinner()){
            currentPlayer.score++;
            console.log(`${currentPlayer.name} wins!`);
            isGameOver = true;
            return true;
        }

        if (checkDraw()){
            tieScore++;
            console.log("It's a draw!");
            isGameOver = true;
            return;
        }

        //switch player 
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function resetGame(){
        gameboard.reset();
        isGameOver = false;
    }

    return {playRound,
            resetGame,
            getBoard: gameboard.getBoard,
            getPlayers: () => [player1, player2],
            getTieScore: () => tieScore}
}

const controller = gameController();

function displayController(){
    const [player1, player2] = controller.getPlayers();
    const boardContainer = document.querySelector(".board");
    const scoreBoard = document.querySelector(".container");
    const resetBtn = document.querySelector(".reset");
    resetBtn.classList.add("resetBtn");
    const board = controller.getBoard();


    (function renderBoard(){
        boardContainer.textContent = "";

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                let cell = document.createElement('div');
                cell.classList.add("cell");

                cell.textContent = board[i][j];

                cell.addEventListener("click", () => {
                    controller.playRound(i,j);
                    renderBoard();
                    renderScores();
                });

                boardContainer.appendChild(cell);

            }
        }
        resetBtn.addEventListener("click", () => {
            controller.resetGame();
            renderBoard();
            renderScores();
        });

    })();

    function renderScores(){
        scoreBoard.textContent = "";

        const player1Score = document.createElement('p');
        player1Score.classList.add("score")
        const player2Score = document.createElement('p');
        player2Score.classList.add("score");
        const tieScore = document.createElement('p');
        tieScore.classList.add("score");


        player1Score.textContent = `${player1.name}: ${player1.score}`;
        player2Score.textContent = `${player2.name}: ${player2.score}`;
        tieScore.textContent = `Draw: ${controller.getTieScore()}`


        scoreBoard.appendChild(player1Score);
        scoreBoard.appendChild(tieScore);
        scoreBoard.appendChild(player2Score);
    }
    renderScores();

}

displayController();