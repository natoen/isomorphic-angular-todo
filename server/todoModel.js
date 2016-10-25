const db = require('./db');


module.exports = {
  get(callback) {
    db.any('SELECT * FROM todos')
      .then(data => {
        callback(data, null);
      })
      .catch(error => {
        console.log('ERROR from get method', error);
        callback(null, error);
      });
  },

  post(param, callback) {
    db.any('INSERT INTO todos(title,entrynum)VALUES($1,$2)', param)
      .then(data => {
        callback(data, null);
      })
      .catch(error => {
        console.log('ERROR from post method', error);
        callback(null, error);
      });
  },

  put(param, callback) {
    db.any('UPDATE todos SET title=$1 WHERE entrynum=$2', param)
      .then(data => {
        callback(data);
      })
      .catch(error => {
        console.log('ERROR from put method', error);
        callback(error);
      });
  },

  delete(param, callback) {
    db.any('DELETE FROM todos WHERE entrynum=$1', param)
      .then(data => {
        callback(data, null);
      })
      .catch(error => {
        console.log('ERROR from delete method', error);
        callback(null, error);
      });
  },
};
