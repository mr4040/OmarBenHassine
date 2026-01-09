"use client";
import { useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, TerminalSquare, ShieldAlert, Crosshair } from "lucide-react";
import Navbar from "@/components/Navbar";
import TerminalComponent from "@/components/Terminal";
import PixelLogo from "@/components/PixelLogo"; // Optional: extract logo if needed

// Motion variants (same as original)
const reveal = { /* ... */ };
const stagger = { /* ... */ };

const getParallax = (offset: number, mousePos: {x:number,y:number}) => {
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
  const deltaX = (mousePos.x - centerX) / centerX;
  const deltaY = (mousePos.y - centerY) / centerY;
  return `${offset * deltaX}px ${offset * deltaY}px`;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.6]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <main onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })} className="relative min-h-screen bg-black text-neutral-100 font-mono overflow-hidden">
      <Navbar />

      {/* Parallax Background Layers */}
      <motion.div
        animate={{ backgroundPosition: [getParallax(20, mousePos), getParallax(0, mousePos)] }}
        style={{ opacity: glow }}
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_55%)]"
      />
      <motion.div
        animate={{ backgroundPosition: [getParallax(10, mousePos), getParallax(0, mousePos)] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]"
      />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center pt-20">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="z-10 max-w-4xl px-6 text-center">
          <motion.img src="/logo.gif" alt="Red Team Logo" width={96} height={96} className="mx-auto mb-10" style={{ imageRendering: "pixelated" }} />
          <motion.p variants={reveal} className="mb-4 text-xs tracking-[0.45em] uppercase text-emerald-400">
            <TerminalSquare className="inline mr-2 h-4 w-4" /> adversarial systems operator
          </motion.p>
          <motion.h1 variants={reveal} className="text-6xl md:text-7xl font-black tracking-tight">
            Omar Ben-Hassine
          </motion.h1>
          <motion.p variants={reveal} className="mt-8 text-xl text-neutral-400">
            Red Team • Exploit Research • Advanced Attack Simulation
          </motion.p>
          <motion.div variants={reveal} className="mt-16 flex justify-center gap-8">
            <a href="/operations" className="group inline-flex items-center gap-3 rounded-full border border-neutral-800 px-9 py-3 text-sm font-bold hover:border-emerald-400">
              View Operations <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/contact" className="rounded-full bg-emerald-500 px-9 py-3 text-sm font-black text-black hover:bg-emerald-400">
              Initiate Access
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Rest of your sections: Philosophy, Operations preview, Arsenal, Labs, Contact preview... */}
      {/* (Keep your original sections with whileInView animations) */}

      <TerminalComponent />
    </main>
  );
}
