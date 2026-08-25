import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Please fill in all required fields (Name, Email, Password).' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email address already exists.' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        passwordHash: hashPassword(password),
        role: 'USER',
      },
    });

    // Create Subscription record
    await prisma.subscription.create({
      data: {
        userId: newUser.id,
        plan: 'FREE',
        status: 'ACTIVE',
      },
    });

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
    });

    response.cookies.set('pakgrowth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to create account. Please try again.' }, { status: 500 });
  }
}
