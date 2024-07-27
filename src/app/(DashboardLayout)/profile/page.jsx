import { cookies } from 'next/headers';
import prisma from '@/utils/db';
import { verifyTokenForPage } from '@/utils/verifyToken';
import ProfileClient from './ProfileClient';

async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get('jwtToken')?.value;
  const userPayload = verifyTokenForPage(token);

  if (!userPayload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userPayload.id },
    select: {
      id: true,
      email: true,
      username: true,
      profile: {
        select: {
          avatar: true,
        },
      },
    },
  });

  return user;
}

export default async function ProfilePage() {
  const user = await getUserData();

  return (
    <div>
      {user ? (
        <ProfileClient user={user} />
      ) : (
        <p>You need to be logged in to view this page.</p>
      )}
    </div>
  );
}
