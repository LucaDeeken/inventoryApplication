const db = require("../db/queries");

//renders all items from the DB
async function getAll(req, res) {
  const elementItems = await db.getAllItems();
  const filteredElementItems = filterDoubles(elementItems);
  res.render("layout", { items: filteredElementItems, view: "index" });
}

//renders a specific element from the DB
async function getElement(req, res) {
  const { searchElement } = req.params;
  const elementItems = await db.getElementItems(searchElement);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("layout", { items: filteredElementItems, view: "index" });
}

//renders a specific item from the DB by it's name
async function getWeapon(req, res) {
  const { searchWeapon } = req.params;
  const elementItems = await db.getWeaponItems(searchWeapon);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("layout", { items: filteredElementItems, view: "index" });
}

//filters the array so in return there are no doubles
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

//renders a specific item from the DB by it's ID
async function getItemId(req, res) {
  console.log(req.params);
  const { id } = req.params;
  const elementItems = await db.getItem(id);
  const filteredElementItems = filterDoubles(elementItems);
  res.render("layout", { item: filteredElementItems[0], view: "index" });
}

//transfers two arrays, one with all elementNames, the second has all weaponTypes to the createItem-viewFile
//it's purpose is to create two dropdowns, in which the user can select what kind of weapon he/she wants to create
async function createItemDropdowns(req, res) {
  res.render("layout", {
    options: ["Fire", "Earth", "Air", "Holy", "Unholy", "Chaos", "Water"],
    weaponType: ["Wand", "Hat", "Robe"],
    view: "createItem",
  });
}

//if the admin-password is correct, with the given parameters a new item is created inside the DB
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

//if the admin-password is correct, an item will be deleted inside the DB
async function deleteItem(req, res) {
  const { password } = req.body;
  const { id } = req.params;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send("Wrong admin password");
  }

  try {
    await db.deleteWeapon(id);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
}

module.exports = {
  getAll,
  getElement,
  getWeapon,
  getItemId,
  createItemDropdowns,
  createItem,
  deleteItem,
};
