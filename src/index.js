const express = require('express');
const app = express();
const port = 3000;

const { lastBlock, postBlock } = require('./api');
const fakeBlock = require('../tests/data.test.json');
const {
  Mod10,
  createString,
  createStringWithoutNonce,
  findNonce
} = require('./functions');

const mine = async () => {
  // Get data from api
  const { data } = await lastBlock();
  // Make a string
  const string = createString(data);
  // Hash the string
  const hash = Mod10(string);
  // Create a string without a nonce
  const stringWithoutNonce = createStringWithoutNonce(data, hash);
  // Find nonce
  const nonce = await findNonce(stringWithoutNonce);
  // Post nonce
  if (nonce) await postBlock(nonce.toString());
};

app.set('port', port);
app.listen(app.get('port'), async () => {
  console.log(`Running on port: ${app.get('port')}`);
  await mine();
});
