const db = require("../db/queries");

async function getIndex(req, res) {
  res.render("index");
  const hi = await db.getElementItems(3);
  const hai = filterDoubles(hi);
  console.log(hai);
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

module.exports = {
  getIndex,
};
