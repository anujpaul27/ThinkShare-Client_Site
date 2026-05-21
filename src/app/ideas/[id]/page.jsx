'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Calendar, DollarSign, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loader from '@/Component/loading';
import useSWR from "swr";
import { authClient } from '@/lib/auth-client';


const mockComments = [
  {
    id: 1,
    name: "Nadia Islam",
    avatar: "https://i.pravatar.cc/150?img=32",
    time: "2h ago",
    text: "This is brilliant! Have you considered integrating weather data to predict which areas degrade faster?",
    likes: 12,
  },
  {
    id: 2,
    name: "Tanvir Rahman",
    avatar: "https://i.pravatar.cc/150?img=45",
    time: "5h ago",
    text: "Great concept. What kind of accuracy are you getting with the current model?",
    likes: 8,
  },
];

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function IdeaDetailPage() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const params = useParams();
  const id = params?.id;

  // Get user id from the session
  const { data: session, isPending } = authClient.useSession();
  const userID = session?.user?.id;
  const userImage = session?.user?.ImageURL;
  const userName = session

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      name: "You",
      avatar: "https://i.pravatar.cc/150?img=64",
      time: Date.now(),
      text: newComment,
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  }; 
  
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
            src={idea.imageUrl}
            alt={idea.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
            <div className="badge badge-primary badge-lg mb-4">{idea.category}</div>
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
              <h2 className="text-3xl font-bold mb-5 text-red-500">The Problem</h2>
              <div className="bg-base-100 dark:bg-neutral-900 p-8 rounded-3xl leading-relaxed text-lg">
                {idea.problemStatement}
              </div>
            </section>

            {/* Proposed Solution */}
            <section>
              <h2 className="text-3xl font-bold mb-5 text-primary">Proposed Solution</h2>
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
            <div className="text-sm text-base-content/60 mt-1">({comments.length} comments)</div>
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
            >
              Post Comment
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-base-100 dark:bg-neutral-900 p-6 rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={comment.avatar}
                    alt={comment.name}
                    loading='lazy'
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{comment.name}</div>
                    <div className="text-xs text-base-content/50">{comment.time}</div>
                  </div>
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