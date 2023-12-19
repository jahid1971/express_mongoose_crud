import { Request, Response } from "express";
import { userServices } from "../services/user.service";
import { IUser, IUserUpdate } from "../interfaces/user.interface";
import {
    orderDataValidationSchema,
    userCreateValidationSchema,
    userUpdateValidationSchema,
} from "../validation/user.validation";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const zodParsedData = userCreateValidationSchema.parse(userData);
        const user = await userServices.creteUser(zodParsedData);

        let result = user as any;
        result = result.toObject();
        delete result.orders;
        delete result.password;

        res.status(201).json({
            status: "success",
            messagee: "user created successfully",
            data: result,
        });
    } catch (err: any) {
        console.log(err.message, "create-user error");
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
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
            message: "Something went wrong",
        });
    }
};
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId); 
        const result = await userServices.getSingleUser(userId);
        res.status(200).json({
            status: "success",
            messagee: "user fetched successfully",
            data: result,
        });
    } catch (err: any) {
        // console.log(err);
        if (err instanceof mongoose.Error.CastError || err.code === 404) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
        });
    }
};
const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const userData = req.body;

        const zodParsedData = userUpdateValidationSchema.parse(userData);
        const result = await userServices.updateUser(userId, zodParsedData as IUserUpdate);

        res.status(200).json({
            status: "success",
            messagee: "user updated successfully",
            data: result,
        });
    } catch (err: any) {
        if (err instanceof mongoose.Error.CastError || err.code === 404) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
        });
    }
};
const addOrder = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const orderData = req.body;

        const zodParsedData = orderDataValidationSchema.parse(orderData);
<<<<<<< HEAD
        await userServices.addOrder(userId, zodParsedData);
=======
        await userServices.addOrder(id, zodParsedData);
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8

        res.status(200).json({
            status: "success",
            messagee: "Order created successfully!",
            data: null,
        });
    } catch (err: any) {
        if (err instanceof mongoose.Error.CastError || err.code === 404) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
        });
    }
};
const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const result = await userServices.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    } catch (err: any) {
        if (err instanceof mongoose.Error.CastError || err.code === 404) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
        });
    }
};
const getOrdersForUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const orders = await userServices.getOrdersForUser(userId);
        if (orders?.length) {
            res.status(200).json({
                success: true,
                message: "orders fetched successfully!",
                data: { orders: orders },
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User does not have any order yet",
                // data: orders,
            });
        }
    } catch (err: any) {
        // console.log(err, 'errorrrr');
        if (err instanceof mongoose.Error.CastError || err.code === 404) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
        });
    }
};
const getTotalPriceForUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const totalPrice = await userServices.getTotalPriceForUser(userId);

        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: { totalPrice: totalPrice },
        });
    } catch (err: any) {
        if (err instanceof mongoose.Error.CastError || err.code === 404) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
        });
    }
};

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getOrdersForUser,
    getTotalPriceForUser,
};
