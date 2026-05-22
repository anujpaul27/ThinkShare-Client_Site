"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Search, X } from "lucide-react";
import Loader from "@/Component/loading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

export default function IdeaList() {
     const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch Data
  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);

      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/read-idea-all`;

      if (debouncedQuery) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/search?q=${encodeURIComponent(debouncedQuery)}`;
      }

      try {
        const res = await fetch(url);
        const result = await res.json();
        
        setIdeas(result.data || result.results || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [debouncedQuery]);

  if (loading) return <Loader />;

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header + Search Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold">ALL Ideas details over here</h2>
              <p className="mt-1">Popular this week • Updated live</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ideas by title..."
                className="input input-bordered w-full pl-11 py-3 rounded-2xl focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {debouncedQuery && (
              <p className="text-sm text-base-content/60 mt-2">
                Showing results for: <span className="font-medium">{debouncedQuery}</span>
              </p>
            )}
          </div>
        </div>

        {/* Ideas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ideas.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-base-content/70">No ideas found for {debouncedQuery}</p>
            </div>
          ) : (
            ideas.map((idea) => (
              <motion.div
                key={idea._id}
                variants={cardVariants}
                whileHover="hover"
                className="card bg-base-100 shadow-md hover:shadow-2xl transition-shadow duration-300 group border border-base-200 overflow-hidden"
              >
                <figure className="relative h-52 overflow-hidden">
                  <Image
                    src={idea.imageUrl}
                    alt={idea.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <div className="badge badge-primary badge-sm font-medium shadow">
                      {idea.category}
                    </div>
                  </div>
                </figure>

                <div className="card-body">
                  <h3 className="card-title text-lg leading-tight line-clamp-2 mb-2">
                    {idea.title}
                  </h3>

                  <p className="text-base-content/70 text-sm line-clamp-3 mb-5">
                    {idea.shortDescription}
                  </p>

                  <Link
                    href={`/ideas/${idea._id}`}
                    className="btn btn-primary btn-block group-hover:bg-primary-focus transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}