import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 },
      );
    }

    // Read the file into memory
    const buffer = await file.arrayBuffer();

    // Create the uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Write the file to disk
    const filePath = path.join(uploadsDir, file.name);
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Return the file path
    return NextResponse.json({ filePath: `/uploads/${file.name}` });
  } catch {
    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 },
    );
  }
}
