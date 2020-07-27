const functions = require('firebase-functions');
const request = require('request');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors({ origin: true }));

app.get('/:pkg', cors(), (req, res) => {
  const url = `https://registry.npmjs.org/${req.params.pkg}`;

  request.get({ url, json: true }, (_err, _resp, body) => {
    res.jsonp(body);
  });
});

app.get('/suggestions', cors(), (req, res) => {
  const url = `https://www.npmjs.com/suggestions?q=${req.query.q}`;

  request.get({ url, json: true }, (_err, _resp, body) => {
    res.jsonp(body);
  });
});

exports.package = functions.https.onRequest(app);
