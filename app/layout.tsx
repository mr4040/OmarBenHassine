// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omar Ben-Hassine — Red Team Operator",
  description: "Adversarial Systems • Exploit Research • Advanced Attack Simulation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-neutral-100 font-mono antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
