const bodyParser = require('body-parser');
const logger = require('morgan');
const { createEngine } = require('angular2-express-engine');


module.exports = (app, express) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(express.static(`${__dirname}/../dist`, { index: false }));

  app.engine('.html', createEngine({}));
  app.set('views', `${__dirname}/../dist`);
  app.set('view engine', 'html');
};
