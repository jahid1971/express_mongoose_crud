import express from "express";
import { userController } from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.post("/", userController.createUser);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:id", userController.getSingleUser);
userRoute.put("/:id", userController.updateUser);
userRoute.delete("/:id", userController.deleteUser);
userRoute.put("/:userId/orders", userController.addOrder);
userRoute.get("/:userId/orders", userController.getOrdersForUser);
userRoute.get("/:userId/orders/total-price", userController.getTotalPriceForUser);

export default userRoute;
