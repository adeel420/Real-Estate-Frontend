"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../lib/animations";
import { FiPlus, FiArrowRight } from "react-icons/fi";

const faqs = [
  {
    q: "How do I schedule a property viewing?",
    a: "You can schedule a viewing directly through our website by selecting a property and clicking 'Book a Tour', or by calling our office. We offer both in-person and virtual tours at your convenience.",
  },
  {
    q: "What documents do I need to buy a property?",
    a: "Typically you'll need a valid government-issued ID, proof of income (pay stubs or tax returns), bank statements for the past 3 months, and a pre-approval letter from your lender. Our agents will guide you through the full checklist.",
  },
  {
    q: "Do you offer mortgage assistance?",
    a: "Yes. We work with a network of trusted mortgage brokers and lenders who can help you find the best financing options. We offer free consultations to help you understand your borrowing capacity.",
  },
  {
    q: "How long does the buying process take?",
    a: "On average, the process takes 30–60 days from offer acceptance to closing. This can vary depending on financing, inspections, and negotiations. Our team works to keep things moving as efficiently as possible.",
  },
  {
    q: "Can I list my property with you?",
    a: "Absolutely. We offer full-service listing packages including professional photography, market analysis, and targeted digital marketing. Contact us for a free property valuation and listing consultation.",
  },
  {
    q: "What areas do you cover?",
    a: "We currently operate in 40+ cities across the United States, with a strong presence in New York, Los Angeles, Chicago, Miami, and Seattle. We're expanding rapidly — reach out to check availability in your area.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. We believe in full transparency. All fees are disclosed upfront before you sign anything. Our standard commission structure is clearly outlined in our service agreement.",
  },
  {
    q: "How do I get a property valuation?",
    a: "Request a free valuation through our website or by contacting an agent directly. We use a combination of recent comparable sales, market trends, and a physical inspection to provide an accurate estimate.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number>(0);

  return (
    <section ref={ref} className="py-24 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16">

          {/* Left — sticky */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-[#0D0D0D] text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
              Frequently<br />Asked<br />Questions
            </motion.h2>
            <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#C9A84C] rounded-full mb-5" />
            <motion.p variants={fadeUp} className="text-gray-500 text-sm leading-relaxed mb-8 max-w-[300px]">
              Everything you need to know about buying, selling, and renting with LuxEstate. Can't find an answer? Reach out to our team.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="#"
                className="group inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:underline underline-offset-4 transition-all"
              >
                Still have questions? Contact us
                <FiArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="divide-y divide-gray-200"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ delay: i * 0.06 }}
                className="py-5"
              >
                {/* Question row */}
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className={`text-base font-medium transition-colors duration-200 ${open === i ? "text-[#C9A84C]" : "text-[#0D0D0D] group-hover:text-[#C9A84C]"}`}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex-shrink-0 text-[#C9A84C]"
                  >
                    <FiPlus size={18} />
                  </motion.span>
                </button>

                {/* Answer panel */}
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="text-gray-500 text-sm leading-relaxed pt-3 pb-2 max-w-[600px]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
