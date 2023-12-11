import { z } from "zod";

const userCreateValidationSchema = z.object({
    userId: z.number(),
    username: z.string().min(1),
    password: z.string().min(1),
    fullName: z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
    }),
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: z.object({
        street: z.string().min(1),
        city: z.string().min(1),
        country: z.string().min(1),
    }),
    orders: z
        .array(
            z.object({
                productName: z.string().min(1),
                price: z.number(),
                quantity: z.number(),
            })
        )
        .optional(),
});

const userUpdateValidationSchema = z.object({
    userId: z.number().optional(),
    username: z.string().min(1).optional(),
    password: z.string().min(1).optional(),
    fullName: z
        .object({
            firstName: z.string().min(1).optional(),
            lastName: z.string().min(1).optional(),
        })
        .optional(),
    age: z.number().optional(),
    email: z.string().email().optional(),
    isActive: z.boolean().optional(),
    hobbies: z.array(z.string()).optional(),
    address: z
        .object({
            street: z.string().min(1).optional(),
            city: z.string().min(1).optional(),
            country: z.string().min(1).optional(),
        })
        .optional(),
    orders: z
        .array(
            z.object({
                productName: z.string().min(1).optional(),
                price: z.number().optional(),
                quantity: z.number().optional(),
            })
        )
        .optional(),
});

export { userCreateValidationSchema, userUpdateValidationSchema };
