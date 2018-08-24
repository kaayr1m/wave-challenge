const functions = require('firebase-functions');
const express = require('express');
const app = express();

exports.board = functions.https.onRequest((request, response) => {
  app(request, response);
});
