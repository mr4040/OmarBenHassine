"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Mail, Key } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TerminalComponent from "@/components/Terminal";

export default function Contact() {
  return (
    <main className="relative min-h-screen bg-black text-neutral-100 font-mono overflow-hidden">
      <Navbar />
      <motion.div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_55%)] opacity-50" />
      <motion.div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <section className="relative flex min-h-screen items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <Link href="/" className="inline-flex items-center gap-3 text-sm text-neutral-500 hover:text-emerald-400 mb-12">
            <ArrowLeft className="h-4 w-4" /> RETURN TO BASE
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-neutral-800 bg-black/60 backdrop-blur-xl p-20 text-center"
          >
            <Shield className="h-16 w-16 text-emerald-400 mx-auto mb-8" />
            <h1 className="text-5xl font-black mb-8">Initiate Encrypted Channel</h1>
            <p className="text-lg text-neutral-400">Available for elite red-team engagements and adversary emulation.</p>

            <div className="mt-16 space-y-10">
              <div className="flex items-center justify-center gap-4">
                <Key className="h-5 w-5 text-emerald-400" />
                <code className="text-sm font-mono">PGP: 0xA1B2C3D4E5F67890</code>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Mail className="h-5 w-5 text-emerald-400" />
                <a href="mailto:omar@benhassine.io" className="text-emerald-400 hover:underline">omar@benhassine.io</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TerminalComponent />
    </main>
  );
}
