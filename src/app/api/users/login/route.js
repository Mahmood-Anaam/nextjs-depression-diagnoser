import { loginSchema } from "@/utils/validationSchemas";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/**
 *  @method  POST
 *  @route   ~/api/users/login
 *  @desc    Login User [(Log In) (Sign In)]
 *  @access  public
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate token and set cookie
    const cookie = setCookie({
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    });

    return NextResponse.json(
      { message: "Login successful" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
