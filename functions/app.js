const express = require('express');
const app = express();

const board = require('./board');

// Control access and modifications to the board
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

// Print response with '+' as symbol for space
function toString(board) {
  return board.map(s => s === ' ' ? '+': s).join('');
}

// Return the current board
app.get('/', (req, res) => {
  lock.acquire("board", () => {
    res.send(toString(board.current()));
  }).catch(() => {
      res.sendStatus(400);
  });
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

  lock.acquire("board", () => {
    if (board.myTurn()) {
      let currentBoard = board.play(newBoard);
      res.send(toString(currentBoard));
    } else {
      // Not the servers turn
      // Bad request
      res.sendStatus(400);
    }
  }).catch(() => {
      res.sendStatus(400);
  });
});

module.exports = app;