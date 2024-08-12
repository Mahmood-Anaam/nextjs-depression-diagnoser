import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "@/utils/db";
import { setCookie } from "@/utils/generateToken";
import { signInSchema } from "@/utils/validationSchemas";

/**
 *  @method  POST
 *  @route   ~/api/users/signin
 *  @desc    Sign In User [(Sign In) (LogIn)]
 *  @access  public
 */

export async function POST(request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const parsedData = signInSchema.parse(body);

    // Destructure validated data
    const { email, password } = parsedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const cookie = setCookie({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      { message: "Authenticated" },
      {
        status: 200,
        headers: { "Set-Cookie": cookie },
      }
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
