'use client';

import { Button, Card, Form, Surface, TextArea } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CommentData {
  text: string;
  // Add other fields if needed
}

const UpdateComment = () => {
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const params = useParams();
  const commentId = params.commnetID as string; // Fixed typo in param name if needed

  // Fetch existing comment
  useEffect(() => {
    const fetchComment = async () => {
      if (!commentId) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`);
        
        if (!res.ok) throw new Error("Failed to fetch comment");

        const data = await res.json();
        setComment(data.data?.[0]?.text || "");
      } catch (error) {
        console.error("Error fetching comment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [commentId]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentId) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const newComment = {
        text: formData.get("comment") as string,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      const result = await response.json();

      if (response.ok) {
        // toast.success("Comment updated successfully!"); // Uncomment if using toast
        router.push(`/ideas/${result?.ideaId || ''}`); // Adjust redirect as needed
      } else {
        alert(result.message || "Failed to update comment");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-96">Loading comment...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 shadow-md border border-default-100">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Edit Comment
          </h1>
        </div>

        <Form
          validationBehavior="native"
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <Surface className="w-full rounded-3xl p-6">
            <TextArea
              className="w-full min-w-[280px]"
              placeholder="Write your comment here..."
              variant="secondary"
              required
              name="comment"           // Fixed name (was "commnet")
              defaultValue={comment}
            />
          </Surface>

          <div className="flex items-center justify-end gap-3 w-full pt-2">
            <Button 
              type="button" 
              onPress={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
            >
              Update Comment
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateComment;