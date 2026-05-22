"use client";

import React from "react";
import Image from "next/image";
import { Users } from "lucide-react";

const contributors = [
  { id: 1, name: "Anuj Paul", image: "https://ui-avatars.com/api/?name=Anuj+Paul&background=0D8ABC&color=fff&size=128" },
  { id: 2, name: "Sadia Rahman", image: "https://ui-avatars.com/api/?name=Sadia+Rahman&background=FF6B6B&color=fff&size=128" },
  { id: 3, name: "Rakib Hasan", image: "https://ui-avatars.com/api/?name=Rakib+Hasan&background=4ECDC4&color=fff&size=128" },
  { id: 4, name: "Nusrat Jahan", image: "https://ui-avatars.com/api/?name=Nusrat+Jahan&background=A78BFA&color=fff&size=128" },
  { id: 5, name: "Tamim Ahmed", image: "https://ui-avatars.com/api/?name=Tamim+Ahmed&background=F4A261&color=fff&size=128" },
  { id: 6, name: "Priya Das", image: "https://ui-avatars.com/api/?name=Priya+Das&background=9B59B6&color=fff&size=128" },
  { id: 7, name: "Fahim Khan", image: "https://ui-avatars.com/api/?name=Fahim+Khan&background=2A9D8F&color=fff&size=128" },
  { id: 8, name: "Meherun Nisa", image: "https://ui-avatars.com/api/?name=Meherun+Nisa&background=E76F51&color=fff&size=128" },
];

export default function Contributors() {
  return (
    <section className="py-12 bg-base-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-center">Our Contributors</h2>
        </div>

        <div className="overflow-hidden">
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
                    className="object-cover"
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

      {/* CSS Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}