import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, username, image } = await req.json();
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const createUser = await prisma.user.create({
      data: {
        email,
        password: hash, // TODO: MAKE SURE TO HASH PASSWORD
        username,
        image,
      },
    });
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "JWT is not defined" },
        { status: 500 }
      );
    }
    const token = jwt.sign({ id: createUser.id }, secret, { expiresIn: "1h" });
    return NextResponse.json({ id: createUser.id, token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating your account" },
      { status: 500 }
    );
  }
}
