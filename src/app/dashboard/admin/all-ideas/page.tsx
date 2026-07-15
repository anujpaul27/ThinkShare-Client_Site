"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Idea {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  author_id?: string;
  imageUrl?: string;
  status?: "active" | "unactive";
}

export default function AdminAllIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllIdea =async ()=> 
    {
      try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/read-idea-all`);
      const result: any = await res.json()
      console.log(result);
      setIdeas(result.data)
    } catch (err:any) {
      console.log(err.message);
      toast.error("Failed to update idea status");
    }
    }    
    fetchAllIdea()
    setLoading(false);
  }, []);


  // delete idea
  const handleDelete = async (id:string) => {
    try {
      // example delete api
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea-delete/${id}`,
        {
          method: "DELETE",
        },
      );
      setIdeas(ideas.filter((idea) => idea._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleIdeaStatus = async (
    id: string,
    current: "active" | "unactive" | undefined,
  ) => {
    const newStatus = current === "active" ? "unactive" : "active";
    setIdeas((prev) =>
      prev.map((i) => (i._id === id ? { ...i, status: newStatus } : i)),
    );

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/ideas/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error(err);
      setIdeas((prev) =>
        prev.map((i) =>
          i._id === id ? { ...i, status: current || "unactive" } : i,
        ),
      );
      toast.error("Failed to update idea status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">All Ideas</h1>
        <p className="text-orange-100">Manage all ideas on the platform</p>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1  gap-6">
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${idea.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}
                  >
                    {idea.status ?? "unactive"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {idea.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {idea.shortDescription}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {idea.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {idea.author_id?.substring(0, 5)}...
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/ideas/${idea._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm">
                      <Eye size={16} />
                      View
                    </button>
                  </Link>
                  <button
                    className="flex-1 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                    onClick={() => handleDelete(idea._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                  <button
                    className={`flex-1 ${idea.status === "active" ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"} text-white font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm`}
                    onClick={() => toggleIdeaStatus(idea._id, idea.status)}
                  >
                    {idea.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No ideas found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
