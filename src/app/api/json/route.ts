import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth(); // Await the auth function
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, content } = await request.json();

  try {
    const json = await prisma.jsonData.create({
      data: {
        userId,
        name,
        content,
      },
    });

    return NextResponse.json(json);
  } catch (error) {
    console.error("Error Saving JSON: ", error);
    return NextResponse.json({ error: "Failed to save JSON" }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth(); // Await the auth function
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await prisma.jsonData.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(json);
  } catch (error) {
    console.error("Error Fetching JSON List: ", error);
    return NextResponse.json({ error: "Failed to fetch JSON list" }, { status: 500 });
  }
}
