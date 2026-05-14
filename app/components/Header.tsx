"use client";

import Image from "next/image";
import React, { useState } from "react";
import { navLinks } from "./../data/Data";
import Link from "next/link";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-transparent relative z-50">
      {/* Main Nav Bar */}
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={130}
          height={22}
          priority
          className="flex-shrink-0"
        />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-white">
          {navLinks.map((nav) => (
            <Link
              key={nav.link}
              href={nav.link}
              className="text-sm hover:text-white/70 transition-colors duration-200"
            >
              {nav.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <span className="flex items-center gap-2 text-white text-sm whitespace-nowrap">
            <FiPhone className="flex-shrink-0" />
            +92 320 9430934
          </span>
          <span className="flex items-center text-white text-xl cursor-pointer hover:text-white/70 transition-colors">
            <FaRegUserCircle />
          </span>
          <button className="border border-white bg-transparent cursor-pointer text-white w-[128px] h-[42px] rounded-full text-[15px] hover:bg-white hover:text-[#1b4f5e] transition-all duration-200 flex-shrink-0">
            Add Property
          </button>
        </div>

        {/* Mobile: Phone + Hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          <a
            href="tel:+923209430934"
            className="text-white text-lg sm:flex hidden"
          >
            <FiPhone />
          </a>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col px-4 pb-5 pt-2 border-t border-white/20 gap-1">
          {navLinks.map((nav) => (
            <Link
              key={nav.link}
              href={nav.link}
              onClick={() => setMenuOpen(false)}
              className="text-white text-sm py-2.5 px-2 rounded-md hover:bg-white/10 transition-colors duration-150"
            >
              {nav.title}
            </Link>
          ))}

          {/* Mobile Actions */}
          <div className="mt-3 pt-3 border-t border-white/20 flex flex-col gap-3">
            <a
              href="tel:+923209430934"
              className="flex items-center gap-2 text-white text-sm px-2"
            >
              <FiPhone />
              +92 320 9430934
            </a>
            <div className="flex items-center gap-2 text-white text-sm px-2 cursor-pointer">
              <FaRegUserCircle className="text-lg" />
              My Account
            </div>
            <button className="border border-white bg-transparent cursor-pointer text-white w-full h-[42px] rounded-full text-[15px] hover:bg-white hover:text-[#1b4f5e] transition-all duration-200 mt-1">
              Add Property
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;