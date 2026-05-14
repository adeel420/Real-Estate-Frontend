"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "accent";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({ children, variant = "primary", className, onClick, type = "button" }: Props) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold text-sm tracking-wide rounded-full px-7 py-3.5 transition-colors duration-200 cursor-pointer";
  const variants = {
    primary: "bg-[#1A3C5E] text-white hover:bg-[#15304d]",
    ghost:   "border border-white text-white hover:bg-white/10",
    accent:  "bg-[#C9A84C] text-white hover:bg-[#b8943e]",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </motion.button>
  );
}
