'use client';

import { RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error() {

  return (
    <div className="min-h-screen bg-base-300  flex items-center justify-center overflow-hidden relative">
      {/* Background Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-30"></div>

      <div className="text-center max-w-lg px-6 relative z-10">
        {/* Astronaut 404 Style */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="text-[180px] font-black leading-none tracking-tighter text-white/90 flex items-center justify-center">
              5<span className="text-7xl">0</span>0
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-8 border-[#0a0a1f]">
                <span className="text-6xl">🧑‍🚀</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-3">Oops!</h1>
        <h2 className="text-3xl font-semibold mb-6 text-blue-400">Something went wrong</h2>

        <p className="text-lg text-white/70 mb-10">
          We ran into an unexpected error.<br />
          Don&apos;t worry, our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="btn btn-primary btn-lg px-8 text-lg font-medium flex items-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="btn btn-outline btn-lg px-8 text-lg font-medium flex items-center gap-2 border-white/50 hover:bg-white/10"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        
      </div>

      
    </div>
  );
}