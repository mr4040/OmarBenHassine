// components/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import { Menu, X, TerminalSquare, Crosshair, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThreatModeToggle from "./ThreatModeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Base", href: "/", icon: TerminalSquare },
    { name: "Operations", href: "/operations", icon: Crosshair },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-black/70 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Callsign */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10"
            >
              <TerminalSquare className="h-6 w-6 text-emerald-400" />
            </motion.div>
            <span className="font-black tracking-wider text-emerald-400 group-hover:text-emerald-300 transition">
              OMAR BH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-emerald-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-lg bg-emerald-400/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side: Threat Mode Toggle + Mobile Menu */}
          <div className="flex items-center gap-6">
            <ThreatModeToggle />

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-emerald-400 transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-neutral-800 bg-black/95 py-6"
          >
            <div className="space-y-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-6 text-lg font-bold uppercase tracking-wider transition ${
                      isActive ? "text-emerald-400" : "text-neutral-400 hover:text-emerald-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                    {isActive && <span className="ml-auto text-emerald-400">●</span>}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
