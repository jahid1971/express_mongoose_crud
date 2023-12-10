import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

const creteUser = async (userData: IUser): Promise<IUser> => {
    const result = await User.create(userData);
    return result;
};
const getAllUsers = async (): Promise<IUser[]> => {
    const result = await User.find().select("username fullName age email address");
    return result;
};

export const userServices = {
    creteUser,
    getAllUsers,
};
