const functions = require('firebase-functions');

const app = require('./app');

exports.board = functions.https.onRequest((request, response) => {
  app(request, response);
});
