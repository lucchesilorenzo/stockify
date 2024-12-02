import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

import { getProductById } from "@/lib/queries/product-queries";
import {
  productIdSchema,
  productImageSchema,
} from "@/lib/validations/product-validations";

type ImageUpload = {
  params: {
    productId: unknown;
  };
};

export async function POST(req: NextRequest, { params }: ImageUpload) {
  try {
    // Validate product ID
    const validatedProductId = productIdSchema.safeParse(params.productId);
    if (!validatedProductId.success) {
      return NextResponse.json(
        { message: "Invalid product ID." },
        { status: 400 },
      );
    }

    // Validate formData (image)
    const validatedImage = productImageSchema.safeParse(
      Object.fromEntries(await req.formData()),
    );
    if (!validatedImage.success) {
      return NextResponse.json({ message: "Invalid image." }, { status: 400 });
    }

    // Destructure data
    const { image: file } = validatedImage.data;

    // Delete previous file if it exists
    const product = await getProductById(validatedProductId.data);
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
