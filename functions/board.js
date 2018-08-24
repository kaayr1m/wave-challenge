// Using variable which will only allow one game at a time
// Could use node persist or another key value store to allow multiple unique games
let currentBoard = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ];

const x = 'x', o = 'o';

module.exports = {
  myTurn() {
    let spots = {
      o: currentBoard.filter(s => s === o).length,
      x: currentBoard.filter(s => s === x).length
    };
    
    return (spots.o === spots.x || spots.o < spots.x);
  },
  play(board) {
    currentBoard = board;
  },
  current() {
    return currentBoard;
  }
}