import { Request, Response } from "express";
import { userServices } from "../services/user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const result = await userServices.creteUser(userData);
        res.status(201).json({
            status: "success",
            messagee: "user created successfully",
            data: result,
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err.message || "Something went wrong",
        });
    }
};
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsers();
        res.status(200).json({
            status: "success",
            messagee: "users fetched successfully",
            data: result,
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err.message || "Something went wrong",
        });
    }
};

export const userController = {
    createUser,
    getAllUsers
};
