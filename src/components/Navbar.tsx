"use client";

import Image from "next/image";
import logo from "../assets/logo.svg";
import { Settings, InfoIcon } from "lucide-react";
import Modal from "./Modal";
import { useState } from "react";

export default function Navbar() {
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  return (
    <nav className="w-full m-6 mx-auto flex items-center justify-between px-6 py-3 bg-background/70 shadow-md rounded-xl border border-red-400">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={logo} alt="NOexistenceN Hub Logo" height={64} priority />
      </div>
      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="px-4 py-2 duration-150 rounded-md bg-primary-foreground hover:bg-secondary hover:text-accent hover:scale-110 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-sm font-medium flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            setHowToPlayOpen(true);
          }}
        >
          <InfoIcon /> How to play
        </button>
        <button
          type="button"
          className="rounded-full p-2 hover:bg-secondary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-700 hover:cursor-pointer"
          aria-label="Settings"
        >
          <Settings />
        </button>
      </div>
      <Modal
        open={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
        title="How to Play"
      >
        <ol className="list-decimal pl-5 space-y-2">
          <li>A quote will appear on the screen.</li>
          <li>
            Your task is to identify the correct finish to the quote by
            selecting one of the four options listed under the quote.
          </li>
          <li>
            You will immediately receive feedback if your guess was right or
            wrong. If the button turns green, your guess was correct; if it
            turns red, your guess was incorrect.
          </li>
        </ol>
      </Modal>
    </nav>
  );
}
