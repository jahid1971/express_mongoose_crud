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
    const result = await User.findById(id);
    return result;
};

const updateUser = async (id: string, userData: IUserUpdate): Promise<IUserUpdate | null> => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteUser = async (id: string) => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const result = await User.findByIdAndDelete(id);
    return result;
};

const addOrder = async (id: string, orderData: orderData): Promise<IUser | undefined> => {
    if (!(await User.isUserExists(id))) {
        const error: any = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findById(id);
    const result = user?.addOrder(orderData);

    return result;
};
const getOrdersForUser = async (id: string): Promise<orderData[] | undefined> => {
    if (!(await User.isUserExists(id))) {
        const error:any = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findById(id);
    const orders = user?.orders;
    return orders;
};
const getTotalPriceForUser = async (id: string) => {
    if (!(await User.isUserExists(id))) {
        const error:any = new Error();
        error.Code = 404;
        error.description = "User not found!";
        throw error;
    }
    const user = await User.findById(id);

    const totalPrice = user?.orders?.reduce((total, order) => (total += order.price * order.quantity), 0);
    return totalPrice;
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
