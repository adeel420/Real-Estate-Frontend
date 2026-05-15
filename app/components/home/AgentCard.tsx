"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPhone, FiMail } from "react-icons/fi";
import Badge from "../ui/Badge";
import { scaleIn } from "../../../lib/animations";

export type Agent = {
  id: number;
  name: string;
  role: string;
  specialty: string;
  deals: number;
  exp: number;
  rating: number;
  img: string;
  category: string;
};

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image area */}
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={agent.img}
          alt={agent.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge className="bg-[#C9A84C] text-white text-[10px] font-bold tracking-wide">
            {agent.specialty}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-[#0D0D0D] text-lg leading-tight">{agent.name}</h3>
        <p className="text-gray-400 text-sm mt-0.5 mb-3">{agent.role}</p>

        <div className="border-t border-gray-100 pt-3 mb-3">
          <div className="flex items-center justify-between text-center">
            <div>
              <p className="text-[#0D0D0D] font-bold text-sm">{agent.deals}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Deals</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div>
              <p className="text-[#0D0D0D] font-bold text-sm">{agent.exp} yrs</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Experience</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div>
              <p className="text-[#0D0D0D] font-bold text-sm">{agent.rating}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Rating</p>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-2 mb-4">
          {[FiPhone, FiMail].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-colors duration-200"
            >
              <Icon size={13} />
            </motion.a>
          ))}
        </div>

        {/* View Profile button */}
        <Link href={`/agents/${agent.id}`} className="block">
          <motion.div
            whileHover={{ backgroundColor: "#C9A84C", color: "#ffffff", borderColor: "#C9A84C" }}
            transition={{ duration: 0.2 }}
            className="w-full border border-gray-200 text-[#0D0D0D] text-sm font-semibold py-2.5 rounded-xl cursor-pointer text-center"
          >
            View Profile
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
