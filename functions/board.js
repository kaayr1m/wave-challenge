// Using variable which will only allow one game at a time
// Could use node persist or another key value store to allow multiple unique games
let currentBoard = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ];

// The server will always be 'o'
const x = 'x', o = 'o';

// Use minimax algorithm to find the best move
function minimax(board, player) {
  // Determine if a player has already won
  // Return a score
  // 0 if tie
  // -10 if x wins
  // 10 if o wins


  // Find the playable indexes

  // Loop through all the playable indexes
  // Play each possibility recursively
  
  // Return the best move
  return 0;
}

module.exports = {
  myTurn() {
    let spots = {
      o: currentBoard.filter(s => s === o).length,
      x: currentBoard.filter(s => s === x).length
    };
    
    return (spots.o === spots.x || spots.o < spots.x);
  },
  play(board) {
    let bestMove = minimax(board, o).index;
    board[bestMove] = o;
    currentBoard = board;

    return currentBoard;
  },
  current() {
    return currentBoard;
  }
}