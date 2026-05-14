import Image from "next/image";
import React from "react";
import { navLinks } from "./../data/Data"
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-transparent py-6 px-6 flex items-center justify-between">
      <Image src="/logo.png" alt="img" width={130} height={22} priority />
      <div className="flex items-center gap-6 text-white">
        {navLinks.map((nav) => (
          <Link key={nav.link} href={nav.link} className="text-sm ">{nav.title}</Link>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-white text-sm"><FiPhone /> +92 320 9430934</span>
        <span className="flex items-center gap-2 text-white text-sm"><FaRegUserCircle /></span>
        <button className="border bg-transparent cursor-pointer text-white w-[128px] h-[42px] rounded-full text-[15px] ">Add Property</button>
      </div>
    </div>
  );
};

export default Header;
