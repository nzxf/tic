// PLAYER FACTORY
const Player = (id, mark, className) => {
    const turn = () => `It's ${id}'s turn now`
    const win = () => `${id} is the winner!!!`
    const first = () => `${id} goes first`
    return { id, mark, className, turn, win, first }
}
const x = Player("Player X", "x", ".player-x");
const o = Player("Player O", "o", ".player-o");
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


// UPDATE DISPLAY BOARD
const cells = document.querySelectorAll(".cells")
const updateDisplay = () => cells.forEach(cell => {
    cell.innerText = board[cell.value]
})

// PROMPT
const prompt = document.querySelector(".prompt")
const updatePrompt = string => prompt.innerText = string

// TURN LIGHT
const togglePlayer = string => {
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

// SWITCHING/TOGGLING/BLINKING EFFECT
const blinks = function(object, string, num, howMany) {
    for (let i = 0; i < howMany; i++) {
        setTimeout(function() {
            document.querySelectorAll(object).forEach(obj => obj.classList.toggle(string))
        }, num * (i * 100));
    }
}

// WIN OR TIE SCENARIO
const winCase = () => {
    cells.forEach(cell => cell.disabled = true)
    blinks(".cells", "cells-win", 1.5, 10)
    blinks(currentPlayer.className, "blink", 1.5, 11)
    updatePrompt(currentPlayer.win())
}
const tieCase = () => {
    togglePlayer("tie")
    blinks(".cells", "cells-start")

    blinks(x.className, "blink", 3, 7)
    blinks(o.className, "blink", 3, 7)
    updatePrompt("It's a tie!")
}

// SOMEONE WINNING YET? 
const isGameover = () => {
    let marks = currentPlayer.mark.repeat(3)
    switch (marks) {
        // WIN
        case [board[0], board[1], board[2]].join(''): // Horizontal
        case [board[3], board[4], board[5]].join(''): // Horizontal
        case [board[6], board[7], board[8]].join(''): // Horizontal
        case [board[0], board[3], board[6]].join(''): // Vertical
        case [board[1], board[4], board[7]].join(''): // Vertical
        case [board[2], board[5], board[8]].join(''): // Vertical
        case [board[0], board[4], board[8]].join(''): // Diagonal
        case [board[2], board[4], board[6]].join(''): // Diagonal
            return winCase();
        default:
            // TIE
            if (!board.includes('')) {
                return tieCase();
            }
            // MOVE ON TO NEXT PLAYER
            nextPlayer()
            updatePrompt(currentPlayer.turn())
            togglePlayer(currentPlayer)
    }
}


// INPUT
cells.forEach(cell => cell.addEventListener('click', function() {
    cell.disabled = true
    board[cell.value] = currentPlayer.mark
    updateDisplay()
    isGameover()
}))

// RESET
const players = document.querySelectorAll(".players")
const reset = () => {
    players.forEach(player => player.classList.remove("player-turn", "blink"))
    board = makeBoard()
    updateDisplay()
    updatePrompt("");
    startButton.innerText = ""
}

// EFFECT ON START
const startEffect = () => {
    blinks(".cells-odd", "cells-start", 1.5, 6)
    blinks(".cells-even", "cells-start", 1.75, 6)
    blinks(".players", "player-start", 1.5, 6)
    blinks(".start", "start-restart", 1.5, 6)
}

// START
updatePrompt("Push start to play")
cells.forEach(cell => cell.disabled = true)
const startButton = document.querySelector(".start")
startButton.addEventListener('click', function() {
    reset()
    startEffect()
    setTimeout(function() {
        startButton.innerText = "RESTART?"
        currentPlayer = allPlayers[randomPlayer(allPlayers)]
        cells.forEach(cell => cell.disabled = false)
        //PLAYER INPUT
        updatePrompt(currentPlayer.first());
        togglePlayer(currentPlayer)
        updateDisplay()
    }, 1200)
})