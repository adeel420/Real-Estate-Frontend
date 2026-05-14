"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiSearch, FiHome, FiKey } from "react-icons/fi";
import { fadeUp, staggerContainer } from "../../../lib/animations";

const steps = [
  {
    number: "01",
    icon: FiSearch,
    title: "Search & Discover",
    desc: "Browse thousands of verified listings filtered by location, type, and budget to find your perfect match.",
  },
  {
    number: "02",
    icon: FiHome,
    title: "Tour & Evaluate",
    desc: "Schedule in-person or virtual tours. Our agents guide you through every detail of the property.",
  },
  {
    number: "03",
    icon: FiKey,
    title: "Close & Move In",
    desc: "We handle all paperwork and negotiations so you can focus on what matters — your new home.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Simple Process
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif font-bold text-[#0D0D0D] text-4xl lg:text-5xl tracking-tight">
            How It Works
          </motion.h2>
          <motion.div variants={fadeUp} className="w-14 h-[3px] bg-[#C9A84C] rounded-full mx-auto mt-3" />
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Dashed connector line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-[2px]">
            <svg width="100%" height="2" className="overflow-visible">
              <line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className="relative mb-6">
                  <div className="w-[72px] h-[72px] rounded-full bg-[#F5F2ED] border-2 border-[#C9A84C]/30 flex items-center justify-center">
                    <Icon size={26} className="text-[#1A3C5E]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C9A84C] text-white text-[10px] font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[#0D0D0D] text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[260px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
