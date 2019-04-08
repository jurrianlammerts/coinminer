const express = require('express');
const app = express();
const port = 3000;

const { lastBlock } = require('./api');
const fakeBlock = require('../tests/data.test.json');
const { Mod10, createString } = require('./functions');

const mine = async () => {
  // const { data } = await lastBlock();
  const string = createString(fakeBlock);
  const hash = Mod10(string);
  console.log(hash);
};

app.set('port', port);
app.listen(app.get('port'), async () => {
  console.log(`Running on port: ${app.get('port')}`);
  await mine();
});
