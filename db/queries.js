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

async function createItem(data) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let elementRes = await client.query(
      "SELECT id FROM element WHERE name = $1",
      [data.element_name],
    );

    let elementId;

    if (elementRes.rows.length === 0) {
      const newElement = await client.query(
        "INSERT INTO element (name) VALUES ($1) RETURNING id",
        [data.element_name],
      );
      elementId = newElement.rows[0].id;
    } else {
      elementId = elementRes.rows[0].id;
    }

    const itemRes = await client.query(
      `INSERT INTO item 
      (name, description, type, stock, price, image_url, element_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id`,
      [
        data.item_name,
        data.description,
        data.type,
        data.stock,
        data.price,
        data.image_url,
        elementId,
      ],
    );

    const itemId = itemRes.rows[0].id;

    await client.query(
      `INSERT INTO item_attribute (attribute, value, item_id)
       VALUES ($1,$2,$3)`,
      [data.attribute, data.value, itemId],
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function deleteWeapon(id) {
  await pool.query("DELETE FROM item_attribute WHERE item_id = $1", [id]);
  await pool.query("DELETE FROM item WHERE id = $1", [id]);
}

module.exports = {
  getElementItems,
  getAllItems,
  getWeaponItems,
  getItem,
  createItem,
  deleteWeapon,
};
