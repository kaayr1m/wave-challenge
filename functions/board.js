// Using variable which will only allow one game at a time
// Could use node persist or another key value store to allow multiple unique games
let currentBoard = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ];

// The server will always be 'o'
const x = 'x', o = 'o';

// 
function won(board, player) {
  // To allow nxn tic tac toe
  // Get the n count of the board
  let n = Math.sqrt(board.length);

  // Possible wins
  let winVertical = false;
  let winHorizontal = false;
  let winDiagonal1 = false;
  let winDiagonal2 = false;

  // Horizotal Check
  // n*(n+1) is a summation
  for (let row = 0; row <= n*(n-1); row+=n) {
    winHorizontal = true;
    for (let col = row; col < (row + n); ++col) {
      if (board[col] !== player) {
        winHorizontal = false;
        break;
      }
    }
    
    if (winHorizontal) break;
  }

  // Vertical Check
  for (let col = 0; col < n; ++col) {
    winVertical = true;
    // +col adds offset from the left of the columns
    // n*(n+1) is a summation
    for (let row = col; row <= (n*(n-1))+col; row+=n) {
      if (board[row] !== player) {
        winVertical = false;
        break;
      }
    }

    if (winVertical) break;
  }

  // Diagnol Check
  winDiagonal1 = true;
  for (let i = 0; i < n*n; i += (n+1)) {
    if (board[i] !== player) {
      winDiagonal1 = false;
      break;
    }
  }

  winDiagonal2 = true;
  // n*(n+1) is a summation
  for (let i = n-1; i <= n*(n-1); i += (n-1)) {
    if (board[i] !== player) {
      winDiagonal2 = false;
      break;
    }
  }
  
  // Can win if any of the patterns are true
  return (winHorizontal || winVertical || winDiagonal1 || winDiagonal2);
}

// Use minimax algorithm to find the best move
function minimax(board, player) {
  // Find the playable indexes
  let moves = board.map((pos, index) => pos === ' '? index : null).filter(n => n !== null);

  // Determine if a player has already won
  // Return a score
  // 0 if tie
  // -10 if x wins
  // 10 if o wins
  if (won(board, x)) {
    return {score: -10};
  } else if (won(board, o)) {
    return {score: 10};
  } else if (moves.length === 0) {
    return {score: 0};
  }

  // Loop through all the playable indexes
  // Play each possibility recursively
  moves = moves.map(m => {
    // Current player plays
    board[m] = player;

    // Simulate next player move
    let result = player === o ? minimax(board, x) : minimax(board, o);

    // Reset the board
    board[m] = ' ';

    return {
      index: m,
      score: result.score
    }
  });

  let best = {
    score: player === o ? -1000 : 1000
  };
  moves.forEach(m => {
    if ((player === o && m.score > best.score) ||
      (player === x && m.score < best.score)) {
      best = m;
    } 
  }); 
  
  // Return the best move
  return best;
}

module.exports = {
  _won: won,
  _minimax: minimax,
  myTurn(board) {
    let spots = {
      o: board.filter(s => s === o).length,
      x: board.filter(s => s === x).length
    };
    
    return (spots.o === spots.x || spots.o < spots.x);
  },
  play(board) {
    let spots = {
      o: board.filter(s => s === o).length,
      x: board.filter(s => s === x).length
    };

    let move;
    if (spots.o === 0 && spots.x === 0) {
      move = Math.floor(Math.random() * (board.length-1));
    } else {
      move = minimax(board, o).index;
    }

    board[move] = o;
    currentBoard = board;

    return currentBoard;
  },
  current() {
    return currentBoard;
  }
}