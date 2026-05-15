"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiArrowRight, FiCheck, FiSearch } from "react-icons/fi";
import { fadeUp, staggerContainer } from "../../lib/animations";
import AgentCard from "../components/home/AgentCard";
import agents from "../../lib/agents";

const stats = [
  { value: "120+", label: "Expert Agents" },
  { value: "4.9",  label: "Avg. Rating"   },
  { value: "850+", label: "Deals Closed"  },
  { value: "15+",  label: "Years Exp."    },
];

export default function AgentsPage() {
  const gridRef    = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const [search, setSearch] = useState("");

  const filtered = agents.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase()) ||
    a.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F5F2ED]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#1A3C5E] pt-20 pb-32 px-4 sm:px-6">
        <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" alt="agents" fill className="object-cover opacity-10" priority />
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-1 pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">Our Team</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif font-bold text-white text-4xl lg:text-6xl tracking-tight leading-tight max-w-2xl">
              Meet Our <span className="text-[#C9A84C] italic">Expert</span> Agents
            </motion.h1>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-4" />
            <motion.p variants={fadeUp} className="text-white/50 text-base mt-4 max-w-lg leading-relaxed">
              Our experienced agents are dedicated to finding you the perfect property and making the entire process seamless.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-0 mt-10 w-fit bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl overflow-hidden">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col items-center px-7 py-4 ${i !== stats.length - 1 ? "border-r border-white/[0.1]" : ""}`}>
                  <span className="text-[#C9A84C] font-serif font-bold text-xl leading-none">{s.value}</span>
                  <span className="text-white/50 text-[11px] mt-1 tracking-wide">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Search Bar (sticky) ── */}
      <div className="sticky top-0 z-40 -mt-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#1A3C5E]/70 backdrop-blur-xl border border-white/[0.12] rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4 shadow-2xl"
          >
            <div className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] rounded-xl px-4 py-2.5 flex-1 max-w-md focus-within:border-[#C9A84C]/60 transition-colors">
              <FiSearch size={13} className="text-white/40 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, city, or specialty…"
                className="bg-transparent text-white text-sm placeholder:text-white/30 outline-none w-full"
              />
            </div>
            <p className="text-white/40 text-sm hidden sm:block">
              <span className="text-white font-semibold">{filtered.length}</span> agents found
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <motion.div variants={staggerContainer} initial="hidden" animate={gridInView ? "visible" : "hidden"} className="mb-10">
          <motion.div variants={fadeUp}>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Our Team</p>
            <h2 className="font-serif font-bold text-[#0D0D0D] text-3xl lg:text-4xl tracking-tight">
              <span className="text-[#1A3C5E]">{filtered.length}</span> Agents Available
            </h2>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={search}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((agent) => <AgentCard key={agent.id} agent={agent} />)}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1A3C5E]/10 flex items-center justify-center mb-4">
                <FiSearch size={24} className="text-[#1A3C5E]" />
              </div>
              <p className="font-serif font-bold text-[#0D0D0D] text-xl">No agents found</p>
              <p className="text-sm text-gray-400 mt-2">Try a different name, city, or specialty</p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setSearch("")} className="mt-5 bg-[#C9A84C] text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#b8943e] transition-colors cursor-pointer">
                Clear Search
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Join CTA ── */}
      <section className="relative overflow-hidden py-28 px-4 sm:px-6" style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }}>
        <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" alt="join" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#1A3C5E]/88" />
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-1 pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-2 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-semibold tracking-wide px-4 py-2 rounded-full">We&apos;re Hiring</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-5 max-w-3xl">
              Join Our Growing <span className="italic text-[#C9A84C]">Team</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
              Are you a passionate real estate professional? We&apos;re always looking for talented agents to join our award-winning team.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 mb-10">
              {["Competitive Commission", "Training & Mentorship", "Flexible Schedule"].map((p) => (
                <span key={p} className="flex items-center gap-2 text-white/60 text-sm"><FiCheck size={14} className="text-[#C9A84C] flex-shrink-0" />{p}</span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="shimmer inline-flex items-center gap-2 bg-[#C9A84C] text-white font-bold text-sm px-8 py-4 rounded-full cursor-pointer">
                Apply Now <FiArrowRight size={15} />
              </motion.button>
              <motion.button whileHover={{ backgroundColor: "rgba(255,255,255,1)", color: "#1A3C5E" }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }} className="inline-flex items-center gap-2 border border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full cursor-pointer">
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
