DROP TABLE IF EXISTS todos;
CREATE TABLE IF NOT EXISTS todos (
  entrynum SMALLINT PRIMARY KEY,
  title TEXT NOT NULL
);
