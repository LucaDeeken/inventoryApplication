const pool = require("./pool");

async function getElementItems(element) {
  const { rows } = await pool.query(
    `
SELECT i.id AS item_id,
       i.name AS item_name,
       i.type,
       i.description,
       i.image_url,
       i.price,
       i.stock,
       e.name AS element_name,
       ia.attribute,
       ia.value
FROM item i
JOIN element e ON i.element_id = e.id
LEFT JOIN item_attribute ia ON ia.item_id = i.id
WHERE LOWER(e.name) = LOWER($1)
ORDER BY i.id;
  `,
    [element],
  );
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query(
    `
SELECT i.id AS item_id,
       i.name AS item_name,
       i.type,
       i.description,
       i.image_url,
       i.price,
       i.stock,
       e.name AS element_name,
       ia.attribute,
       ia.value
FROM item i
JOIN element e ON i.element_id = e.id
LEFT JOIN item_attribute ia ON ia.item_id = i.id
ORDER BY i.id;
  `,
  );
  return rows;
}

async function getWeaponItems(weapon) {
  const { rows } = await pool.query(
    `
SELECT i.id AS item_id,
       i.name AS item_name,
       i.type,
       i.description,
       i.image_url,
       i.price,
       i.stock,
       e.name AS element_name,
       ia.attribute,
       ia.value
FROM item i
JOIN element e ON i.element_id = e.id
LEFT JOIN item_attribute ia ON ia.item_id = i.id
WHERE LOWER(i.type) = LOWER($1)
ORDER BY i.id;
  `,
    [weapon],
  );
  return rows;
}

async function getItem(id) {
  const { rows } = await pool.query(
    `
SELECT i.id AS item_id,
       i.name AS item_name,
       i.type,
       i.description,
       i.image_url,
       i.price,
       i.stock,
       e.name AS element_name,
       ia.attribute,
       ia.value
FROM item i
JOIN element e ON i.element_id = e.id
LEFT JOIN item_attribute ia ON ia.item_id = i.id
WHERE i.id = $1
ORDER BY i.id;
  `,
    [id],
  );
  return rows;
}

module.exports = {
  getElementItems,
  getAllItems,
  getWeaponItems,
  getItem,
};
