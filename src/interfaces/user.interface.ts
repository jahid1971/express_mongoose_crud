import { Model } from "mongoose";

type orderData = { productName: string; price: number; quantity: number };
type TfullName = {
    firstName: string;
    lastName: string;
};
type Taddress = {
    street: string;
    city: string;
    country: string;
};
interface IUser {
    userId: number;
    username: string;
    fullName: TfullName;
    password: string;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: Taddress;
    orders?: orderData[];
}
interface IUserUpdate {
    userId?: number;
    username?: string;
    password?: string;
    fullName?: TfullName;
    age?: number;
    email?: string;
    isActive?: boolean;
    hobbies?: string[];
    address?: Taddress;
    orders?: orderData[];
}

interface IUserMethods {
    addOrder(orderData: orderData): Promise<IUser>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
    isUserExists(id: number): Promise<IUser | null>;
}


export { IUser, UserModel, orderData, IUserUpdate };
