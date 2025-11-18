// app/api/collection/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

const dataFilePath = path.join(process.cwd(), "data", "collection.json");

const REQUIRED_COOKIE_NAME = "collection_auth";
const REQUIRED_COOKIE_VALUE = process.env.ACCESS_KEY;

async function ensureDataDirectory() {
  const dir = path.dirname(dataFilePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(REQUIRED_COOKIE_NAME);

  return authCookie?.value === REQUIRED_COOKIE_VALUE;
}

export async function GET(request: NextRequest) {
  try {
    await ensureDataDirectory();
    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json(
        { message: "No collection data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to read collection data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(
      { error: "Unauthorized - Valid authentication cookie required" },
      { status: 401 }
    );
  }

  try {
    await ensureDataDirectory();
    const newData = await request.json();

    await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), "utf-8");

    return NextResponse.json(
      { message: "Collection data created successfully", data: newData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create collection data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(
      { error: "Unauthorized - Valid authentication cookie required" },
      { status: 401 }
    );
  }

  try {
    await ensureDataDirectory();
    const updatedData = await request.json();

    await fs.writeFile(
      dataFilePath,
      JSON.stringify(updatedData, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      { message: "Collection data updated successfully", data: updatedData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update collection data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(
      { error: "Unauthorized - Valid authentication cookie required" },
      { status: 401 }
    );
  }

  try {
    await ensureDataDirectory();
    await fs.unlink(dataFilePath);

    return NextResponse.json(
      { message: "Collection data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json(
        { message: "Collection data already deleted or does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete collection data" },
      { status: 500 }
    );
  }
}
