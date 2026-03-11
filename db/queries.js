const pool = require("./pool");

async function getElementItems(elementId) {
  const { rows } = await pool.query(
    `
SELECT i.id AS item_id,
       i.name AS item_name,
       i.type,
       i.price,
       i.stock,
       e.name AS element_name,
       ia.attribute,
       ia.value
FROM item i
JOIN element e ON i.element_id = e.id
LEFT JOIN item_attribute ia ON ia.item_id = i.id
WHERE i.element_id = $1
ORDER BY i.id;
  `,
    [elementId],
  );
  return rows;
}

module.exports = {
  getElementItems,
};
