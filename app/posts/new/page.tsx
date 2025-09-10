"use client";

import { useState } from "react";
import { z } from "zod";
import { postSchema } from "@/schema/post";

export default function NewPost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") || "");
    const content = String(formData.get("content") || "");

    const result = postSchema.safeParse({ title, content });
    if (!result.success) {
      const { formErrors, fieldErrors } = z.flattenError(result.error);
      const messages = [
        ...formErrors,
        ...(fieldErrors.title ?? []),
        ...(fieldErrors.content ?? []),
      ];
      setModalMessage(messages.join("\n") || "Please fix the errors below");
      setModalOpen(true);
      return;
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={onSubmit} className="space-y-6">
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
          />
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
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {modalOpen ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-3">Validation Error</h2>
            <pre className="whitespace-pre-wrap text-red-700 text-sm mb-4">{modalMessage}</pre>
            <div className="text-right">
              <button
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
