const db = require("../db/queries");

async function getAll(req, res) {
  const elementItems = await db.getAllItems();
  const filteredElementItems = filterDoubles(elementItems);
  console.log(filteredElementItems);
  res.render("index", { items: filteredElementItems });
}

async function getElement(req, res) {
  const { searchElement } = req.params;
  const elementItems = await db.getElementItems(searchElement);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("index", { items: filteredElementItems });
}

async function getWeapon(req, res) {
  const { searchWeapon } = req.params;
  const elementItems = await db.getWeaponItems(searchWeapon);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("index", { items: filteredElementItems });
}

function filterDoubles(sqlReturn) {
  const newArr = [];
  sqlReturn.forEach((element) => {
    if (
      newArr.find((sqlElement) => sqlElement.item_id == element.item_id) ===
      undefined
    ) {
      newArr.push(element);
    }
  });
  return newArr;
}

async function getItemId(req, res) {
  console.log(req.params);
  const { id } = req.params;
  const elementItems = await db.getItem(id);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("index", { item: filteredElementItems[0] });
}

module.exports = {
  getAll,
  getElement,
  getWeapon,
  getItemId,
};
