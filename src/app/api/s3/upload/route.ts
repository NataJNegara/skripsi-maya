import { NextResponse } from "next/server";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3Client";

// zod validation schema to make sure user upload a valid file
const uploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = uploadRequestSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "invalid request body" },
        { status: 400 }
      );
    }

    const { fileName, contentType, size } = validatedData.data;
    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 minute
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("Error generating presigned URL: ", err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
