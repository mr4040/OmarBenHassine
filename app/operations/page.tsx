"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Crosshair, ShieldAlert, TerminalSquare } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TerminalComponent from "@/components/Terminal";

const reveal = { /* same as home */ };

export default function Operations() {
  return (
    <main className="relative min-h-screen bg-black text-neutral-100 font-mono overflow-hidden">
      <Navbar />
      <motion.div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_55%)] opacity-40" />
      <motion.div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <section className="relative py-32 pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link href="/" className="inline-flex items-center gap-3 text-sm text-neutral-500 hover:text-emerald-400 mb-16">
            <ArrowLeft className="h-4 w-4" /> RETURN TO BASE
          </Link>

          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-black flex items-center gap-5">
            <Crosshair className="text-emerald-400" />
            Active Operations & Kill Chains
          </motion.h1>

          {/* Add your operation write-ups here */}
        </div>
      </section>

      <TerminalComponent />
    </main>
  );
}
