// PLAYER FACTORY
const Player = (id, mark) => {
    const turn = () => `It's ${id}'s turn now`
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

// TURN LIGHT
const toggleLight = string => {
    const playerX = document.querySelector(".player-x")
    const playerO = document.querySelector(".player-o")
    if (string == x) {
        playerX.classList.add("player-turn")
        playerO.classList.remove("player-turn")
    } else if (string == o) {
        playerO.classList.add("player-turn")
        playerX.classList.remove("player-turn")
    } else if (string == "tie") {
        playerO.classList.add("player-turn")
        playerX.classList.add("player-turn")
    }
}

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
        default:
            // TIE
            if (!board.includes('')) {
                toggleLight("tie")
                return updatePrompt("IT'S A TIE")
            }
            // MOVE ON TO NEXT PLAYER
            nextPlayer()
            updatePrompt(currentPlayer.turn().toUpperCase())
            toggleLight(currentPlayer)
    }
}


// INPUT
cells.forEach(cell => cell.addEventListener('click', function() {
    cell.disabled = true
    board[cell.value] = currentPlayer.mark
    console.log(`${currentPlayer.id} put ${currentPlayer.mark} on cell no ${cell.value}`);
    updateDisplay()
    isWinning()
}))

updatePrompt("Click start to play\nThe first player will be choosen randomly")
const startButton = document.querySelector(".start")
startButton.addEventListener('click', function() {
    board = makeBoard()
    currentPlayer = allPlayers[randomPlayer(allPlayers)]
    // currentPlayer = allPlayers[randomPlayer(allPlayers)]

    cells.forEach(cell => cell.disabled = false)
    //PLAYER INPUT
    updatePrompt(currentPlayer.first());
    toggleLight(currentPlayer)
    updateDisplay()
})