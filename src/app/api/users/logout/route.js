import {NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 *  @method  GET
 *  @route   ~/api/users/logout
 *  @desc    Logout User
 *  @access  public
 */
export function GET(request) {
    try {
        cookies().delete("jwtToken");
        return NextResponse.json({ message: 'logout' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `internal server error:(${error.message})` },
            { status: 500 }
        )
    }
}