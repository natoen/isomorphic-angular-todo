const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/angular2todo';
const connection = pgp(DATABASE_URL);

module.exports = connection;
