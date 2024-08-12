import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "@/utils/db";
import { signUpSchema } from "@/utils/validationSchemas";

/**
 *  @method  POST
 *  @route   ~/api/users/signup
 *  @desc    Create New User [(Sign Up) (Register)]
 *  @access  public
 */

export async function POST(request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const parsedData = signUpSchema.parse(body);

    // Destructure validated data
    const { email, username, password, role } = parsedData;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: "User successfully created", user: { ...newUser } },
      { status: 201 }
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
