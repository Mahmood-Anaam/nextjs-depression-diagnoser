import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "@/utils/db";
import { forgotSchema } from "@/utils/validationSchemas";
import { sendEmail } from "@/utils/sendEmail";
import { APP_NAME } from "@/utils/constants";

/**
 *  @method  POST
 *  @route   ~/api/users/forgot
 *  @desc    Forgot Password
 *  @access  public
 */

export async function POST(request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const parsedData = forgotSchema.parse(body);

    // Destructure validated data
    const { email } = parsedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 }
      );
    }

    // Generate a random password
    const newPassword = Math.random().toString(36).slice(-8);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Send the new password to the user's email
    const emailContent = `
      <h3>Password Reset Request</h3>
      <p>Dear ${user.username},</p>
      <p>We received a request to reset your password for your ${APP_NAME} account. Here is your new password:</p>
      <p><strong>${newPassword}</strong></p>
      <p>Please make sure to change this password once you log in to keep your account secure.</p>
      <p>Thank you for using ${APP_NAME}!</p>
    `;

    await sendEmail(email, "Password Reset - Your New Password", emailContent);

    return NextResponse.json(
      { message: "New password has been sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { message: `internal server error:(${error.message})` },
      { status: 500 }
    );
  }
}
