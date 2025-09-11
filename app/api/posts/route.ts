import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { postSchema } from '@/lib/schemas';


export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const result = postSchema.safeParse(formData);
    
    if (!result.success) {
      return NextResponse.json(
        { errors: z.flattenError(result.error).fieldErrors },
        { status: 400 }
      );
    }

    const title = result.data.title;
    const content = result.data.content;

    await prisma.post.create({
      data: {
        title,
        content,
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