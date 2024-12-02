import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

import { getProductById } from "@/lib/queries/product-queries";
import { productUploadImageSchema } from "@/lib/validations/product-validations";

export async function POST(req: Request) {
  try {
    // Validation
    const validatedData = productUploadImageSchema.safeParse(
      Object.fromEntries(await req.formData()),
    );

    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Invalid form data." },
        { status: 400 },
      );
    }

    // Destructure data
    const { image: file, productId } = validatedData.data;

    // Delete previous file if it exists
    const product = await getProductById(productId);
    if (product && product.image && product.image !== "/placeholder.svg") {
      const filePath = path.join(process.cwd(), "public", product.image);
      await fs.rm(filePath, { force: true });
    }

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate random file name
    const randomFileName = randomUUID() + path.extname(file.name);

    // Write file to disk
    const filePath = path.join(uploadsDir, randomFileName);
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Return file path
    return NextResponse.json({ filePath: `/uploads/${randomFileName}` });
  } catch {
    return NextResponse.json(
      { message: "Failed to upload file." },
      { status: 500 },
    );
  }
}
