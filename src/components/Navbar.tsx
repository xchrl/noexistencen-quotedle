"use client";

import Image from "next/image";
import logo from "../assets/logo.webp";
import HowToPlay from "./HowToPlay";
import PrivacyPolicy from "./PrivacyPolicy";
import Settings from "./Settings";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import globals from "@/lib/globals";

const routes = [
  {
    route: "/",
    label: "Daily Mode",
    tooltip: `Guess ${globals.DAILY_QUOTES} randomly selected quotes each day.`,
  },
  {
    route: "/endless",
    label: "Endless Mode",
    tooltip: "Guess quotes until you're wrong.",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName = usePathname();

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
        {/* Links */}
        <div className="flex gap-4">
          {routes.map((route) =>
            route.route === pathName ? (
              <Tooltip key={route.route}>
                <TooltipTrigger asChild>
                  <span>{route.label}</span>
                </TooltipTrigger>
                <TooltipContent>{route.tooltip}</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip key={route.route}>
                <TooltipTrigger asChild>
                  <Link href={route.route}>{route.label}</Link>
                </TooltipTrigger>
                <TooltipContent>{route.tooltip}</TooltipContent>
              </Tooltip>
            )
          )}
        </div>
        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <HowToPlay mode={pathName === "/" ? "daily" : "endless"} />
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
                <div className="flex gap-4 justify-center">
                  {routes.map((route) =>
                    route.route === pathName ? (
                      <span key={route.route}>{route.label}</span>
                    ) : (
                      <Link key={route.route} href={route.route}>
                        {route.label}
                      </Link>
                    )
                  )}
                </div>
                <HowToPlay mode={pathName === "/" ? "daily" : "endless"} />
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
