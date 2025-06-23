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

    return {getBoard, placeMark};
}

function Player(name, mark, score){
    return {name, mark, score};
}

