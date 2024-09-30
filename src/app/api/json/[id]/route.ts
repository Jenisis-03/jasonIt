import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;

  try {
    const json = await prisma.jsonData.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });

    if (!json) {
      return NextResponse.json({ error: "JSON data not found." }, { status: 404 });
    }

    return NextResponse.json(json);
  } catch (error) {
    console.error("Error Fetching JSON Data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch JSON data." },
      { status: 500 }
    );
  }
}
