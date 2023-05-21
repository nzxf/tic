// PLAYER FACTORY
const Player = (id, mark) => {
    const turn = () => console.log(`This is ${id}'s turn`)
    const win = () => console.log(`${id} is the winner!!!`)
    return { id, mark, turn, win }
}
const blue = Player("Player Blue", "x");
const red = Player("Player Red", "o");
let allPlayers = []
allPlayers.push(blue, red)

// PLAYER TURN
let currentPlayer = allPlayers[1]
const nextPlayer = () => currentPlayer == allPlayers[0] ?
    currentPlayer = allPlayers[1] : currentPlayer = allPlayers[0];

// BOARD 
const makeBoard = () => {
    let newBoard = []
    for (i = 0; i < 9; i++) {
        newBoard.push("")
    }
    return newBoard
}
let board = makeBoard();

// THE GAME 
// let isGameover = false
const isWinning = () => {
    // WINNING PATTERN
    //horizontal
    let h1 = [board[0], board[1], board[2]]
    let h2 = [board[3], board[4], board[5]]
    let h3 = [board[6], board[7], board[8]]
    //vertical
    let v1 = [board[0], board[3], board[6]]
    let v2 = [board[1], board[4], board[7]]
    let v3 = [board[2], board[5], board[8]]
    //diagonal
    let d1 = [board[0], board[4], board[8]]
    let d2 = [board[6], board[4], board[2]]
    
    // console.log(`now is ${currentPlayer.id}'s turn`);
    let marks = currentPlayer.mark.repeat(3)
    switch (marks) {
        case h1.join(''):
        case h2.join(''):
        case h3.join(''):
        case v1.join(''):
        case v2.join(''):
        case v3.join(''):
        case d1.join(''):
        case d2.join(''):
            // isGameover = true
            currentPlayer.win()
            break;
        default:
            nextPlayer();
    }
}

// TODO: PLAY SIMULATION

board[1] = currentPlayer.mark
isWinning()
board[0] = currentPlayer.mark
isWinning()
board[4] = currentPlayer.mark
isWinning()
board[3] = currentPlayer.mark
isWinning()
board[5] = currentPlayer.mark
isWinning()


console.table(board);
