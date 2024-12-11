import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, username, image } = await req.json();

    // Check if required fields are provided
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Hash password asynchronously
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // Create user in the database
    const createUser = await prisma.user.create({
      data: {
        email,
        password: hash, // Hashed password
        username,
        image,
      },
    });

    // Ensure JWT_SECRET is defined
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "JWT is not defined" },
        { status: 500 }
      );
    }

    // Create JWT token
    const token = jwt.sign({ id: createUser.id }, secret, { expiresIn: "1h" });

    // Return response with user ID and token
    return NextResponse.json({ id: createUser.id, token }, { status: 200 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "An error occurred while creating your account" },
      { status: 500 }
    );
  }
}
