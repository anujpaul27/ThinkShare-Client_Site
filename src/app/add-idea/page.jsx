'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const categories = [
  "Technology", "Health & Fitness", "AI & Machine Learning", "Education",
  "Sustainability", "Fintech", "E-commerce", "Social Impact", 
  "Food & Agriculture", "Transportation", "Entertainment", "Others"
];

export default function AddIdeaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const UserObj = Object.fromEntries(formData.entries());
    console.log(UserObj);


    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert( JSON.stringify(UserObj));
    // Reset form or redirect
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-base-200  py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <Link href="/" className="btn btn-ghost btn-circle">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="lg:text-4xl md:text-3xl text-2xl  font-bold">Share Your Idea</h1>
              <p className="text-base-content/70 lg:text-xl md:text-md text-sm">Help the community validate and grow your startup idea</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-base-100 dark:bg-neutral-900 rounded-3xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Idea Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Idea Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="title"
                
                required
                className="input input-bordered w-full text-lg"
                placeholder="E.g. AI-Powered Smart Farming Assistant"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Short Description <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="shortDescription"
                
                required
                className="input input-bordered w-full"
                placeholder="One sentence summary of your idea"
                maxLength={120}
              />
            </div>

            {/* Category & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category <span className="text-red-500">*</span></label>
                <select
                  name="category"
                  
                  required
                  className="select select-bordered w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Estimated Budget (Optional)</label>
                <input
                  type="text"
                  name="estimatedBudget"
                  
                  className="input input-bordered w-full"
                  placeholder="e.g. $15,000 - $25,000"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags (Optional)</label>
              <input
                type="text"
                name="tags"
                
                className="input input-bordered w-full"
                placeholder="ai, health, mobile-app, startup (comma separated)"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-2">Image URL (Optional)</label>
              <div className="flex gap-3">
                <input
                  type="url"
                  name="imageUrl"
                  
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
                />
                <button type="button" className="btn btn-outline">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Problem Statement */}
            <div>
              <label className="block text-sm font-medium mb-2">Problem Statement <span className="text-red-500">*</span></label>
              <textarea
                name="problemStatement"
                
                required
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="What problem are you trying to solve?"
              />
            </div>

            {/* Proposed Solution */}
            <div>
              <label className="block text-sm font-medium mb-2">Proposed Solution <span className="text-red-500">*</span></label>
              <textarea
                name="proposedSolution"
                
                required
                rows={5}
                className="textarea textarea-bordered w-full"
                placeholder="How does your idea solve this problem?"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Detailed Description</label>
              <textarea
                name="detailedDescription"
                
                rows={6}
                className="textarea textarea-bordered w-full"
                placeholder="Provide more details about your idea..."
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium mb-2">Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                
                className="input input-bordered w-full"
                placeholder="e.g. Busy professionals, Small business owners, Students"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block text-lg h-14 mt-8"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit Idea"
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}