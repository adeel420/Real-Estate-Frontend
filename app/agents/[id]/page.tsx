"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPhone, FiMail, FiMapPin, FiStar, FiCheck, FiSend, FiArrowRight } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";
import Badge from "../../components/ui/Badge";
import { fadeUp, staggerContainer, scaleIn } from "../../../lib/animations";
import agents from "../../../lib/agents";
import properties from "../../../lib/properties";

const inputClass = "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm outline-none focus:border-[#C9A84C]/60 transition-colors";

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = agents.find((a) => a.id === Number(id));
  if (!agent) notFound();

  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState("");

  // Agent's listings — match by agentName
  const agentListings = properties.filter((p) => p.agentName === agent.name);

  const stars = (n: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} size={11} className={i < Math.round(n) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-gray-200"} />
    ));

  return (
    <div className="min-h-screen bg-[#F5F2ED]">

      {/* ── Hero Banner ── */}
      <section className="relative bg-[#1A3C5E] pt-20 pb-36 px-4 sm:px-6 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" alt="" fill className="object-cover opacity-10" />
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-1 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-[#C9A84C]/8 blur-[80px] orb-2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link href="/agents">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors cursor-pointer">
              <FiArrowLeft size={14} /> Back to Agents
            </motion.div>
          </Link>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            {/* Avatar */}
            <motion.div variants={scaleIn} className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-[#C9A84C]/40 flex-shrink-0 shadow-2xl">
              <Image src={agent.img} alt={agent.name} fill className="object-cover object-top" />
            </motion.div>

            {/* Info */}
            <motion.div variants={fadeUp} className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#C9A84C] text-white text-[10px] font-bold tracking-wide">{agent.specialty}</Badge>
                <div className="flex items-center gap-1 text-[#C9A84C]">
                  <MdOutlineVerified size={16} />
                  <span className="text-[#C9A84C] text-xs font-semibold">Verified Agent</span>
                </div>
              </div>
              <h1 className="font-serif font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">{agent.name}</h1>
              <p className="text-white/60 text-base mt-1">{agent.role}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  {stars(agent.rating)}
                  <span className="text-white font-bold text-sm ml-1">{agent.rating}</span>
                  <span className="text-white/40 text-xs">({agent.reviews.length} reviews)</span>
                </div>
                <span className="text-white/20">|</span>
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <FiMapPin size={12} className="text-[#C9A84C]" /> {agent.city}
                </div>
              </div>
            </motion.div>

            {/* Quick contact */}
            <motion.div variants={fadeUp} className="flex gap-2 flex-shrink-0">
              <a href={`tel:${agent.phone}`}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-[#C9A84C] text-white font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer">
                  <FiPhone size={13} /> Call
                </motion.div>
              </a>
              <a href={`mailto:${agent.email}`}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer hover:bg-white/20 transition-colors">
                  <FiMail size={13} /> Email
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip (overlapping hero) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl border border-gray-100 shadow-lg grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100"
        >
          {[
            { value: agent.deals,          label: "Deals Closed"    },
            { value: `${agent.exp} yrs`,   label: "Experience"      },
            { value: agent.activeListings, label: "Active Listings" },
            { value: agent.responseTime,   label: "Response Time"   },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center py-5 px-4">
              <p className="font-serif font-bold text-[#1A3C5E] text-2xl leading-none">{value}</p>
              <p className="text-gray-400 text-xs mt-1.5 tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">About</p>
              <h2 className="font-serif font-bold text-[#0D0D0D] text-2xl mb-1">About {agent.name.split(" ")[0]}</h2>
              <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed">{agent.bio}</p>

              {/* Specialties */}
              <div className="mt-5 flex flex-wrap gap-2">
                {agent.specialties.map((s) => (
                  <span key={s} className="flex items-center gap-1.5 text-xs bg-[#F5F2ED] text-[#1A3C5E] font-semibold px-3 py-1.5 rounded-full border border-[#1A3C5E]/10">
                    <FiCheck size={10} className="text-[#C9A84C]" /> {s}
                  </span>
                ))}
              </div>

              {/* Languages + contact */}
              <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Languages</p>
                  <p className="font-semibold text-[#0D0D0D]">{agent.languages.join(", ")}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Phone</p>
                  <a href={`tel:${agent.phone}`} className="font-semibold text-[#1A3C5E] hover:text-[#C9A84C] transition-colors">{agent.phone}</a>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Email</p>
                  <a href={`mailto:${agent.email}`} className="font-semibold text-[#1A3C5E] hover:text-[#C9A84C] transition-colors truncate block">{agent.email}</a>
                </div>
              </div>
            </motion.div>

            {/* Listings */}
            {agentListings.length > 0 && (
              <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Portfolio</p>
                <h2 className="font-serif font-bold text-[#0D0D0D] text-2xl mb-1">Active Listings</h2>
                <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agentListings.map((p) => (
                    <Link key={p.id} href={`/properties/${p.id}`}>
                      <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <div className="relative h-36 overflow-hidden">
                          <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-2 left-2">
                            <Badge className={p.type === "For Rent" ? "bg-[#1a5c5c] text-white text-[9px] font-bold" : "bg-[#1A3C5E] text-white text-[9px] font-bold"}>
                              {p.type === "For Rent" ? "FOR RENT" : "FOR SALE"}
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <span className="text-white font-extrabold text-sm drop-shadow-lg">{p.price}</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="font-serif font-bold text-[#0D0D0D] text-sm leading-snug truncate">{p.title}</p>
                          <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5 mb-2">
                            <FiMapPin size={9} /> {p.location}
                          </div>
                          <div className="flex items-center gap-3 text-gray-400 text-xs border-t border-gray-50 pt-2">
                            {p.beds !== undefined && <span className="flex items-center gap-1"><IoBedOutline size={11} /> {p.beds}</span>}
                            {p.baths !== undefined && <span className="flex items-center gap-1"><IoWaterOutline size={11} /> {p.baths}</span>}
                            <span className="flex items-center gap-1"><BiArea size={11} /> {p.area} sqft</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Testimonials</p>
              <h2 className="font-serif font-bold text-[#0D0D0D] text-2xl mb-1">Client Reviews</h2>
              <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-6" />
              <div className="space-y-4">
                {agent.reviews.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="bg-[#F5F2ED] rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#1A3C5E] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {r.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0D0D0D] text-sm">{r.name}</p>
                          <p className="text-gray-400 text-[10px]">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">{stars(r.rating)}</div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-5">

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1A3C5E] rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10">
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Direct Message</p>
                <h3 className="font-serif font-bold text-white text-xl mb-1">Contact {agent.name.split(" ")[0]}</h3>
                <div className="w-8 h-[3px] bg-[#C9A84C] rounded-full mb-5" />

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center mb-3">
                      <FiCheck size={20} className="text-[#C9A84C]" />
                    </div>
                    <p className="font-serif font-bold text-white text-lg">Message Sent!</p>
                    <p className="text-white/50 text-xs mt-1 max-w-[200px]">{agent.name.split(" ")[0]} will reply within {agent.responseTime}.</p>
                    <button onClick={() => { setSubmitted(false); setMsg(""); }} className="mt-4 text-white/50 text-xs hover:text-white transition-colors cursor-pointer">Send another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
                    <div>
                      <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Your Name</label>
                      <input required placeholder="Ahmed Khan" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Phone</label>
                      <input placeholder="+92 300 0000000" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Message</label>
                      <textarea required rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={`Hi ${agent.name.split(" ")[0]}, I'm interested in…`} className={`${inputClass} resize-none`} />
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="shimmer w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white font-bold text-sm py-3 rounded-xl transition-colors cursor-pointer">
                      <FiSend size={13} /> Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Agent quick info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Quick Info</p>
              <div className="space-y-3 text-sm">
                {[
                  { label: "City",           value: agent.city },
                  { label: "Experience",     value: `${agent.exp} years` },
                  { label: "Deals Closed",   value: String(agent.deals) },
                  { label: "Active Listings",value: String(agent.activeListings) },
                  { label: "Response Time",  value: agent.responseTime },
                  { label: "Languages",      value: agent.languages.join(", ") },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold text-[#0D0D0D] text-right max-w-[55%]">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rating summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#C9A84C] rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
              <div className="relative z-10 flex items-center gap-4">
                <div>
                  <p className="font-serif font-black text-[#0D0D0D] text-5xl leading-none">{agent.rating}</p>
                  <div className="flex items-center gap-0.5 mt-1">{stars(agent.rating)}</div>
                  <p className="text-[#0D0D0D]/60 text-xs mt-1">{agent.reviews.length} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3].map((n) => {
                    const count = agent.reviews.filter((r) => Math.round(r.rating) === n).length;
                    const pct   = Math.round((count / agent.reviews.length) * 100);
                    return (
                      <div key={n} className="flex items-center gap-2">
                        <span className="text-[#0D0D0D]/60 text-[10px] w-3">{n}</span>
                        <div className="flex-1 h-1.5 bg-[#0D0D0D]/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.5, duration: 0.6 }} className="h-full bg-[#0D0D0D]/40 rounded-full" />
                        </div>
                        <span className="text-[#0D0D0D]/50 text-[10px] w-6">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Other agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Other Agents</p>
              <div className="space-y-3">
                {agents.filter((a) => a.id !== agent.id).slice(0, 3).map((a) => (
                  <Link key={a.id} href={`/agents/${a.id}`}>
                    <motion.div whileHover={{ x: 4, transition: { duration: 0.2 } }} className="flex items-center gap-3 cursor-pointer group py-1">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={a.img} alt={a.name} fill className="object-cover object-top" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0D0D0D] text-sm group-hover:text-[#1A3C5E] transition-colors truncate">{a.name}</p>
                        <p className="text-gray-400 text-xs truncate">{a.role}</p>
                      </div>
                      <FiArrowRight size={13} className="text-gray-300 group-hover:text-[#C9A84C] transition-colors flex-shrink-0" />
                    </motion.div>
                  </Link>
                ))}
              </div>
              <Link href="/agents">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4 w-full border border-gray-200 text-[#0D0D0D] text-sm font-semibold py-2.5 rounded-xl hover:bg-[#1A3C5E] hover:text-white hover:border-[#1A3C5E] transition-colors duration-200 cursor-pointer text-center">
                  View All Agents
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
