"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Heart, MessageCircle, Eye } from "lucide-react";
import useSWR from "swr";
import Loader from "./loading";

// const trendingIdeas = [
//   {
//     id: 1,
//     title: "AI-Powered Personalized Fitness Coach",
//     description:
//       "An app that creates real-time workout plans based on user's mood, energy level, and available equipment.",
//     category: "Health & Fitness",
//     author: "Sarah Ahmed",
//     likes: 1240,
//     comments: 89,
//     views: 15400,
//     image:
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
//   },
//   {
//     id: 2,
//     title: "Zero-Waste Grocery Delivery Platform",
//     description:
//       "Eco-friendly delivery system using reusable packaging and AI route optimization.",
//     category: "Sustainability",
//     author: "Rahman Khan",
//     likes: 980,
//     comments: 67,
//     views: 8900,
//     image:
//       "https://images.unsplash.com/photo-1717457779749-7a6707d042ad?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 3,
//     title: "Virtual Reality Language Learning",
//     description:
//       "Immerse yourself in real-life conversations with AI characters in different cultures.",
//     category: "Education",
//     author: "Priya Sharma",
//     likes: 850,
//     comments: 54,
//     views: 7200,
//     image:
//       "https://images.unsplash.com/photo-1592478411213-8b6f8e0b3f2a?w=600&h=400&fit=crop",
//   },
//   {
//     id: 4,
//     title: "Smart Fridge Inventory Manager",
//     description:
//       "Automatically tracks expiry dates and suggests recipes based on what you have.",
//     category: "IoT",
//     author: "Tanvir Hassan",
//     likes: 670,
//     comments: 43,
//     views: 6300,
//     image:
//       "https://images.unsplash.com/photo-1586201375765-9c6e5c5f5e5e?w=600&h=400&fit=crop",
//   },
//   {
//     id: 5,
//     title: "Freelancer Financial Stability App",
//     description:
//       "Predicts income gaps and helps freelancers save for lean months.",
//     category: "Fintech",
//     author: "Nadia Islam",
//     likes: 1120,
//     comments: 76,
//     views: 9800,
//     image:
//       "https://images.unsplash.com/photo-1554224155-6726b9b5b5b5?w=600&h=400&fit=crop",
//   },
//   {
//     id: 6,
//     title: "Mental Health Journal with AI Insights",
//     description:
//       "Daily mood tracking with AI that detects patterns and suggests coping techniques.",
//     category: "HealthTech",
//     author: "Fahim Chowdhury",
//     likes: 1450,
//     comments: 112,
//     views: 13400,
//     image:
//       "https://images.unsplash.com/photo-1541193999607-8b0b9f5f0f0f?w=600&h=400&fit=crop",
//   },
// ];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TrendingIdeasPage() {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/read-idea`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loader></Loader>;
  const trendingIdeas=(data.data);

  return (
    <section className="py-16 bg-base-200 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-4xl font-bold">Trending Ideas</h2>
              <p className=" mt-1">Popular this week • Updated live</p>
            </div>
          </div>
          <Link href="/ideas" className="btn btn-outline">
            View All Ideas →
          </Link>
        </div>

        {/* Ideas Grid with Framer Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {trendingIdeas.map((idea) => (
            <motion.div
              key={idea._id}
              variants={cardVariants}
              whileHover="hover"
              className="card bg-base-100 shadow-md hover:shadow-2xl transition-shadow duration-300 group border border-base-200  overflow-hidden"
            >
              {/* Image */}
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

              <div className="card-body ">
                <h3 className="card-title text-lg leading-tight line-clamp-2 mb-2">
                  {idea.title}
                </h3>

                <p className="text-base-content/70 text-sm line-clamp-3 mb-5">
                  {idea.shortDescription}
                </p>

                

                {/* View Details Button */}
                <Link
                  href={`/ideas/${idea.id}`}
                  className="btn btn-primary btn-block group-hover:bg-primary-focus transition-colors mb-0"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
