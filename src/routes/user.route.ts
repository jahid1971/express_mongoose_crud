import express from "express";
import { userController } from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.post("/", userController.createUser);
userRoute.get("/", userController.getAllUsers);

export default userRoute;
