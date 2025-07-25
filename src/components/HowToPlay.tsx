import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export default function HowToPlay() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <InfoIcon /> How to play
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="h-100 sm:h-120 md:h-fit">
          <DialogHeader>
            <DialogTitle>How to play</DialogTitle>
            <DialogDescription>
              A step-by-step guide to how to play the game.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
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
              <li>
                After guessing all 5 quotes, you will be able to see exactly how
                you performed.
              </li>
              <li>Quotes change each day. Good luck!</li>
            </ol>
            <Separator orientation="horizontal" />
            <footer className="flex flex-col gap-2">
              <DialogHeader>
                <DialogTitle>Credits</DialogTitle>
              </DialogHeader>
              <div>
                Website logo, favicon, as well as the background images and
                quotes used come from{" "}
                <a
                  href="https://store.steampowered.com/app/2873080/The_NOexistenceN_of_you_AND_me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &apos;The NOexistenceN of you AND me&apos;
                </a>{" "}
                , belonging to &copy;{" "}
                <span className="font-bold">Fontainebleau</span>. All rights
                belong to their respective owners.
              </div>
              <div>
                <p className="mb-2">Special thanks to: </p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>
                    <span className="font-bold">Fontainebleau</span>, for
                    creating such an amazing game
                  </li>
                  <li>
                    <span className="font-bold">You</span>, for trying this game
                    out
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground text-end">
                &copy; 2025{" "}
                <a
                  href="https://xchrl.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  xchrl
                </a>
              </p>
            </footer>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
