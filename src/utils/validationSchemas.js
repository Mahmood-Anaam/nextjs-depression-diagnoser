import { z } from "zod";

// SignUp Schema
export const signUpSchema = z
  .object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "Invalid email address" }),
    username: z
      .string({ required_error: "username is required" })
      .min(3, { message: "Username must be at least 3 characters long" }),
    password: z
      .string({ required_error: "password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      }),
    role: z.enum(["ADMIN", "USER", "MODERATOR", "GUEST"], {
      message: "Invalid role [ADMIN, USER, MODERATOR, GUEST]",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// SignIn Schema
export const signInSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Forgot Schema
export const forgotSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
});

// Update User Profile Schema
export const updateUserProfileSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .optional(),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

// Diagnosis Schema
export const diagnosisSchema = z.object({
  status: z.enum(
    [
      "NO_DEPRESSION",
      "MILD_DEPRESSION",
      "MODERATE_DEPRESSION",
      "SEVERE_DEPRESSION",
    ],
    {
      message: "Invalid diagnosis status",
    }
  ),
});
