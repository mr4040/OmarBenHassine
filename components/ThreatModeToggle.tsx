"use client";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/ThemeProvider";

export default function ThreatModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center gap-3 rounded-full border border-neutral-800 bg-black/80 px-5 py-2.5 backdrop-blur-md transition hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === "dark" ? (
        <> <Moon className="h-4 w-4 text-emerald-400" /> <span className="text-xs font-bold uppercase">Threat</span> </>
      ) : (
        <> <Sun className="h-4 w-4 text-emerald-600" /> <span className="text-xs font-bold uppercase text-neutral-900">Tactical</span> </>
      )}
    </motion.button>
  );
}
