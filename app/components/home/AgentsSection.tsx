"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../lib/animations";
import AgentCard from "./AgentCard";
import allAgents from "../../../lib/agents";

const agents = allAgents.slice(0, 8);
const tabs = ["All", "Residential", "Commercial", "Luxury"];

export default function AgentsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? agents : agents.filter((a) => a.category === active);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Our Team
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif font-bold text-[#0D0D0D] text-4xl lg:text-5xl tracking-tight">
            Meet Our Property Agents
          </motion.h2>
          <motion.div variants={fadeUp} className="w-14 h-[3px] bg-[#C9A84C] rounded-full mx-auto mt-3 mb-4" />
          <motion.p variants={fadeUp} className="text-gray-400 text-sm max-w-md mx-auto">
            Our experienced agents are dedicated to finding you the perfect property and making the process seamless.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="flex items-center justify-center gap-2 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 cursor-pointer ${active === tab
                  ? "text-[#fff] border-transparent"
                  : "text-gray-400 border-gray-200 hover:text-gray-700"
                }`}
            >
              {active === tab && (
                <motion.span
                  layoutId="agent-tab-pill"
                  className="absolute inset-0 bg-[#C9A84C] rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filtered.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
