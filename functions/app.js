const express = require('express');
const app = express();

const board = require('./board');

// Print response with '+' as symbol for space
function toString(board) {
  return board.map(s => s === ' ' ? '+': s).join('');
}

// Return the current board
app.get('/', (req, res) => {
  res.send(toString(board.current()));
});

// Play the next move if its bots turn
// board/:board is a string eg:
// board/+ox+++++x
//      or
// board/ ox     x
app.put('/:board', (req, res) => {
  let newBoard = req.params['board'].split('');

  // Clean input
  // Replace '+' to spaces
  newBoard = newBoard.map(s => s === "+" ? " ": s);

  if (board.myTurn()) {
    let currentBoard = board.play(newBoard);
    res.send(toString(currentBoard));
  } else {
    // Not the servers turn
    // Bad request
    res.sendStatus(400);
  }
});

module.exports = app;