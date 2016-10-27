const Bookshelf = require('bookshelf');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/angular2todo';
const pg = require('knex')({
  client: 'pg',
  connection: DATABASE_URL,
  searchPath: 'knex,public'
});
const db = require('bookshelf')(pg);


db.knex.schema.hasTable('todos').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('todos', todo => {
      todo.integer('entrynum').primary();
      todo.text('title');
    }).then(table => {
      console.log('Created Table:', table);
    });
  }
});


module.exports = db;
