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
exports.userServices = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const creteUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find().select("username fullName age email address");
    return result;
});
<<<<<<< HEAD
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(userId))) { // confused here
        const error = new Error();
        console.log(error, "error in service to get user");
=======
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        const error = new Error();
        console.log(error, 'error in service to get usesr');
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = yield user_model_1.default.findById(id).select("-password -orders");
    return result;
});
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        const error = new Error();
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = yield user_model_1.default.findOne({ userId }).select("-password -orders");
    return result;
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(userId))) {
        const error = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = yield user_model_1.default.findOneAndUpdate({ userId }, userData, {
        new: true,
        runValidators: true,
    }).select("-password -orders");
    return result;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(userId))) {
        const error = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = yield user_model_1.default.findOneAndDelete({ userId });
    return result;
});
const addOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(userId))) {
        const error = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = yield user_model_1.default.findOne({ userId });
    const result = user === null || user === void 0 ? void 0 : user.addOrder(orderData);
    return result;
});
const getOrdersForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(userId))) {
        const error = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = yield user_model_1.default.findOne({ userId });
    const orders = user === null || user === void 0 ? void 0 : user.orders;
    return orders;
});
const getTotalPriceForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!(yield user_model_1.default.isUserExists(userId))) {
        const error = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
<<<<<<< HEAD
    const user = yield user_model_1.default.findOne({ userId });
=======
    const user = yield user_model_1.default.findById(id);
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8
    let totalPrice = (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((total, order) => (total += order.price * order.quantity), 0);
    const roundedTotalPrice = Number(totalPrice).toFixed(2);
    return roundedTotalPrice;
});
exports.userServices = {
    creteUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getOrdersForUser,
    getTotalPriceForUser,
};
