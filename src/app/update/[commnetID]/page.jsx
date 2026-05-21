"use client";
import { Button, Card, Form, Surface, TextArea } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateComment = () => {
  const [comment, setCommentText] = useState("");
  const [isSubmitting, setIsSubmiting] = useState(false);
  const router = useRouter()

  const params = useParams();
  const id = params.commnetID;

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`)
    .then(res=> res.json())
    .then (data=> setCommentText(data.data[0].text))
  },[])

  const handleFormSubmit =async (e) => {
    e.preventDefault();

    let newComment ={};
    newComment.text= (e.target.commnet.value);

    const response = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })

  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 shadow-md border border-default-100">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Edit Comment
          </h1>
        </div>

        {/* HeroUI Form wrapper validation layer */}
        <Form
          validationBehavior="native"
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <Surface className="w-full rounded-3xl p-6">
            <TextArea
              className="w-full min-w-[280px]"
              placeholder="Describe your product"
              variant="secondary"
              required
              name="commnet"
              defaultValue={comment}
            />
          </Surface>

          <div className="flex items-center justify-end gap-3 w-full pt-2">
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Update Comment
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateComment;
