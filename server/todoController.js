const model = require('./todoModel');


module.exports = {
  get(req, res) {
    model.get((data, error) => {
      if (error) {
        res.status(500).end();
      } else {
        res.status(200).json(data);
      }
    });
  },

  post(req, res) {
    model.post([req.body.title, req.params.entrynum], (data, error) => {
      if (error) {
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  },

  put(req, res) {
    model.put([req.body.title, req.params.entrynum], (data, error) => {
      if (error) {
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  },

  delete(req, res) {
    model.delete([req.params.entrynum], (data, error) => {
      if (error) {
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  },
};
