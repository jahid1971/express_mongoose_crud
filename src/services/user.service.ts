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

<<<<<<< HEAD
const getSingleUser = async (userId: number): Promise<IUser | null> => {
    if (!(await User.isUserExists(userId))) {  // confused here
        const error: any = new Error();
        console.log(error, "error in service to get user");
=======
const getSingleUser = async (id: string): Promise<IUser | null> => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        console.log(error,'error in service to get usesr');
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findById(id).select("-password -orders");
    return result;
};

const updateUser = async (id: string, userData: IUserUpdate): Promise<IUserUpdate | null> => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8
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
<<<<<<< HEAD
const getOrdersForUser = async (userId: number): Promise<orderData[] | undefined> => {
    if (!(await User.isUserExists(userId))) {
=======
const getOrdersForUser = async (id: string): Promise<orderData[] | undefined> => {
    if (!(await User.isUserExists(id))) {
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findOne({userId});
    const orders = user?.orders;
    return orders;
};
<<<<<<< HEAD
const getTotalPriceForUser = async (userId: number) => {
    if (!(await User.isUserExists(userId))) {
=======
const getTotalPriceForUser = async (id: string) => {
    if (!(await User.isUserExists(id))) {
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8
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
