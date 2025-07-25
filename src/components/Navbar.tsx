"use client";

import Image from "next/image";
import logo from "../assets/logo_new_white_transparent.png";
import HowToPlay from "./HowToPlay";
import PrivacyPolicy from "./PrivacyPolicy";
import Settings from "./Settings";

export default function Navbar() {
  return (
    <nav className="w-full container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between px-6 py-3 bg-background/70 shadow-md rounded-xl border border-red-400">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={logo} alt="NOexistenceN Hub Logo" height={64} priority />
      </div>
      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        <HowToPlay />
        <PrivacyPolicy />
        <Settings />
      </div>
    </nav>
  );
}
