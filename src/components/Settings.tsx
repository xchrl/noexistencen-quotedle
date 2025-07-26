import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
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
import { useEffect, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ScrollArea } from "./ui/scroll-area";
import defaultBackground from "@/assets/backgrounds/wonderland/1.webp";
import uploadLocalStorage from "@/lib/uploadLocalStorage";

function cookieExists(name: string) {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(name + "="));
}

export default function Settings({ isOnMobile }: { isOnMobile: boolean }) {
  const [settings, setSettings] = useState<{
    storage: boolean;
    background: string;
  }>({
    storage: true,
    background: "",
  });

  const setBackgroundImage = (src: string) => {
    const background = document.getElementById("background");
    if (background) {
      background.style.backgroundImage = `url(${src})`;
    }
  };

  useEffect(() => {
    const storageSettings = localStorage.getItem("settings");
    if (storageSettings) {
      const settingsData = JSON.parse(storageSettings);
      if (settingsData.storage !== undefined)
        setSettings((prevSettings) => ({
          ...prevSettings,
          storage: settingsData.storage,
        }));
      if (settingsData.background)
        setSettings((prevSettings) => ({
          ...prevSettings,
          background: settingsData.background,
        }));
    } else {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          background: defaultBackground.src,
          storage: true,
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
    uploadLocalStorage();
  };

  const handleGeneralSettingsChange = (setting: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: checked,
    }));

    const settings = localStorage.getItem("settings");
    if (settings) {
      const settingsData = JSON.parse(settings);
      settingsData[setting] = checked;

      localStorage.setItem("settings", JSON.stringify(settingsData));
    }

    uploadLocalStorage();
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
                className="rounded-full aspect-square"
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
            <h2 className="text-xl font-bold">General settings</h2>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="storage"
                onCheckedChange={(checked) =>
                  handleGeneralSettingsChange("storage", checked as boolean)
                }
                checked={settings.storage as CheckedState}
              />
              <Label htmlFor="storage">
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p>
                        Allow storing your game data (i.e. streak, correct
                        guesses, etc.) on a separate server
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      This will allow you to keep your data in the case of
                      future updates, for example, user/password authentication.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </Label>
            </div>
          </section>
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
                            // <Image
                            //   key={index}
                            //   src={image}
                            //   alt={`${label} ${index + 1}`}
                            //   sizes="(max-width: 480px) 256px, (max-width: 640px) 384px, (max-width: 768px) 480px, 640px"
                            //   className="rounded-lg duration-150 hover:brightness-60 hover:cursor-pointer"
                            //   onClick={() => handleBackgroundChange(image)}
                            // />
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
