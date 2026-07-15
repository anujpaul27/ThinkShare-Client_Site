"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, MessageCircle, Save, X } from "lucide-react";
import Image from "next/image";
import Loader from "@/Component/loading";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ParamValue } from "next/dist/server/request/params";

interface comment {
    _id: string ;
    userID: string | undefined;
    postID: ParamValue;
    name: string | undefined;
    imageURL: string | null | undefined;
    time: string;
    text: string;
}
type strNull = string | null;

interface UserSession {
  user?: {
    id: string;
  };
}

export default function MyInteractionsPage() {
  const [comments, setComments] = useState<comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [editingId, setEditingId] = useState<strNull>(null);
  const [commentText, setCommentText] = useState<string>("");

  const [deleteId, setDeleteId] = useState<strNull>(null);

  // session
  const { data: session, isPending } = authClient.useSession() as {
    data: UserSession | undefined ;
    isPending: boolean
  };
  const id = session?.user?.id;

  // fetch comments
  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments-userID/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.data || []);
        setLoading(false);
      });
  }, [id]);

  // delete comment
  const handleDelete = async (commentId:string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment-delete/${commentId}`,
        {
          method: "DELETE",
        },
      );

      const remaining = comments.filter(
        (comment) => comment._id !== commentId,
      );

      setComments(remaining);
      setDeleteId(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || isPending) return <Loader />;

  return (
    <div className="bg-base-200  py-6 lg:py-10 px-3 lg:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold">
            My Interactions
          </h1>

          <p className="text-base-content/70 mt-2 text-sm lg:text-base">
            Manage all your comments and interactions
          </p>
        </div>

        {/* Empty state */}
        {comments.length === 0 ? (
          <div className="bg-base-100 rounded-3xl py-20 text-center shadow">
            <div className="text-6xl mb-4">💬</div>

            <h2 className="text-2xl font-bold mb-2">
              No interactions yet
            </h2>

            <p className="text-base-content/60">
              Your comments will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <AnimatePresence>
              {comments.map((comment, index) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-base-100 rounded-3xl p-4 lg:p-6 shadow mt-5"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={comment?.imageURL}
                        alt={comment?.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex   sm:items-center justify-between gap-2">
                        <div>
                          <h2 className="font-bold text-lg">
                            {comment?.name}
                          </h2>

                          <p className="text-xs text-base-content/60">
                            {comment?.time}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link
                            href={`/update/${comment._id}`}
                            className="btn btn-sm btn-outline btn-primary"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setDeleteId(comment._id)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Text */}
                      {editingId === comment._id ? (
                        <form
                          className="mt-4"
                        >
                          <textarea
                            name="comment"
                            value={commentText}
                            onChange={(e) =>
                              setCommentText(e.target.value)
                            }
                            className="textarea textarea-bordered w-full h-28"
                          />

                          <div className="flex gap-2 mt-3">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(null);
                                setCommentText("");
                              }}
                              className="btn btn-ghost btn-sm"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="mt-4 bg-base-200 rounded-2xl p-4">
                          <div className="flex gap-2 items-start">
                            <MessageCircle className="w-5 h-5 mt-1 text-primary" />

                            <p className="text-sm lg:text-base leading-relaxed">
                              {comment?.text}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-base-100 rounded-3xl p-6 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-2">
                Delete Comment?
              </h3>

              <p className="text-base-content/70">
                This action cannot be undone.
              </p>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setDeleteId(null)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleDelete(deleteId)}
                  className="btn btn-error flex-1"
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