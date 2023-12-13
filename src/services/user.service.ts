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
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true,
    }).select("-password -orders");
    return result;
};

const deleteUser = async (id: string) => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findByIdAndDelete(id);
    return result;
};

const addOrder = async (id: string, orderData: orderData): Promise<IUser | undefined> => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findById(id);
    const result = user?.addOrder(orderData);

    return result;
};
const getOrdersForUser = async (id: string): Promise<orderData[] | undefined> => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findById(id);
    const orders = user?.orders;
    return orders;
};
const getTotalPriceForUser = async (id: string) => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        error.code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findById(id);

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
