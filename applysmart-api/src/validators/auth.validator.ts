import {z} from "zod";

const name = z.string().min(1, "Name is required");
const email = z.string().email().trim().toLowerCase();
const password = z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters");
const refreshToken = z.string().min(1)


export const signUpSchema = z.object({
    name,
    email,
    password,
})

export const loginSchema= z.object({
    email,
    password
})

export const refreshSchema = z.object({
    refreshToken
})
