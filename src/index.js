const express = require('express');
const app = express();
const port = 3000;

const { lastBlock } = require('./api');
const { Mod10 } = require('./functions');

const mine = async () => {
  const { data } = await lastBlock();
  // console.log(data)
  // console.log(data.blockchain.hash);

  Mod10(data.blockchain.hash);
};

app.set('port', port);
app.listen(app.get('port'), async () => {
  console.log(`Running on port: ${app.get('port')}`);
  await mine();
});
