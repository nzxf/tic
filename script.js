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

// RANDOMIZER 
const randomPlayer = arr => Math.floor(Math.random() * arr.length)

// PLAYER TURN
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

// TODO: PLAY SIMULATION
const cells = document.querySelectorAll(".cells")
// BUTTON DISABLED WHEN NOT PLAYING
cells.forEach(cell => cell.disabled = true)
// INPUT
const playerInput = (arr) => {
    cells.forEach(cell => cell.addEventListener('click', function() {
        console.log(`${currentPlayer.id} put ${currentPlayer.mark} cell no ${cell.value}`);
        arr[cell.value] = currentPlayer.mark
        cell.textContent = currentPlayer.mark
        cell.disabled = true
        isWinning(arr)
    }))
}

// THE GAME 
const isWinning = (arr) => {
    //horizontal
    let h1 = [arr[0], arr[1], arr[2]]
    let h2 = [arr[3], arr[4], arr[5]]
    let h3 = [arr[6], arr[7], arr[8]]
    //vertical
    let v1 = [arr[0], arr[3], arr[6]]
    let v2 = [arr[1], arr[4], arr[7]]
    let v3 = [arr[2], arr[5], arr[8]]
    //diagonal
    let d1 = [arr[0], arr[4], arr[8]]
    let d2 = [arr[6], arr[4], arr[2]]

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
            cells.forEach(cell => cell.disabled = true)
            currentPlayer.win()
            break;
        default:
            nextPlayer();
            currentPlayer.turn()
    }
}

const startButton = document.querySelector(".start")
startButton.addEventListener('click', function() {
    console.log("The game begins");
    let board = makeBoard()
    console.log("Board is ready")
    cells.forEach(cell => cell.innerText = board[cell.value])
    cells.forEach(cell => cell.disabled = false)
    // for (i = 0; i < board.length; i++) {
    //     ba
    // }
    console.log("Buttons are activated");
    //PLAYER INPUT
    playerInput(board);
})

