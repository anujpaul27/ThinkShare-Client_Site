"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageCircle,
  Calendar,
  DollarSign,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loader from "@/Component/loading";
import useSWR from "swr";
import { authClient } from "@/lib/auth-client";
import { format } from "date-fns";
import { toast } from "sonner";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function IdeaDetailPage() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);

  const params = useParams();
  const id = params?.id;

  // Get user id from the session
  const { data: session, isPending } = authClient.useSession();
  const userID = session?.user?.id;
  const imageURL = session?.user?.image;
  const userName = session?.user?.name;

  // fetch all comment
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data));
  }, []);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setLoadingComment(true);

    // Time convert format
    const timestamp = Date.now();
    const currentDataWithFormat = format(new Date(timestamp), "d MMMM yyyy");

    const comment = {
      userID,
      postID: id,
      name: userName,
      imageURL,
      time: currentDataWithFormat,
      text: newComment,
    };

    // call api save to the DB
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comment`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(comment),
      },
    );

    if (response.ok) {
      toast.success("Comment Added Successful.");
    }

    setComments([comment, ...comments]);
    setNewComment("");
    setLoadingComment(false);
  };

  const handleDelete = async (commentId)=> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment-delete/${commentId}`, {
      method: 'DELETE'
    })
    console.log(response);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data));

  }

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`,
    fetcher,
  );

  if (error) return <div>Failed to load for {error}</div>;
  if (isLoading) return <Loader></Loader>;
  const idea = data.data;

  return (
    <div className="min-h-screen bg-base-200 dark:bg-neutral-950 pb-16">
      {/* Top Navigation */}
      <nav className="bg-base-100 dark:bg-neutral-900 border-b border-base-300 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/ideas" className="btn btn-ghost gap-2 text-base">
            <ArrowLeft className="w-5 h-5" /> Back to Ideas
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-10">
        {/* Hero Image + Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative rounded-3xl overflow-hidden h-[380px] md:h-[520px] mb-10 shadow-2xl"
        >
          <Image
            src={idea?.imageUrl}
            alt={idea.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />


          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
            <div className="badge badge-primary badge-lg mb-4">
              {idea.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {idea.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl opacity-90">
              {idea.shortDescription}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="font-medium">${idea.estimatedBudget} USD</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Posted 3 days ago</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>by Fahim Chowdhury</span>
              </div>
            </div>

            {/* Problem Statement */}
            <section>
              <h2 className="text-3xl font-bold mb-5 text-red-500">
                The Problem
              </h2>
              <div className="bg-base-100 dark:bg-neutral-900 p-8 rounded-3xl leading-relaxed text-lg">
                {idea.problemStatement}
              </div>
            </section>

            {/* Proposed Solution */}
            <section>
              <h2 className="text-3xl font-bold mb-5 text-primary">
                Proposed Solution
              </h2>
              <div className="bg-base-100 dark:bg-neutral-900 p-8 rounded-3xl leading-relaxed text-lg">
                {idea.proposedSolution}
              </div>
            </section>

            {/* Detailed Description */}
            <section>
              <h2 className="text-3xl font-bold mb-5">Detailed Description</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100 dark:bg-neutral-900 p-8 rounded-3xl">
                {idea.detailedDescription}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-base-100 dark:bg-neutral-900 p-8 rounded-3xl sticky top-24 shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Target Audience</h3>
              <p className="text-base-content/70 leading-relaxed">
                {idea.targetAudience}
              </p>

              <div className="h-px bg-base-300 dark:bg-neutral-700 my-8" />

              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, i) => (
                  <div key={i} className="badge badge-neutral badge-outline">
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold">Community Discussion</h2>
            <div className="text-sm text-base-content/60 mt-1">
              ({comments.length} comments)
            </div>
          </div>

          {/* Comment Input */}
          <div className="bg-base-100 dark:bg-neutral-900 p-6 rounded-3xl mb-10">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts, questions, or suggestions..."
              className="textarea textarea-bordered w-full h-28 resize-y min-h-[100px]"
            />
            <button
              onClick={handlePostComment}
              className="btn btn-primary mt-4"
              type="submit"
              disabled={loadingComment}
            >
              {loadingComment ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Post Comment"
              )}
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-base-100 dark:bg-neutral-900 p-6 rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src={comment?.imageURL || "/default-avatar.png"}
                      alt={`${comment?.name}'s avatar`}
                      fill
                      sizes="40px" //Tells Next.js exactly how large the image will render for performance optimization
                      loading="lazy"
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-medium">{comment.name}</div>
                    <div className="text-xs text-base-content/50">
                      {comment.time}
                    </div>
                  </div>
                  {comment.userID === userID && (
                    <div className="dropdown dropdown-hover">
                      <div
                        tabIndex="0"
                        role="button"
                        className="btn lg:btn-sm btn-xs m-1"
                      >
                        ...
                      </div>
                      <ul
                        tabIndex="0"
                        className="dropdown-content menu bg-base-100 rounded-box  p-2 shadow text-xs"
                      >
                        <li>
                          <Link href={`/update/${comment._id}`}>update</Link>
                        </li>
                        <li>
                          <a onClick={()=> handleDelete(comment._id)} >Delete</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <p className="mt-5 text-base-content/80 leading-relaxed">
                  {comment.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
