import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { z } from "zod";
import { verifyToken } from "@/utils/verifyToken";
import bcrypt from "bcrypt";
import { updateUserSchema } from "@/utils/validationSchemas";
import { cookies } from "next/headers";

/**
 *  @method  DELETE
 *  @route   ~/api/users/profile/:id
 *  @desc    Delete Profile
 *  @access  private (only user himself can delete his account)
 */
export async function DELETE(request, { params }) {
  const userPayload = verifyToken(request);

  if (!userPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(params.id);

  if (userPayload.id !== userId) {
    return NextResponse.json(
      { message: "Forbidden: You can only delete your own account" },
      { status: 403 }
    );
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    cookies().delete("jwtToken");
    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error:(${error.message})` },
      { status: 500 }
    );
  }
}

/**
 *  @method  GET
 *  @route   ~/api/users/profile/:id
 *  @desc    Get Profile By Id
 *  @access  private (only user himself can get his account/profile)
 */
export async function GET(request, { params }) {
  try {
    const userPayload = verifyToken(request);
    if (!userPayload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.id);

    if (userPayload.id !== userId) {
      return NextResponse.json(
        { message: "Forbidden: You can only access your own account" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },

      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatar: true,
      },
    });
    return NextResponse.json(
      { message: "Profile obtained successfully", profile: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error:(${error.message})` },
      { status: 500 }
    );
  }
}

/**
 *  @method  PUT
 *  @route   ~/api/users/profile/:id
 *  @desc    Update Profile
 *  @access  private (only user himself can update his account/profile)
 */
export async function PUT(request, { params }) {
  try {
    const userId = parseInt(params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsedData = updateUserSchema.parse(body);

    // Destructure validated data
    const { email, username, password, avatar } = parsedData;

    const updateData = {
      email,
      username,
      ...(password && { password: await bcrypt.hash(password, 10) }),
      avatar,
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatar: true,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
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
