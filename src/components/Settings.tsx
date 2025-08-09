import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { SettingsIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import backgrounds from "@/lib/backgroundImages";
import { type StaticImageData } from "next/image";
import { useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import defaultBackground from "@/assets/backgrounds/wonderland/1.webp";
import SaveDataButton from "./SaveDataButton";

function cookieExists(name: string) {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(name + "="));
}

export default function Settings({ isOnMobile }: { isOnMobile: boolean }) {
  const setBackgroundImage = (src: string) => {
    const background = document.getElementById("background");
    if (background) {
      background.style.backgroundImage = `url(${src})`;
    }
  };

  useEffect(() => {
    const storageSettings = localStorage.getItem("settings");
    if (!storageSettings) {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          background: defaultBackground.src,
        })
      );
      setBackgroundImage(defaultBackground.src);
    }

    const backgroundCookieExists = cookieExists("background");
    if (!backgroundCookieExists) {
      if (storageSettings) {
        const bg = JSON.parse(storageSettings).background;
        document.cookie = `background=${encodeURIComponent(
          bg
        )}; path=/; max-age=31536000`;
        setBackgroundImage(bg);
      } else {
        document.cookie = `background=${encodeURIComponent(
          defaultBackground.src
        )}; path=/; max-age=31536000`;
        setBackgroundImage(defaultBackground.src);
      }
    }
  }, []);

  const handleBackgroundChange = (image: StaticImageData) => {
    setBackgroundImage(image.src);
    const settings = localStorage.getItem("settings");
    if (settings) {
      const settingsData = JSON.parse(settings);
      settingsData.background = image.src;
      localStorage.setItem("settings", JSON.stringify(settingsData));
    }

    document.cookie = `background=${encodeURIComponent(
      image.src
    )}; path=/; max-age=31536000`;
  };

  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          {isOnMobile ? (
            <Button type="button" variant="outline">
              <SettingsIcon /> Settings
            </Button>
          ) : (
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full aspect-square size-min"
              >
                <SettingsIcon />
              </Button>
            </TooltipTrigger>
          )}
        </DialogTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <DialogContent className="w-8/10">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your experience with{" "}
            <span className="text-accent">Lilith</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-8">
          <section className="space-y-2">
            <h2 className="text-xl font-bold">Backgrounds</h2>
            <div className="flex items-center space-x-2">
              <Accordion type="single" collapsible className="w-full">
                <ScrollArea className="h-48 md:h-96">
                  {backgrounds.map(({ label, value, images }) => (
                    <AccordionItem value={value} key={value}>
                      <AccordionTrigger>{label}</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {images.map((image, index) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={index}
                              src={image.small.src}
                              alt={`${label} ${index + 1}`}
                              className="rounded-sm duration-150 hover:brightness-60 hover:cursor-pointer"
                              onClick={() =>
                                handleBackgroundChange(image.normal)
                              }
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </ScrollArea>
              </Accordion>
            </div>
          </section>
          <section className="space-y-2 flex justify-end">
            <SaveDataButton />
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
