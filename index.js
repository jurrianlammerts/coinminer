const express = require('express');

const app = express();

app.set('port', 3000);
app.listen(app.get('port'), () => {
  console.log(`Node running on port: ${app.get('port')}`);
});

const { data } = require('./api');

console.log(data);
