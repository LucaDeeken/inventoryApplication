const { Router } = require("express");
const usersController = require("../controllers/userController");
const usersRouter = Router();

usersRouter.get("/", usersController.getAll);
usersRouter.get("/all", usersController.getAll);
usersRouter.get("/element/:searchElement", usersController.getElement);
usersRouter.get("/weapon/:searchWeapon", usersController.getWeapon);

module.exports = usersRouter;
