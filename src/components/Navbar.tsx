"use client";

import Image from "next/image";
import logo from "../assets/logo.webp";
import HowToPlay from "./HowToPlay";
import PrivacyPolicy from "./PrivacyPolicy";
import Settings from "./Settings";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Desktop version */}
      <nav className="hidden md:flex flex-col md:flex-row gap-4 items-center justify-between px-6 py-3 bg-background/70 shadow-md rounded-xl border border-red-400">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="NOexistenceN-quotedle Logo"
            height={48}
            priority
          />
        </div>
        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <HowToPlay />
          <PrivacyPolicy isOnMobile={false} />
          <Settings isOnMobile={false} />
        </div>
      </nav>
      {/* Mobile version */}
      <nav className="md:hidden bg-background/70 shadow-md px-6 py-3">
        <div className="flex items-center justify-between">
          <Image
            src={logo}
            alt="NOexistenceN-quotedle Logo"
            height={32}
            priority
          />
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-col justify-center gap-2">
                <HowToPlay />
                <PrivacyPolicy isOnMobile={true} />
                <Settings isOnMobile={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
