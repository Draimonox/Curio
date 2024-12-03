import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://opentdb.com/api.php?amount=50&category=9");
    const data = await res.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching multiple choice (general)" },
      { status: 500 }
    );
  }
}
