"use client";

import Image from "next/image";
import logo from "../assets/logo_white_transparent.png";
import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Settings from "./Settings";

export default function Navbar() {
  return (
    <nav className="w-full m-6 mt-2 md:mt-6 container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between px-6 py-3 bg-background/70 shadow-md rounded-xl border border-red-400">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={logo} alt="NOexistenceN Hub Logo" height={64} priority />
      </div>
      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              <InfoIcon /> How to play
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to play</DialogTitle>
              <DialogDescription>
                A step-by-step guide to how to play the game.
              </DialogDescription>
            </DialogHeader>
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
          </DialogContent>
        </Dialog>
        <Settings />
      </div>
    </nav>
  );
}
