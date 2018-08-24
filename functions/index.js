const functions = require('firebase-functions');
const express = require('express');
const app = express();

// Return the current board
app.get('/', (req, res) => {
  res.send(board.current());
});

// Play the next move if its bots turn
// board/:board is a string eg:
// board/+ox+++++x
//      or
// board/ ox     x
app.put('/:board', (req, res) => {
  let newBoard = req.params['board'].split('');

  if (board.myTurn()) {
    board.play(newBoard);
    res.send(board.current());
  } else {
    // Not the servers turn
    // Bad request
    res.sendStatus(400);
  }
});

exports.board = functions.https.onRequest((request, response) => {
  app(request, response);
});
