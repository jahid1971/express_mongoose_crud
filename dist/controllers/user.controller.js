"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const user_validation_1 = require("../validation/user.validation");
const mongoose_1 = __importDefault(require("mongoose"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodParsedData = user_validation_1.userCreateValidationSchema.parse(userData);
        const user = yield user_service_1.userServices.creteUser(zodParsedData);
        let result = user;
        result = result.toObject();
        delete result.orders;
        delete result.password;
        res.status(201).json({
            status: "success",
            messagee: "user created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err.message, "create-user error");
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsers();
        res.status(200).json({
            status: "success",
            messagee: "users fetched successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.userServices.getSingleUser(userId);
        res.status(200).json({
            status: "success",
            messagee: "user fetched successfully",
            data: result,
        });
    }
    catch (err) {
        // console.log(err);
        if (err instanceof mongoose_1.default.Error.CastError || err.code === 404) {
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
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const userData = req.body;
        const zodParsedData = user_validation_1.userUpdateValidationSchema.parse(userData);
        const result = yield user_service_1.userServices.updateUser(userId, zodParsedData);
        res.status(200).json({
            status: "success",
            messagee: "user updated successfully",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof mongoose_1.default.Error.CastError || err.code === 404) {
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
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const orderData = req.body;
        const zodParsedData = user_validation_1.orderDataValidationSchema.parse(orderData);
<<<<<<< HEAD
        yield user_service_1.userServices.addOrder(userId, zodParsedData);
=======
        yield user_service_1.userServices.addOrder(id, zodParsedData);
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8
        res.status(200).json({
            status: "success",
            messagee: "Order created successfully!",
            data: null,
        });
    }
    catch (err) {
        if (err instanceof mongoose_1.default.Error.CastError || err.code === 404) {
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
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.userServices.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        if (err instanceof mongoose_1.default.Error.CastError || err.code === 404) {
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
});
const getOrdersForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const orders = yield user_service_1.userServices.getOrdersForUser(userId);
        if (orders === null || orders === void 0 ? void 0 : orders.length) {
            res.status(200).json({
                success: true,
                message: "orders fetched successfully!",
                data: { orders: orders },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User does not have any order yet",
                // data: orders,
            });
        }
    }
    catch (err) {
        // console.log(err, 'errorrrr');
        if (err instanceof mongoose_1.default.Error.CastError || err.code === 404) {
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
});
const getTotalPriceForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const totalPrice = yield user_service_1.userServices.getTotalPriceForUser(userId);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: { totalPrice: totalPrice },
        });
    }
    catch (err) {
        if (err instanceof mongoose_1.default.Error.CastError || err.code === 404) {
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
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getOrdersForUser,
    getTotalPriceForUser,
};
