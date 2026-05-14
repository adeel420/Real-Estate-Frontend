"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../lib/animations";
import AgentCard, { type Agent } from "./AgentCard";

const agents: Agent[] = [
  { id: 0, name: "Alexandra Moore", role: "Senior Property Agent", specialty: "Luxury", deals: 48, exp: 12, rating: 4.9, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80", category: "Luxury" },
  { id: 1, name: "James Whitfield", role: "Residential Specialist", specialty: "Residential", deals: 31, exp: 7, rating: 4.8, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80", category: "Residential" },
  { id: 2, name: "Priya Nair", role: "Commercial Advisor", specialty: "Commercial", deals: 24, exp: 9, rating: 4.9, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80", category: "Commercial" },
  { id: 3, name: "Marcus Chen", role: "Luxury Estate Consultant", specialty: "Luxury", deals: 56, exp: 15, rating: 5.0, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", category: "Luxury" },
  { id: 4, name: "Sofia Reyes", role: "Residential Agent", specialty: "Residential", deals: 19, exp: 4, rating: 4.7, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80", category: "Residential" },
  { id: 5, name: "Daniel Okafor", role: "Commercial Broker", specialty: "Commercial", deals: 37, exp: 10, rating: 4.8, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80", category: "Commercial" },
  { id: 6, name: "Claire Fontaine", role: "Luxury Property Advisor", specialty: "Luxury", deals: 42, exp: 11, rating: 4.9, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80", category: "Luxury" },
  { id: 7, name: "Ryan Thornton", role: "Residential Consultant", specialty: "Residential", deals: 28, exp: 6, rating: 4.8, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", category: "Residential" },
];

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
