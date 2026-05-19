"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp} from "lucide-react";
import useSWR from "swr";
import Loader from "@/Component/loading";


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
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/read-idea-all`, fetcher);

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
              <h2 className="text-4xl font-bold">ALL Ideas details over here</h2>
              <p className=" mt-1">Popular this week • Updated live</p>
            </div>
          </div>
          
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
                  href={`/ideas/${idea._id}`}
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
