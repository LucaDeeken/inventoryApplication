require("dotenv").config();
const pool = require("./pool"); // dein pool.js

const SQL = `
DROP TABLE IF EXISTS item_attribute;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS element;

CREATE TABLE IF NOT EXISTS element (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  stock INTEGER,
  price NUMERIC,
  image_url TEXT,
  element_id INTEGER REFERENCES element(id)
);

CREATE TABLE IF NOT EXISTS item_attribute (
  id SERIAL PRIMARY KEY,
  attribute VARCHAR(50) NOT NULL,
  value INTEGER,
  item_id INTEGER REFERENCES item(id)
);
`;

async function main() {
  try {
    await pool.query(SQL);
    console.log("Tables created successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end(); // Verbindung schließen
  }
}

main();
