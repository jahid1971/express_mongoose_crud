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
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    return result;
});
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        const error = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = yield user_model_1.default.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        const error = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = yield user_model_1.default.findByIdAndDelete(id);
    return result;
});
const addOrder = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        const error = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = yield user_model_1.default.findById(id);
    const result = user === null || user === void 0 ? void 0 : user.addOrder(orderData);
    return result;
});
const getOrdersForUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        const error = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = yield user_model_1.default.findById(id);
    const orders = user === null || user === void 0 ? void 0 : user.orders;
    return orders;
});
const getTotalPriceForUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!(yield user_model_1.default.isUserExists(id))) {
        const error = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = yield user_model_1.default.findById(id);
    const totalPrice = (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((total, order) => (total += order.price * order.quantity), 0);
    return totalPrice;
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
