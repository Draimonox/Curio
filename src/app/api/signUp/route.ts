import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, username, bio, image } = await req.json();
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        email,
        password, // TODO: MAKE SURE TO HASH PASSWORD
        username,
        bio,
        image,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating your account" },
      { status: 500 }
    );
  }
}
