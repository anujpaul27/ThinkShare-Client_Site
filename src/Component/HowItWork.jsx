'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, MessageCircle, Trophy } from 'lucide-react';

const steps = [
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: "Share Your Idea",
    desc: "Post your startup idea with title, description, and optional images.",
    color: "text-primary",
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Get Community Feedback",
    desc: "Real innovators review, upvote, and give constructive feedback.",
    color: "text-secondary",
  },
  {
    icon: <MessageCircle className="w-10 h-10" />,
    title: "Discuss & Refine",
    desc: "Engage in meaningful discussions to improve your idea together.",
    color: "text-accent",
  },
  {
    icon: <Trophy className="w-10 h-10" />,
    title: "Validate & Grow",
    desc: "Get validation, find co-founders, and turn your idea into reality.",
    color: "text-success",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-base-100 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">How IdeaVault Works</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            From idea to reality in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+1.25rem)] w-full h-0.5 bg-base-300 dark:bg-neutral-700 z-0" />
              )}

              <div className="card bg-base-200  border border-base-300 dark:border-neutral-700 h-full hover:shadow-xl transition-all duration-300 relative z-10">
                <div className="card-body items-center text-center p-8">
                  <div className={`w-20 h-20 rounded-2xl bg-base-100 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{step.desc}</p>

                  <div className="mt-6 text-sm font-medium text-base-content/50">
                    Step {index + 1}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-base-content/60 mb-4">Ready to bring your idea to life?</p>
          <a href="/add-idea" className="btn btn-primary btn-lg px-10">
            Share Your Idea Now
          </a>
        </div>
      </div>
    </section>
  );
}