"use client";

import React, { useEffect, useState } from "react";
import { Loader, Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface Idea {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  author_id?: string;
  imageUrl?: string;
}

export default function AdminAllIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoIdeas: Idea[] = [
      {
        _id: "1",
        title: "AI-Powered Health Monitoring App",
        shortDescription:
          "A mobile app that uses AI to monitor user health data",
        category: "Health & Fitness",
        author_id: "user123",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        _id: "2",
        title: "Sustainable Packaging Solution",
        shortDescription: "Biodegradable packaging material for e-commerce",
        category: "Sustainability",
        author_id: "user456",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        _id: "3",
        title: "Smart Classroom Learning Platform",
        shortDescription: "Interactive platform for remote learning",
        category: "Education",
        author_id: "user789",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        _id: "4",
        title: "Blockchain-Based Supply Chain",
        shortDescription: "Track products from manufacture to delivery",
        category: "Technology",
        author_id: "user101",
        imageUrl: "https://via.placeholder.com/150",
      },
    ];

    setIdeas(demoIdeas);
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    setIdeas(ideas.filter((idea) => idea._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">All Ideas</h1>
        <p className="text-orange-100">Manage all ideas on the platform</p>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
                <span className="text-white text-4xl">📋</span>
              </div>

              {/* Content */}
              <div className="p-6">
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
