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
  const { data } = await lastBlock();
  const string = createString(data);
  const hash = Mod10(string);
  const stringWithoutNonce = createStringWithoutNonce(data, hash);
  console.log('here: ' + stringWithoutNonce);
  const { finalHash, nonce } = await findNonce(stringWithoutNonce);
  console.log(nonce);
  console.log(finalHash);
};

app.set('port', port);
app.listen(app.get('port'), async () => {
  console.log(`Running on port: ${app.get('port')}`);
  await mine();
});
