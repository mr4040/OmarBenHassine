// components/Terminal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Download, Music, Search, Zap, AlertTriangle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const commands = {
  // ... (keep all your existing commands: help, whoami, date, clear, cv, spotify, etc.)
  help: { /* ... same as before */ },
  whoami: { output: ["<span class='text-emerald-400 font-bold'>omarbenhassine</span>", "Red Team Operator • Adversary Emulation • Assume Breach"] },
  date: { output: [`<span class='text-emerald-400'>${new Date().toLocaleString()}</span>`] },
  clear: { clear: true },
  cv: { /* ... same */ },
  spotify: { /* ... same */ },
  breach: {
    output: [
      "<span class='text-red-500 animate-pulse'>[!!!] SIMULATED BREACH MODE ACTIVATED</span>",
      "<span class='text-red-400'>C2 beacon established • EDR bypassed • Domain admin achieved</span>",
      "Persistence: Scheduled task + WMI subscription",
      "Exfil channel open on port 443 (HTTPS beaconing)",
    ],
  },
};

export default function TerminalComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "<span class='text-emerald-400 glitch' data-text='Red Team Terminal v3.0'>Red Team Terminal v3.0</span>",
    "<span class='text-neutral-500'>Type 'help' for available commands</span>",
    "",
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Glitch effect trigger
  const triggerGlitch = () => {
    if (terminalRef.current) {
      terminalRef.current.classList.add("glitch-active");
      setTimeout(() => terminalRef.current?.classList.remove("glitch-active"), 600);
    }
  };

  // Fake static scanline burst
  const triggerScan = () => {
    const scan = document.createElement("div");
    scan.className = "terminal-scanline";
    document.body.appendChild(scan);
    setTimeout(() => scan.remove(), 1200);
  };

  const processCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setIsTyping(true);
    const args = cmd.trim().split(" ");
    const base = args[0].toLowerCase();

    setHistory((h) => [...h, `<span class="text-neutral-400">visitor@omar:~$$</span> <span class="typing">${cmd}</span>`]);

    // Special effects for certain commands
    if (base === "breach" || base === "whoami") {
      triggerGlitch();
      triggerScan();
    }

    setTimeout(() => {
      if (commands[base]) {
        if (commands[base].clear) {
          setHistory([]);
        } else {
          setHistory((h) => [...h, ...commands[base].output]);
          if (base === "breach") {
            // Extra visual chaos
            triggerGlitch();
            setTimeout(triggerGlitch, 300);
          }
        }
      } else if (base === "google" && args[1]) {
        // ... your existing google logic
      } else {
        setHistory((h) => [
          ...h,
          `<span class="text-red-400">zsh: command not found: ${base}</span>`,
          `<span class="text-neutral-600 text-xs">Try 'help' for available operations</span>`,
        ]);
      }

      setInput("");
      setIsTyping(false);
    }, 400); // Simulated processing delay
  };

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      {/* Toggle Button with Pulse */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-50 rounded-full border border-emerald-400/50 bg-black/90 p-4 backdrop-blur-md shadow-2xl shadow-emerald-400/20 transition-all hover:scale-110 hover:shadow-emerald-400/40"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: isOpen ? "0 0 40px rgba(16,185,129,0.6)" : "0 0 20px rgba(16,185,129,0.3)" }}
      >
        {isOpen ? (
          <X className="h-7 w-7 text-emerald-400" />
        ) : (
          <Terminal className="h-7 w-7 text-emerald-400 animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 left-8 z-50 w-96 md:w-[640px] lg:w-[800px] rounded-xl border border-emerald-400/30 bg-black/95 shadow-2xl shadow-emerald-400/30 backdrop-blur-2xl overflow-hidden"
          >
            {/* CRT-style Header */}
            <div className="flex items-center justify-between border-b border-emerald-400/20 bg-gradient-to-r from-emerald-900/20 to-transparent px-5 py-4">
              <div className="flex items-center gap-4">
                <Zap className="h-5 w-5 text-emerald-400 animate-pulse" />
                <span className="font-mono text-sm font-bold tracking-wider text-emerald-400">
                  root@omar-benhassine:~ breach-terminal
                </span>
              </div>
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse delay-75" />
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse delay-150" />
              </div>
            </div>

            {/* Terminal Body with Scanlines */}
            <div className="relative p-6 font-mono text-sm leading-relaxed max-h-96 overflow-y-auto">
              {/* Subtle CRT scanlines */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/5 to-transparent opacity-30 animate-scan" />
              
              {history.map((line, i) => (
                <div
                  key={i}
                  className="mb-1"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}

              {/* Input Line */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-emerald-400 animate-pulse">└─►</span>
                <span className="text-neutral-400">visitor@omar:~$$</span>
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && processCommand(input)}
                    disabled={isTyping}
                    className="w-full bg-transparent outline-none text-neutral-100 caret-emerald-400 font-mono"
                    autoFocus
                  />
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="absolute left-0 top-0 w-2 h-5 bg-emerald-400"
                    style={{ left: `${input.length * 9}px` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS Effects (Add to globals.css) */}
      <style jsx global>{`
        .glitch {
          position: relative;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        .glitch::before {
          animation: glitch-1 0.6s infinite;
          color: #10b981;
          left: 2px;
          text-shadow: -2px 0 #ff0044;
        }
        .glitch::after {
          animation: glitch-2 0.6s infinite;
          color: #10b981;
          left: -2px;
          text-shadow: 2px 0 #00ffff;
        }

        @keyframes glitch-1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
          20% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); }
          40% { clip-path: polygon(0 15%, 100% 15%, 100% 55%, 0 55%); }
          60% { clip-path: polygon(0 30%, 100% 30%, 100% 70%, 0 70%); }
          80% { clip-path: polygon(0 10%, 100% 10%, 100% 80%, 0 80%); }
        }

        @keyframes glitch-2 {
          0%, 100% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
          30% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); }
          50% { clip-path: polygon(0 45%, 100% 45%, 100% 100%, 0 100%); }
          70% { clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%); }
        }

        .terminal-scanline {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to bottom, transparent, rgba(16,185,129,0.6), transparent);
          animation: scanline 1.2s linear;
          pointer-events: none;
          z-index: 9999;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .animate-scan {
          animation: scan-slow 8s linear infinite;
        }

        @keyframes scan-slow {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }

        .glitch-active {
          animation: glitch-1 0.3s linear 2;
        }
      `}</style>
    </>
  );
}
