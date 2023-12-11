"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRoute = express_1.default.Router();
userRoute.post("/", user_controller_1.userController.createUser);
userRoute.get("/", user_controller_1.userController.getAllUsers);
userRoute.get("/:id", user_controller_1.userController.getSingleUser);
userRoute.put("/:id", user_controller_1.userController.updateUser);
userRoute.delete("/:id", user_controller_1.userController.deleteUser);
userRoute.put("/:userId/orders", user_controller_1.userController.addOrder);
userRoute.get("/:userId/orders", user_controller_1.userController.getOrdersForUser);
userRoute.get("/:userId/orders/total-price", user_controller_1.userController.getTotalPriceForUser);
exports.default = userRoute;
