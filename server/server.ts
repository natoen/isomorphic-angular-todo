require('angular2-universal-polyfills');
const { enableProdMode } = require('@angular/core');
const express = require('express');

enableProdMode();

const app = express();
const port = process.env.PORT || 8080;

require('./middleware')(app, express);
require('./router')(app, express, port);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});