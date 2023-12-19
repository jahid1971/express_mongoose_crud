"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDataValidationSchema = exports.userUpdateValidationSchema = exports.userCreateValidationSchema = void 0;
const zod_1 = require("zod");
const userCreateValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().min(1),
        lastName: zod_1.z.string().min(1),
    }),
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z.object({
        street: zod_1.z.string().min(1),
        city: zod_1.z.string().min(1),
        country: zod_1.z.string().min(1),
    }),
    orders: zod_1.z
        .array(zod_1.z.object({
        productName: zod_1.z.string().min(1),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
    }))
        .optional(),
});
exports.userCreateValidationSchema = userCreateValidationSchema;
const userUpdateValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().optional(),
    username: zod_1.z.string().min(1).optional(),
    password: zod_1.z.string().min(1).optional(),
    fullName: zod_1.z
        .object({
        firstName: zod_1.z.string().min(1).optional(),
        lastName: zod_1.z.string().min(1).optional(),
    })
        .optional(),
    age: zod_1.z.number().optional(),
    email: zod_1.z.string().email().optional(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: zod_1.z
        .object({
        street: zod_1.z.string().min(1).optional(),
        city: zod_1.z.string().min(1).optional(),
        country: zod_1.z.string().min(1).optional(),
    })
        .optional(),
    orders: zod_1.z
        .array(zod_1.z.object({
        productName: zod_1.z.string().min(1).optional(),
        price: zod_1.z.number().optional(),
        quantity: zod_1.z.number().optional(),
    }))
        .optional(),
});
exports.userUpdateValidationSchema = userUpdateValidationSchema;
const orderDataValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.orderDataValidationSchema = orderDataValidationSchema;
