"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, Plus, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import Loader from "@/Component/loading";
import { authClient } from "@/lib/auth-client";

const fetcher = (url:any) => fetch(url).then((res) => res.json());

// Type Interface
interface UserSession {
  user?: {
    id: string;
  };
}

export default function MyIdeasPage() {
  const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null);  

  // Get session
  const { data: session, isPending } = authClient.useSession() as {
    data: UserSession | null;
    isPending: boolean;
  };

  const id = session?.user?.id;

  // fetch ideas
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${id}` : null,
    fetcher,
  );

  // delete idea
  const handleDelete = async (ideaId:string) => {
    try {
      // example delete api
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea-delete/${ideaId}`,
        {
          method: "DELETE",
        },
      );

      mutate();
      setIdeaToDelete(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loader />;
  if (isPending) return <Loader />;

  const ideas = data?.data || [];

  return (
    <div className="bg-base-200  py-6 lg:py-10 px-3 lg:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">My Ideas</h1>

            <p className="text-sm lg:text-base text-base-content/70 mt-1">
              Manage and track all your submitted ideas
            </p>
          </div>

          <Link
            href="/add-idea"
            className="btn btn-primary btn-sm lg:btn-md gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            Share New Idea
          </Link>
        </div>

        {/* Empty State */}
        {ideas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl lg:text-6xl mb-6">💡</div>

            <h3 className="text-xl lg:text-2xl font-semibold mb-3">
              No ideas yet
            </h3>

            <p className="text-sm lg:text-base text-base-content/60 mb-6">
              Start sharing your innovative ideas with the community
            </p>

            <Link href="/add-idea" className="btn btn-primary btn-sm lg:btn-md">
              Create Your First Idea
            </Link>
          </div>
        ) : (
          <div className="bg-base-100 rounded-2xl shadow overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-sm">
                    <th>Idea</th>
                    <th>Category</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <AnimatePresence>
                    {ideas.map((idea:any, index:number) => (
                      <motion.tr
                        key={idea._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover"
                      >
                        {/* Idea */}
                        <td>
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                              <Image
                                src={idea?.imageUrl}
                                alt={idea?.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div>
                              <h2 className="font-semibold line-clamp-1">
                                {idea?.title}
                              </h2>

                              <p className="text-sm text-base-content/60 line-clamp-2 max-w-xs">
                                {idea?.shortDescription}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="">
                          <div className="badge badge-primary ">
                            {idea?.category}
                          </div>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/ideas/${idea._id}`}
                              className="btn btn-sm btn-outline"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            <Link
                              href={`/my-ideas/update/${idea._id}`}
                              className="btn btn-sm btn-outline btn-primary"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => setIdeaToDelete(idea._id)}
                              className="btn btn-sm btn-outline btn-error"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden p-3 space-y-4">
              <AnimatePresence>
                {ideas.map((idea:any, index:number) => (
                  <motion.div
                    key={idea._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-base-300 rounded-2xl p-3"
                  >
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={idea?.imageUrl}
                          alt={idea?.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h2 className="font-semibold text-sm line-clamp-2">
                            {idea?.title}
                          </h2>

                          
                        </div>

                        <p className="text-xs text-base-content/60 mt-2 line-clamp-3">
                          {idea?.shortDescription}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <Link
                            href={`/ideas/${idea._id}`}
                            className="btn btn-xs btn-outline flex-1"
                          >
                            <Eye className="w-3 h-3" />
                          </Link>

                          <Link
                            href={`/my-ideas/update/${idea._id}`}
                            className="btn btn-xs btn-outline btn-primary flex-1"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Link>

                          <button
                            onClick={() => setIdeaToDelete(idea._id)}
                            className="btn btn-xs btn-outline btn-error flex-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {ideaToDelete && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-base-100 rounded-3xl p-6 lg:p-8 max-w-md w-full"
            >
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                Delete Idea?
              </h3>

              <p className="text-sm lg:text-base text-base-content/70">
                This action cannot be undone.
              </p>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIdeaToDelete(null)}
                  className="btn btn-ghost flex-1 btn-sm lg:btn-md"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleDelete(ideaToDelete)}
                  className="btn btn-error flex-1 btn-sm lg:btn-md"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
