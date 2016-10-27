const db = require('./db');


module.exports = {
  get(callback) {
    db.knex.select('*').from('todos')
      .then(data => {
        callback(data, null);
      })
      .catch(error => {
        console.log('ERROR from get method', error);
        callback(null, error);
      });
  },

  post(param, callback) {
    db.knex.insert([{title: param[0], entrynum: param[1]}]).into('todos')
      .then(data => {
        callback(data, null);
      })
      .catch(error => {
        console.log('ERROR from post method', error);
        callback(null, error);
      });
  },

  put(param, callback) {
    db.knex('todos').where('entrynum', '=', param[1]).update({ title: param[0] })
      .then(data => {
        callback(data);
      })
      .catch(error => {
        console.log('ERROR from put method', error);
        callback(error);
      });
  },

  delete(param, callback) {
    db.knex('todos').where('entrynum', param[0]).del()
      .then(data => {
        callback(data, null);
      })
      .catch(error => {
        console.log('ERROR from delete method', error);
        callback(null, error);
      });
  },
};
