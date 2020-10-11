// Initialize gameboard
let gameBoard = emptyBoard(4);
gameBoard[0][0] = 2;
// Set the tile
let tile = document.getElementById("0-0");
let num = document.createElement('h1');
num.innerText = "2";
tile.appendChild(num);
tile.classList.add("two");

// Creates an empty board
function emptyBoard(size) {
    let board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [0, 0, 0, 0];
    }
    return board;
}

// Random generator
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.ceil(max));
}

// Add random number to gameboard
function addNumber() {
    let freeSpots = [];
    for (let i = 0; i < gameBoard.length; i++) {
        for (let k = 0; k < gameBoard.length; k++) {
            if (gameBoard[i][k] === 0) {
                freeSpots.push([i,k]);
            }
        }
    }
    // Choose a random square and assign 2 or 4
    if (freeSpots.length > 0) {
        let spot = getRandomInt(freeSpots.length);
        const chooseNum = getRandomInt(2);
        gameBoard[freeSpots[spot][0]][freeSpots[spot][1]] = chooseNum === 1 ? 2 : 4;
    }
}

// Update board according to gameBoard
function updateBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let k = 0; k < gameBoard.length; k++) {
            let tile = document.getElementById(`${i}-${k}`);
            if (tile.firstElementChild) {
                tile.removeChild(tile.firstElementChild);
                tile.className = "empty-tile"
            }
            if (gameBoard[i][k] !== 0) {
                let num = document.createElement('h1');
                num.innerText = `${gameBoard[i][k]}`;
                if (gameBoard[i][k] > 4) {
                    num.classList.add("white");
                }
                tile.appendChild(num);
                if (gameBoard[i][k] === 2) {
                    tile.classList.add("two");
                } else if (gameBoard[i][k] == 4) {
                    tile.classList.add("four");
                } else if (gameBoard[i][k] == 8) {
                    tile.classList.add("eight");
                } else if (gameBoard[i][k] == 16) {
                    tile.classList.add("sixteen");
                } else if (gameBoard[i][k] == 32) {
                    tile.classList.add("thirtytwo");
                } else if (gameBoard[i][k] == 64) {
                    tile.classList.add("sixtyfour");
                } else if (gameBoard[i][k] == 128) {
                    tile.classList.add("onetwoeight");
                } else if (gameBoard[i][k] == 256) {
                    tile.classList.add("twofivesix");
                } else if (gameBoard[i][k] == 512) {
                    tile.classList.add("fiveonetwo");
                } else if (gameBoard[i][k] == 1024) {
                    tile.classList.add("onezerotwofour");
                } else if (gameBoard[i][k] == 2048) {
                    tile.classList.add("twozerofoureight");
                } else {
                    tile.classList.add("rest");
                }
            }
        }
    }
}

// Makes a deep copy of the gameBoard
function copyBoard() {
    let copy = emptyBoard(4);
    for (let i = 0; i < gameBoard.length; i++) {
        for (let k = 0; k < gameBoard.length; k++) {
            copy[i][k] = gameBoard[i][k];
        }
    }
    return copy;
}

// Compares old board to current gameboard
function compareBoard(old) {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let k = 0; k < gameBoard.length; k++) {
            if (old[i][k] !== gameBoard[i][k]) {
                return true;
            }
        }
    }
    return false;
}

// Slides row to the left
function slide(row) {
    let newRow = row.filter(num => num);
    while (newRow.length != row.length) {
        newRow.push(0);
    }
    return newRow;
}

// Combines the tiles
function combine(row) {
    for (let i = 0; i < 3; i++) {
        if (row[i] === row[i+1]) {
            row[i] += row[i+1];
            row[i+1] = 0;
        }
    }
}

// Rotate the gameboard 90 degrees clockwise
function rotate() {
    // Transpose
    const len = gameBoard.length;
    for (let i = 0; i < len; i++) {
        for (let k = i; k < len; k++) {
            const temp = gameBoard[i][k];
            gameBoard[i][k] = gameBoard[k][i];
            gameBoard[k][i] = temp;
        }
    }

    // Flip horizontally
    for (let i = 0; i < len; i++) {
        for (let k = 0; k < len/2; k++) {
            const temp = gameBoard[i][k];
            gameBoard[i][k] = gameBoard[i][len-k-1];
            gameBoard[i][len-k-1] = temp;
        }
    }
}

// Slides the board in the chosen direction
function slideBoard(rotations) {
    for (let i = 0; i < rotations; i++) {
        rotate();
    }
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = slide(gameBoard[i]);
        combine(gameBoard[i]);
        gameBoard[i] = slide(gameBoard[i]);
    }
    for (let i = 0; i < gameBoard.length - rotations; i++) {
        rotate();
    }
}

// Performs a keydown move
function move(rotations) {
    const oldBoard = copyBoard();
    slideBoard(rotations);
    if (compareBoard(oldBoard)) {
        addNumber();
    }
    updateBoard();
}

// Keydown Handler
const handler = (event) => {
    switch (event.key) {
        case 'ArrowDown':
            move(1);
            break;
        case 'ArrowUp':
            move(3);
            break;
        case 'ArrowLeft':
            move(0);
            break;
        case 'ArrowRight':
            move(2);
            break;
    }
};

document.addEventListener('keydown', handler);

