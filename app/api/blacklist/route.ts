import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "blacklist.json");

async function ensureDataDirectory() {
  const dir = path.dirname(dataFilePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readData(): Promise<string[]> {
  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(file);
  } catch (err: any) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// GET – return array of nicknames
export async function GET() {
  try {
    await ensureDataDirectory();
    const names = await readData();
    console.log(names);
    // Always return array
    if (!Array.isArray(names)) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(names, { status: 200 });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

// POST – add new nickname
export async function POST(request: NextRequest) {
  try {
    await ensureDataDirectory();

    const body = await request.json();
    const nickname: string = body?.nickname;

    if (!nickname || typeof nickname !== "string") {
      return NextResponse.json(
        { error: "Nickname is required" },
        { status: 400 }
      );
    }

    const names = await readData();

    // Case-insensitive uniqueness check
    const exists = names.some(
      (n) => n.toLowerCase() === nickname.toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        { error: "Nickname already exists" },
        { status: 409 }
      );
    }

    const updated = [...names, nickname];

    await fs.writeFile(dataFilePath, JSON.stringify(updated, null, 2), "utf8");

    return NextResponse.json(updated, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save nickname" },
      { status: 500 }
    );
  }
}
