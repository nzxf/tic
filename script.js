// PLAYER FACTORY
const Player = (id, mark) => {
    const turn = () => `Now is the ${id}'s turn`
    const win = () => `${id} is the winner!!!`
    const first = () => `${id} goes first`
    return { id, mark, turn, win, first }
}
const x = Player("Player X", "x");
const o = Player("Player O", "o");
let allPlayers = []
allPlayers.push(x, o)

// RANDOMIZER 
const randomPlayer = arr => Math.floor(Math.random() * arr.length)

// NEXT TURN
let currentPlayer = allPlayers[randomPlayer(allPlayers)]
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
let board = makeBoard()

const cells = document.querySelectorAll(".cells")
cells.forEach(cell => cell.disabled = true)
// UPDATE DISPLAY BOARD
const updateDisplay = () => cells.forEach(cell => {
    cell.innerText = board[cell.value]
})

// PROMPT
const prompt = document.querySelector(".prompt")
const updatePrompt = string => prompt.innerText = string

// GAMEOVER? 
const isWinning = () => {
    let marks = currentPlayer.mark.repeat(3)
    switch (marks) {
        case [board[0], board[1], board[2]].join(''): // Horizontal
        case [board[3], board[4], board[5]].join(''): // Horizontal
        case [board[6], board[7], board[8]].join(''): // Horizontal
        case [board[0], board[3], board[6]].join(''): // Vertical
        case [board[1], board[4], board[7]].join(''): // Vertical
        case [board[2], board[5], board[8]].join(''): // Vertical
        case [board[0], board[4], board[8]].join(''): // Diagonal
        case [board[2], board[4], board[6]].join(''): // Diagonal
            // WIN
            cells.forEach(cell => cell.disabled = true)
            updatePrompt(currentPlayer.win().toUpperCase())
            break;
        default: // MOVE ON TO NEXT PLAYER
            // TIE
            if (!board.includes('')) {
                return updatePrompt("IT'S A TIE")
            }
            nextPlayer()
            updatePrompt(currentPlayer.turn().toUpperCase())
    }
}


// INPUT
const playerInput = () => {
    cells.forEach(cell => cell.addEventListener('click', function() {
        cell.disabled = true

        // FIXME: doubling up the board + currentPlayer after each game
        board[cell.value] = currentPlayer.mark
        console.log(`${currentPlayer.id} put ${currentPlayer.mark} on cell no ${cell.value}`);

        updateDisplay(board)
        isWinning(board)
    }))
}

const startButton = document.querySelector(".start")
startButton.addEventListener('click', function() {
    // RESET
    board = makeBoard()
    // currentPlayer = allPlayers[randomPlayer(allPlayers)]

    cells.forEach(cell => cell.disabled = false)
    //PLAYER INPUT
    updatePrompt(currentPlayer.first());
    updateDisplay()
    playerInput();
})