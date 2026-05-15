"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight, FiCheck, FiSend } from "react-icons/fi";
import { fadeUp, staggerContainer } from "../../lib/animations";

const contactInfo = [
  {
    icon: FiMapPin,
    label: "Visit Us",
    value: "DHA Phase 5, Lahore, Pakistan",
    sub: "Main Office",
  },
  {
    icon: FiPhone,
    label: "Call Us",
    value: "+92 300 1234567",
    sub: "Mon – Sat, 9am – 7pm",
  },
  {
    icon: FiMail,
    label: "Email Us",
    value: "hello@luxestate.pk",
    sub: "We reply within 24 hours",
  },
  {
    icon: FiClock,
    label: "Working Hours",
    value: "Mon – Sat: 9am – 7pm",
    sub: "Sunday: By Appointment",
  },
];

const offices = [
  { city: "Lahore", address: "DHA Phase 5, Main Boulevard", phone: "+92 300 1234567" },
  { city: "Karachi", address: "Clifton Block 4, Sea View", phone: "+92 321 9876543" },
  { city: "Islamabad", address: "F-7 Markaz, Blue Area", phone: "+92 333 4567890" },
];

const inputClass =
  "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm outline-none focus:border-[#C9A84C]/60 transition-colors";

export default function ContactPage() {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#1A3C5E] pt-20 pb-28 px-4 sm:px-6">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="contact"
          fill
          className="object-cover object-center opacity-10"
        />

        {/* Ambient orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-1 pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
                Get In Touch
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-serif font-bold text-white text-4xl lg:text-6xl tracking-tight leading-tight max-w-2xl"
            >
              We&apos;d Love to <span className="text-[#C9A84C] italic">Hear</span> From You
            </motion.h1>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-4" />
            <motion.p variants={fadeUp} className="text-white/50 text-base mt-4 max-w-lg leading-relaxed">
              Whether you&apos;re buying, selling, or just exploring — our team is ready to guide you every step of the way.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section ref={infoRef} className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-10 mb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={infoInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {contactInfo.map(({ icon: Icon, label, value, sub }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1A3C5E]/8 flex items-center justify-center">
                <Icon size={18} className="text-[#1A3C5E]" />
              </div>
              <div>
                <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase mb-0.5">{label}</p>
                <p className="font-serif font-bold text-[#0D0D0D] text-sm leading-snug">{value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Form + Map ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Contact Form ── */}
          <div ref={formRef} className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1A3C5E] rounded-3xl overflow-hidden relative"
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "28px 28px" }}
              />

              <div className="relative z-10 p-8 sm:p-10">
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Send a Message</p>
                <h2 className="font-serif font-bold text-white text-3xl mb-1">Let&apos;s Talk</h2>
                <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-8" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center mb-5">
                      <FiCheck size={28} className="text-[#C9A84C]" />
                    </div>
                    <h3 className="font-serif font-bold text-white text-2xl mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-6 border border-white/20 text-white/70 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Full Name</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Ahmed Raza"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="ahmed@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Phone</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+92 300 0000000"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Subject</label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          className={`filter-select ${inputClass}`}
                        >
                          <option value="" className="bg-[#1A3C5E] text-white">Select a topic</option>
                          <option value="buy" className="bg-[#1A3C5E] text-white">I want to Buy</option>
                          <option value="sell" className="bg-[#1A3C5E] text-white">I want to Sell</option>
                          <option value="rent" className="bg-[#1A3C5E] text-white">I want to Rent</option>
                          <option value="invest" className="bg-[#1A3C5E] text-white">Investment Inquiry</option>
                          <option value="other" className="bg-[#1A3C5E] text-white">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase block mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your requirements..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="shimmer w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white font-bold text-sm py-3.5 rounded-xl transition-colors cursor-pointer mt-2"
                    >
                      <FiSend size={14} />
                      Send Message
                      <FiArrowRight size={14} />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Map + Offices ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden h-64 bg-[#1A3C5E]/10 border border-gray-100 shadow-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="map"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C5E]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2 shadow-lg">
                  <FiMapPin size={14} className="text-[#C9A84C]" />
                  <span className="text-[#0D0D0D] font-semibold text-sm">DHA Phase 5, Lahore</span>
                </div>
              </div>
            </motion.div>

            {/* Office locations */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Our Offices</p>
              <h3 className="font-serif font-bold text-[#0D0D0D] text-xl mb-1">Find Us Near You</h3>
              <div className="w-8 h-[3px] bg-[#C9A84C] rounded-full mb-5" />
              <div className="space-y-4">
                {offices.map((office, i) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, x: -12 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1A3C5E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-bold">{office.city.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#0D0D0D] text-sm">{office.city}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{office.address}</p>
                      <p className="text-[#C9A84C] text-xs font-medium mt-0.5">{office.phone}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#C9A84C] rounded-3xl p-6 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "18px 18px" }}
              />
              <div className="relative z-10">
                <p className="font-serif font-black text-[#0D0D0D] text-2xl leading-tight mb-1">
                  Need Urgent Help?
                </p>
                <p className="text-[#0D0D0D]/60 text-sm mb-4 leading-relaxed">
                  Call us directly for immediate assistance with your property needs.
                </p>
                <a href="tel:+923001234567">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-[#0D0D0D] text-white font-bold text-sm px-5 py-2.5 rounded-full cursor-pointer"
                  >
                    <FiPhone size={13} />
                    +92 300 1234567
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ Strip ── */}
      <section className="bg-[#1A3C5E] py-16 px-4 sm:px-6" style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }}>
        <div className="max-w-7xl mx-auto pt-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-10"
          >
            <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quick Answers</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-white text-3xl lg:text-4xl">Common Questions</motion.h2>
            <motion.div variants={fadeUp} className="w-14 h-[3px] bg-[#C9A84C] rounded-full mx-auto mt-3" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { q: "How quickly do you respond?", a: "We respond to all inquiries within 24 hours on business days." },
              { q: "Do you charge for consultations?", a: "No — initial consultations are completely free of charge." },
              { q: "Which cities do you operate in?", a: "We currently operate in Lahore, Karachi, Islamabad, Rawalpindi, and Peshawar." },
              { q: "Can I list my property with you?", a: "Yes! Contact us and our team will guide you through the listing process." },
              { q: "Do you handle rental properties?", a: "Absolutely. We manage both sales and rental listings across all categories." },
              { q: "Is my data safe with you?", a: "Yes, we follow strict data privacy policies and never share your information." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck size={10} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{item.q}</p>
                    <p className="text-white/50 text-xs leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
