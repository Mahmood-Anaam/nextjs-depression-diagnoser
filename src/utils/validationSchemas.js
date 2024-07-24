import { z } from "zod";

// Register Schema
export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 character long" })
    .max(50, { message: "Username must be at most 50 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
  role: z.enum(["ADMIN", "DOCTOR", "USER"]).optional(),
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
});

// Update Forgot-Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// Update User Profile Schema
export const updateUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 character long" })
    .max(50, { message: "Username must be at most 50 characters long" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" })
    .optional(),
  avatar: z.string().optional(),
});
