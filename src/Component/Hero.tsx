"use client";

/**
 * BannerV3 — "Aurora Glass"
 * Updated: Mobile Responsive + 2s Auto Slide
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import { ArrowRight, TrendingUp, Cpu, Telescope } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 0,
    chip: "Startup Ecosystem",
    icon: TrendingUp,
    headline: "The Decade of the Founder",
    body: "More startups were founded in the last 3 years than in the entire 2000s. The tools, capital, and talent pipelines have never been more accessible to first-time builders.",
    cta: "Explore Ideas",
    aurora1: "#F472B6",
    aurora2: "#A78BFA",
    aurora3: "#38BDF8",
    chipBg: "rgba(244,114,182,0.15)",
    chipColor: "#F472B6",
  },
  {
    id: 1,
    chip: "Deep Tech",
    icon: Cpu,
    headline: "Hardware Is Eating the World",
    body: "Robotics, synthetic biology, and quantum computing are entering commercial readiness simultaneously. The next trillion-dollar companies will be atoms, not bits.",
    cta: "Explore Ideas",
    aurora1: "#34D399",
    aurora2: "#60A5FA",
    aurora3: "#A78BFA",
    chipBg: "rgba(52,211,153,0.15)",
    chipColor: "#34D399",
  },
  {
    id: 2,
    chip: "Future Vision",
    icon: Telescope,
    headline: "10-Year Bets Pay 100-Year Dividends",
    body: "The founders who will define the 2030s are already working in obscurity today — building infrastructure the world doesn't know it needs yet. Will you be one of them?",
    cta: "Explore Ideas",
    aurora1: "#FB923C",
    aurora2: "#FBBF24",
    aurora3: "#34D399",
    chipBg: "rgba(251,146,60,0.15)",
    chipColor: "#FB923C",
  },
];

export default function BannerV3() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  // Responsive Card Width
  const CARD_WIDTH =
    typeof window !== "undefined" && window.innerWidth < 768 ? 340 : 520;
  const GAP =
    typeof window !== "undefined" && window.innerWidth < 768 ? 16 : 20;

  const goTo = useCallback(
    (idx: any) => {
      setActive(idx);
      animate(x, -idx * (CARD_WIDTH + GAP), {
        type: "spring",
        stiffness: 260,
        damping: 32,
      });
    },
    [x, CARD_WIDTH, GAP],
  );

  const next = useCallback(
    () => goTo((active + 1) % slides.length),
    [active, goTo],
  );
  const prev = useCallback(
    () => goTo((active - 1 + slides.length) % slides.length),
    [active, goTo],
  );

  // Auto slide every 2 seconds
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = slides[active];

  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-700"
      style={{ minHeight: "clamp(520px, 85vh, 720px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap');
        .v3-display { font-family: 'Bricolage Grotesque', sans-serif; }
        .v3-mono { font-family: 'DM Mono', monospace; }
        @keyframes auroraShift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(5%,3%) scale(1.06)} 66%{transform:translate(-4%,5%) scale(0.97)} }
        .aurora-blob { animation: auroraShift 12s ease-in-out infinite; }
      `}</style>

      {/* Aurora Background */}
      <motion.div
        key={`bg-${active}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #08090f 0%, #0f1118 50%, #08090f 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:hidden" />

        <div
          className="aurora-blob absolute"
          style={{
            top: "-30%",
            left: "-10%",
            width: "70%",
            height: "80%",
            background: `radial-gradient(ellipse, ${slide.aurora1}28 0%, transparent 65%)`,
          }}
        />
        <div
          className="aurora-blob absolute"
          style={{
            top: "10%",
            right: "-15%",
            width: "65%",
            height: "75%",
            background: `radial-gradient(ellipse, ${slide.aurora2}22 0%, transparent 60%)`,
            animationDelay: "-4s",
          }}
        />
        <div
          className="aurora-blob absolute"
          style={{
            bottom: "-20%",
            left: "30%",
            width: "55%",
            height: "60%",
            background: `radial-gradient(ellipse, ${slide.aurora3}18 0%, transparent 55%)`,
            animationDelay: "-8s",
          }}
        />
      </motion.div>

      {/* Dot Mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center py-10 px-4 md:px-6">
        {/* Top Label */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="v3-mono text-[10px] md:text-[11px] text-zinc-400 dark:text-white/30 uppercase tracking-[0.2em] mb-6 md:mb-8"
        >
          Innovation Signal — {String(active + 1).padStart(2, "0")} of{" "}
          {String(slides.length).padStart(2, "0")}
        </motion.div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative w-full overflow-visible"
          style={{ height: "clamp(260px, 42vh, 360px)" }}
        >
          <motion.div
            className="absolute flex"
            style={{
              x,
              gap: GAP,
              left: `calc(50% - ${CARD_WIDTH / 2}px)`,
            }}
          >
            {slides.map((s, i) => {
              const dist = i - active;
              const Icon = s.icon;

              return (
                <motion.div
                  key={s.id}
                  onClick={() => goTo(i)}
                  animate={{
                    scale: dist === 0 ? 1 : 0.88,
                    opacity: dist === 0 ? 1 : 0.45,
                    rotateY: dist === 0 ? 0 : dist > 0 ? -8 : 8,
                    filter: dist === 0 ? "blur(0px)" : "blur(1px)",
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                  className="relative cursor-pointer shrink-0 rounded-3xl overflow-hidden"
                  style={{
                    width: CARD_WIDTH,
                    height: "100%",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow:
                      dist === 0
                        ? `0 0 80px ${s.aurora1}25, 0 0 40px ${s.aurora2}15, 0 24px 60px rgba(0,0,0,0.5)`
                        : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-white/70 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-3xl rounded-3xl" />

                  {dist === 0 && (
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 80% 50% at 20% 0%, ${s.aurora1}18, transparent)`,
                      }}
                    />
                  )}

                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-9">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center"
                          style={{
                            background: s.chipBg,
                            border: `1px solid ${s.chipColor}30`,
                          }}
                        >
                          <Icon size={15} style={{ color: s.chipColor }} />
                        </div>
                        <Chip
                          size="sm"
                          style={{
                            background: s.chipBg,
                            color: s.chipColor,
                            border: `1px solid ${s.chipColor}30`,
                            fontFamily: "DM Mono, monospace",
                            fontSize: 11,
                          }}
                        >
                          {s.chip}
                        </Chip>
                      </div>

                      <h3
                        className="v3-display font-extrabold text-zinc-900 dark:text-white leading-tight"
                        style={{ fontSize: "clamp(20px, 3.8vw, 38px)" }}
                      >
                        {s.headline}
                      </h3>

                      <p
                        className="mt-4 text-zinc-600 dark:text-white/60 leading-relaxed text-[13px] md:text-[14px]"
                        style={{ fontFamily: "DM Mono, monospace" }}
                      >
                        {s.body}
                      </p>
                    </div>

                    {dist === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <Button
                          size="md"
                          className="rounded-xl font-semibold border-0 text-white h-10 md:h-11 px-5 md:px-6 text-sm md:text-base"
                          style={{
                            background: `linear-gradient(135deg, ${s.aurora1}, ${s.aurora2})`,
                            fontFamily: "Bricolage Grotesque, sans-serif",
                          }}
                        >
                          <Link href={"/ideas"}>{s.cta}</Link>
                          <ArrowRight size={15} />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 md:gap-3 mt-8 md:mt-10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 32 : 8,
                height: 8,
                background:
                  i === active
                    ? `linear-gradient(90deg, ${slide.aurora1}, ${slide.aurora2})`
                    : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows - Hidden on very small screens or made smaller */}
        <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={prev}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:bg-white/20 transition-colors"
          >
            <ArrowRight
              size={16}
              className="text-zinc-800 dark:text-white rotate-180"
            />
          </button>
        </div>
        <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={next}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:bg-white/20 transition-colors"
          >
            <ArrowRight size={16} className="text-zinc-800 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
