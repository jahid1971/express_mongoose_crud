import { Schema, model } from "mongoose";
import { IUser, UserModel, orderData } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser, UserModel>(
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

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        //using arrow function to use 'this' as document
        this.password = hash;
        next();
    });
});

// userSchema.virtual("totalPrice").get(function (this: IUser & Document) {
//     const totalPrice = this.orders.reduce((total, order) => (total += order.price * order.quantity), 0);
//     return totalPrice;
// });

userSchema.statics.isUserExists = async function (id) {
    const existingUser = await User.findById(id);
    return existingUser ? true : false;
};

userSchema.methods.addOrder = async function (orderData: orderData) {
    if (!this.orders) this.orders = [];
    await this.updateOne({ $push: { orders: orderData } });
};

const User = model<IUser, UserModel>("User", userSchema);
export default User;
