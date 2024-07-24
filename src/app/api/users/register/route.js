import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { registerSchema } from "@/utils/validationSchemas";
import { NextResponse } from "next/server";

/**
 *  @method  POST
 *  @route   ~/api/users/register
 *  @desc    Create New User [(Register) (Sign Up)]
 *  @access  public
 */

export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, username, password, role } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: role || "USER", // Default role is USER
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
