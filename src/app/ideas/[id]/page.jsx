
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Calendar, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loader from '@/Component/loading';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function IdeaDetailPage() {
    const params = useParams();
    const id = params?.id;

    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, fetcher);
  console.log(data);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loader></Loader>;
  const idea=(data.data);
  console.log(idea);

  return (
    <div className="min-h-screen bg-base-200 ">
      {/* Navigation */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto w-full px-6">
          <Link href="/ideas" className="btn btn-ghost gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Ideas
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - Image & Main Info */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px] md:h-[500px]">
                <Image
                  src={idea.imageUrl}
                  alt={idea.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-6 right-6">
                  <div className="badge badge-primary badge-lg text-lg font-medium px-5 py-3">
                    {idea.category}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Title & Short Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">{idea.title}</h1>
              <p className="text-xl text-base-content/80 mt-4 leading-relaxed">
                {idea.shortDescription}
              </p>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {idea.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="badge badge-outline badge-lg px-4 py-2 text-sm"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-base-100  rounded-3xl p-8 shadow-xl sticky top-24"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-base-content/60">Estimated Budget</p>
                  <p className="text-3xl font-bold text-primary flex items-center gap-1 mt-1">
                    <DollarSign className="w-6 h-6" />${idea.estimatedBudget}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-base-content/60">Status</p>
                  <div className="badge badge-success badge-lg mt-1">Open for Feedback</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="btn btn-primary btn-lg w-full gap-3">
                  <Heart className="w-5 h-5" /> Upvote Idea
                </button>
                <button className="btn btn-outline btn-lg w-full gap-3">
                  <MessageCircle className="w-5 h-5" /> Start Discussion
                </button>
                <button className="btn btn-ghost btn-lg w-full gap-3">
                  <Share2 className="w-5 h-5" /> Share Idea
                </button>
              </div>

              <div className="h-px bg-base-300  my-8" />

              {/* Meta Info */}
              <div className="space-y-5 text-sm">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-base-content/60" />
                  <div>
                    <p className="font-medium">Target Audience</p>
                    <p className="text-base-content/70">{idea.targetAudience}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-base-content/60" />
                  <div>
                    <p className="font-medium">Posted</p>
                    <p className="text-base-content/70">3 days ago • by Fahim Chowdhury</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full Width Content */}
          <div className="lg:col-span-12 mt-6 space-y-12">
            
            {/* Problem Statement */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-5 flex items-center gap-3">
                <span className="text-red-500">❯</span> The Problem
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100  p-8 rounded-3xl">
                <p>{idea.problemStatement}</p>
              </div>
            </motion.section>

            {/* Proposed Solution */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-5 flex items-center gap-3">
                <span className="text-primary">❯</span> Our Solution
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100  p-8 rounded-3xl">
                <p>{idea.proposedSolution}</p>
              </div>
            </motion.section>

            {/* Detailed Description */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-5">Detailed Description</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed bg-base-100  p-8 rounded-3xl">
                {idea.detailedDescription}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}