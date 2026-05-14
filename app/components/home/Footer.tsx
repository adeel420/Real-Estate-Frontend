import Link from "next/link";
import Image from "next/image";

const links = {
  Company:  ["About Us", "Careers", "Press", "Blog", "Contact"],
  Cities:   ["New York", "Los Angeles", "Chicago", "Miami", "Seattle"],
  Legal:    ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <Image src="/logo.png" alt="LuxEstate" width={120} height={22} className="mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-[220px]">
              Premium real estate services for discerning buyers, sellers, and investors.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors duration-200">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide mb-5 text-white">Company</h4>
            <ul className="space-y-3">
              {links.Company.map((l) => (
                <li key={l}><Link href="#" className="text-gray-400 text-sm hover:text-[#C9A84C] transition-colors duration-200">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Cities */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide mb-5 text-white">Top Cities</h4>
            <ul className="space-y-3">
              {links.Cities.map((l) => (
                <li key={l}><Link href="#" className="text-gray-400 text-sm hover:text-[#C9A84C] transition-colors duration-200">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide mb-5 text-white">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>📍 123 Luxury Ave, New York, NY</li>
              <li>📞 +1 (800) 555-0199</li>
              <li>✉️ hello@luxestate.com</li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold px-3 py-1.5 rounded-full">
                  Mon–Sat: 9am – 7pm
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} LuxEstate. All rights reserved.</p>
          <div className="flex gap-5">
            {links.Legal.map((l) => (
              <Link key={l} href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors duration-200">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
