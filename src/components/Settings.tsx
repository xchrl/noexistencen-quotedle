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
import { useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import SaveDataButton from "./SaveDataButton";
import { createKey, getBackgroundByKey } from "@/lib/getBackgroundByKey";

function cookieExists(name: string) {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(name + "="));
}

export default function Settings({ isOnMobile }: { isOnMobile: boolean }) {
  const setBackgroundImage = (src: string | null) => {
    const background = document.getElementById("background");
    if (background && src) {
      background.style.backgroundImage = `url(${src})`;
    }
  };

  useEffect(() => {
    const defaultKey = "wonderland:0";
    const defaultSrc = getBackgroundByKey(defaultKey);

    const storageSettings = localStorage.getItem("settings");
    if (!storageSettings) {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          background: defaultKey,
        })
      );
      setBackgroundImage(defaultSrc);
    }

    const backgroundCookieExists = cookieExists("background");
    if (!backgroundCookieExists) {
      if (storageSettings) {
        const bg = JSON.parse(storageSettings).background;
        document.cookie = `background=${bg}; path=/; max-age=31536000`;
        setBackgroundImage(bg);
      } else {
        document.cookie = `background=${defaultKey}; path=/; max-age=31536000`;
        setBackgroundImage(defaultSrc);
      }
    }

    // Remove old backrgound cookies and make new ones
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("background="));

    const resetCookie = cookie && !cookie.includes(":");

    let resetLocal = false;
    if (storageSettings) {
      try {
        const parsed = JSON.parse(storageSettings);
        if (parsed.background && !parsed.background.includes(":")) {
          resetLocal = true;
        }
      } catch {}
    }

    if (resetCookie || resetLocal) {
      // Delete cookie
      document.cookie =
        "background=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Delete localStorage
      if (resetLocal) {
        localStorage.removeItem("settings");
      }

      // Set new default background
      const defaultKey = "wonderland:0";
      const defaultSrc = getBackgroundByKey(defaultKey);

      const newSettings = { background: defaultKey };
      localStorage.setItem("settings", JSON.stringify(newSettings));
      document.cookie = `background=${defaultKey}; path=/; max-age=31536000`;

      if (defaultSrc) {
        setBackgroundImage(defaultSrc);
      }

      return; // stop further code, we already reset everything
    }
  }, []);

  const handleBackgroundChange = (collection: string, index: number) => {
    const key = createKey(collection, index);
    const src = getBackgroundByKey(key);

    setBackgroundImage(src);

    const settings = localStorage.getItem("settings");
    if (settings) {
      const data = JSON.parse(settings);
      data.background = key;
      localStorage.setItem("settings", JSON.stringify(data));
    }

    document.cookie = `background=${key}; path=/; max-age=31536000`;
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
                                handleBackgroundChange(value, index)
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
