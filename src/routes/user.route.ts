import express from "express";
import { userController } from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.post("/", userController.createUser);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:userId", userController.getSingleUser);
userRoute.put("/:userId", userController.updateUser);
userRoute.delete("/:userId", userController.deleteUser);
userRoute.put("/:userId/orders", userController.addOrder);
userRoute.get("/:userId/orders", userController.getOrdersForUser);
userRoute.get("/:userId/orders/total-price", userController.getTotalPriceForUser);

export default userRoute;
