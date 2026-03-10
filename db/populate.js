require("dotenv").config();
const pool = require("./pool");

const SQL = `
-- Löscht Item 12
DELETE FROM item
WHERE id = 12;

-- Löscht Item 13
DELETE FROM item
WHERE id = 13;
`;

async function main() {
  try {
    await pool.query(SQL);
    console.log("Daten erfolgreich eingefügt!");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
