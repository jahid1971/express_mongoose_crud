import { IUser, IUserUpdate, orderData } from "../interfaces/user.interface";
import User from "../models/user.model";

const creteUser = async (userData: IUser): Promise<IUser> => {
    const result = await User.create(userData);
    return result;
};
const getAllUsers = async (): Promise<IUser[]> => {
    const result = await User.find().select("username fullName age email address");
    return result;
};

const getSingleUser = async (userId: number): Promise<IUser | null> => {
    if (!(await User.isUserExists(userId))) {  // confused here
        const error: any = new Error();
        console.log(error, "error in service to get user");
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findOne({ userId }).select("-password -orders");
    return result;
};

const updateUser = async (userId: number, userData: IUserUpdate): Promise<IUserUpdate | null> => {
    if (!(await User.isUserExists(userId))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findOneAndUpdate({userId}, userData, {
        new: true,
        runValidators: true,
    }).select("-password -orders");
    return result;
};

const deleteUser = async (userId: number) => {
    if (!(await User.isUserExists(userId))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findOneAndDelete({userId});
    return result;
};

const addOrder = async (userId: number, orderData: orderData): Promise<IUser | undefined> => {
    if (!(await User.isUserExists(userId))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findOne({userId});
    const result = user?.addOrder(orderData);

    return result;
};
const getOrdersForUser = async (userId: number): Promise<orderData[] | undefined> => {
    if (!(await User.isUserExists(userId))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findOne({userId});
    const orders = user?.orders;
    return orders;
};
const getTotalPriceForUser = async (userId: number) => {
    if (!(await User.isUserExists(userId))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findOne({userId});

    let totalPrice = user?.orders?.reduce((total, order) => (total += order.price * order.quantity), 0);
    const roundedTotalPrice = Number(totalPrice).toFixed(2);
    return roundedTotalPrice;
};

export const userServices = {
    creteUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getOrdersForUser,
    getTotalPriceForUser,
};
