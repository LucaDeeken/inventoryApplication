const db = require("../db/queries");

async function getAll(req, res) {
  const elementItems = await db.getAllItems();
  const filteredElementItems = filterDoubles(elementItems);
  console.log(filteredElementItems);
  res.render("layout", { items: filteredElementItems, view: "index" });
}

async function getElement(req, res) {
  const { searchElement } = req.params;
  const elementItems = await db.getElementItems(searchElement);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("layout", { items: filteredElementItems, view: "index" });
}

async function getWeapon(req, res) {
  const { searchWeapon } = req.params;
  const elementItems = await db.getWeaponItems(searchWeapon);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("layout", { items: filteredElementItems, view: "index" });
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
  res.render("layout", { item: filteredElementItems[0], view: "index" });
}

async function createItemDropdowns(req, res) {
  res.render("layout", {
    options: ["Fire", "Earth", "Air", "Holy", "Unholy", "Chaos", "Water"],
    weaponType: ["Wand", "Hat", "Robe"],
    view: "createItem",
  });
}

async function createItem(req, res) {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send("Wrong admin password");
  }
  try {
    await db.createItem(req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error creating item");
  }
}

module.exports = {
  getAll,
  getElement,
  getWeapon,
  getItemId,
  createItemDropdowns,
  createItem,
};
