let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;

    if (checkWinner()) {
        document.getElementById('status').textContent = `Pelaaja ${currentPlayer} voitti!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        document.getElementById('status').textContent = 'Tasapeli!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Pelaaja ${currentPlayer} vuoro!`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rivit
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // sarakkeet
        [0, 4, 8], [2, 4, 6]             // viivat
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('status').textContent = 'Peli alkaa. Pelaa ensimmäinen siirto!';
}

