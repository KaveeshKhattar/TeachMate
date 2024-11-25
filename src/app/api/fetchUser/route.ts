import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: { params: { clerkUserId: string } }) {
  const { clerkUserId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUserId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}