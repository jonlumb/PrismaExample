'use client'

import Form from "next/form";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { postSchema } from '@/lib/schemas';


export default function NewPost() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function createPost(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    const result = postSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        router.push('/posts');
      } else {
        setErrors({ general: ['Failed to create post'] });
      }
    } catch (error) {
      setErrors({ general: ['Network error'] });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Form action={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={isSubmitting}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content[0]}</p>
          )}
        </div>
        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general[0]}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </Form>
    </div>
  );
}