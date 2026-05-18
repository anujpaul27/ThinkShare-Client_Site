'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show first text after 5 seconds
    const initialTimeout = setTimeout(() => {
      setShowText(true);
    }, 5000);

    // Cycle every 10 seconds (5s visible + 5s hidden)
    const interval = setInterval(() => {
      setShowText(prev => !prev);
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative h-80 lg:h-screen flex items-center overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 dark:bg-neutral-650/10" />

      {/* Center Content */}
      <div className="relative z-10 w-full flex justify-center items-center px-4 sm:px-6 min-h-screen">
        <AnimatePresence mode="wait">
          {showText && (
            <motion.div
              key="hero-text"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                y: -60, 
                scale: 0.95,
                transition: { duration: 0.8 }
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut" 
              }}
              className="text-center"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                IdeaVault
              </motion.h1>

              <motion.p 
                className="text-xl sm:text-2xl md:text-3xl text-primary/90 mt-4 font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Where Ideas Become Reality
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator - Responsive */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 8 }}
      >
        Scroll to explore
        <div className="mt-2 w-px h-12 bg-white/30" />
      </motion.div>
    </div>
  );
}