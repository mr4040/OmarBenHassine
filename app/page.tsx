"use client";

import { useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, TerminalSquare, ShieldAlert, Crosshair } from "lucide-react";
import Navbar from "@/components/Navbar";
import TerminalComponent from "@/components/Terminal";

const reveal = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.6]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const getParallax = (offset: number) => {
    const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
    const deltaX = (mousePos.x - centerX) / centerX;
    const deltaY = (mousePos.y - centerY) / centerY;
    return `${offset * deltaX}px ${offset * deltaY}px`;
  };

  return (
    <main onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })} className="relative min-h-screen bg-black text-neutral-100 font-mono overflow-hidden">
      <Navbar />

      <motion.div
        animate={{ backgroundPosition: [getParallax(20), getParallax(0)] }}
        style={{ opacity: glow }}
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_55%)]"
      />
      <motion.div
        animate={{ backgroundPosition: [getParallax(10), getParallax(0)] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]"
      />

      <section className="relative flex min-h-screen items-center justify-center pt-20">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="z-10 max-w-4xl px-6 text-center">
          <motion.img
            src="/logo.gif"
            alt="Red Team Logo"
            width={96}
            height={96}
            className="mx-auto mb-10"
            style={{ imageRendering: "pixelated" }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
          />
          <motion.p variants={reveal} className="mb-4 text-xs tracking-[0.45em] uppercase text-emerald-400">
            <TerminalSquare className="inline mr-2 h-4 w-4" /> adversarial systems operator
          </motion.p>
          <motion.h1 variants={reveal} className="text-6xl md:text-7xl font-black tracking-tight">
            Omar Ben‑Hassine
          </motion.h1>
          <motion.p variants={reveal} className="mt-8 text-xl text-neutral-400">
            Red Team • Exploit Research • Advanced Attack Simulation
          </motion.p>
          <motion.div variants={reveal} className="mt-16 flex justify-center gap-8">
            <a href="/operations" className="group inline-flex items-center gap-3 rounded-full border border-neutral-800 px-9 py-3 text-sm font-bold hover:border-emerald-400">
              View Operations <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="/contact" className="rounded-full bg-emerald-500 px-9 py-3 text-sm font-black text-black hover:bg-emerald-400">
              Initiate Access
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Add your other sections here (Philosophy, Operations cards, Arsenal, etc.) */}

      <TerminalComponent />
    </main>
  );
}
