import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import bcrypt from "bcryptjs";
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
    return NextResponse.json({ message: error.message }, { status: 500 });
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
        profile: {
          select: {
            avatar: true,
          },
        },
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
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
    const userPayload = verifyToken(request);
    if (!userPayload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.id);

    if (userPayload.id !== userId) {
      return NextResponse.json(
        { message: "Forbidden: You can only update your own account" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const validationResult = updateUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, username, password, avatar } = validationResult.data;

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    const updateData = {
      email,
      username,
      ...(password && { password: await bcrypt.hash(password, 10) }),
    };

    if (existingProfile) {
      updateData.profile = {
        update: { avatar },
      };
    } else if (avatar) {
      updateData.profile = {
        create: { avatar },
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        profile: {
          select: {
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
