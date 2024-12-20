import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || password) {
      return NextResponse.json(
        { error: "Please fill missing inputs" },
        { status: 400 }
      );
    }
    const lowerCaseUsername = username.toLowerCase();
    const getUser = await prisma.user.findUnique({
      where: {
        username: lowerCaseUsername,
      },
    });

    console.log("Found user:", getUser);

    if (!getUser) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }

    const comparePasswords = bcrypt.compare(password, getUser.password);

    if (!comparePasswords) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "JWT is not defined" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ id: getUser.id }, secret, { expiresIn: "1h" });
    return NextResponse.json({ getUser, token }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
