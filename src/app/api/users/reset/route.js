import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/sendEmail";
import {resetSchema } from "@/utils/validationSchemas";
import {APP_NAME} from '@/utils/constants';



/**
 *  @method  POST
 *  @route   ~/api/users/reset
 *  @desc    Forgot Password - Reset and send new password via email
 *  @access  public
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = resetSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

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
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
