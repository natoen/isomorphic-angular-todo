const { AppModule } = require('../src/app/app.module');
const controller = require('./todoController');

module.exports = (app, express, port) => {
  const router = express.Router();

  router.get('/', controller.get);
  router.route('/:entrynum')
    .post(controller.post)
    .put(controller.put)
    .delete(controller.delete);

  app.use('/api/todo/', router);

  app.get('/', (req, res) => {
    res.render('index', {
      req,
      res,
      ngModule: AppModule,
      preboot: false,
      async: true,
      baseUrl: '/',
      requestUrl: req.originalUrl,
      originUrl: 'http://localhost:' + port
    });
  });

  app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ status: 404, message: 'No Content' });
  });
};
