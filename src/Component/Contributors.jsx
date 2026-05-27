"use client";

import React from "react";
import Image from "next/image";
import { Users } from "lucide-react";

const contributors = [
  {
    id: 1,
    name: "Aaroni Sharma",
    image:
      "https://images.unsplash.com/photo-1737965902340-0fc9d8aa811a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Ananya Iyer",
    image:
      "https://images.unsplash.com/photo-1604465830407-1a564ca14f7b?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Rohan Joshi",
    image:
      "https://images.unsplash.com/photo-1674723762879-9213e31d8649?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Pooja Patel",
    image:
      "https://images.unsplash.com/photo-1739429942092-dd2769b086b0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Aditi Verma",
    image:
      "https://images.unsplash.com/photo-1684961415565-80383f48c0c2?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Divya Nair",
    image:
      "https://images.unsplash.com/photo-1620500152453-6cfd7a034e9b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "Arjun Gupta",
    image:
      "https://images.unsplash.com/photo-1625824977593-07430e94e4e2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "Sneha Reddy",
    image:
      "https://images.unsplash.com/photo-1667842793062-9344ef8973b0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Contributors() {
  return (
    <section className="py-10 md:py-16 bg-base-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Our Contributors
          </h2>
        </div>

        {/* Mobile: 2 Rows Grid */}
        <div className="md:hidden grid grid-cols-3 sm:grid-cols-4 gap-6 py-6">
          {contributors.map((person, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-base-100 shadow-md group-hover:border-primary transition-all duration-300">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-xs font-medium mt-3 text-center">
                {person.name}
              </p>
            </div>
          ))}
        </div>

        {/* Tablet & Desktop: Marquee */}
        <div className="hidden md:block overflow-hidden">
          <div className="flex gap-10 py-4 animate-marquee whitespace-nowrap">
            {[...contributors, ...contributors].map((person, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[130px] group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-base-100 shadow-md group-hover:border-primary transition-all duration-300">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm font-medium mt-3 text-center whitespace-nowrap">
                  {person.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Animation (শুধু Desktop এর জন্য) */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
