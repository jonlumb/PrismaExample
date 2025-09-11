import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { postSchema } from '@/lib/schemas';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate again on server side (important for security)
    const result = postSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { errors: z.flattenError(result.error).fieldErrors },
        { status: 400 }
      );
    }

    await prisma.post.create({
      data: {
        ...result.data,
        authorId: 1,
      },
    });

    revalidatePath("/posts");
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}