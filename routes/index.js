const { Router } = require("express");
const usersController = require("../controllers/userController");
const usersRouter = Router();

usersRouter.get("/", usersController.getAll);
usersRouter.get("/all", usersController.getAll);
usersRouter.get("/element/:searchElement", usersController.getElement);
usersRouter.get("/weapon/:searchWeapon", usersController.getWeapon);
usersRouter.get("/item/:id", usersController.getItemId);
usersRouter.get("/create", usersController.createItemDropdowns);
usersRouter.post("/create", usersController.createItem);
usersRouter.post("/delete/:id", usersController.deleteItem);

module.exports = usersRouter;
