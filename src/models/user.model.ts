import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
    {
        userId: { type: Number, required: true },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: { type: String, required: true, select: false },
        fullName: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },

        age: { type: Number, required: true },
        email: { type: String, required: true },
        isActive: { type: Boolean, required: true },
        hobbies: { type: [String], required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
        },
        orders: [
            {
                productName: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.post('save', function () {
    delete this.password;
});


const User = model<IUser>("User", userSchema);
export default User;
