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
import Image, { type StaticImageData } from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { useEffect, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ScrollArea } from "./ui/scroll-area";
import defaultBackground from "@/assets/backgrounds/wonderland/1.png";

export default function Settings() {
  const [settings, setSettings] = useState<{
    storage: boolean;
    background_source: string;
  }>({
    storage: true,
    background_source: "",
  });

  useEffect(() => {
    const storageSettings = localStorage.getItem("settings");
    if (storageSettings) {
      const settingsData = JSON.parse(storageSettings);
      document.body.style.backgroundImage = `url("${settingsData.background_source}")`;
      if (settingsData.storage !== undefined)
        setSettings((prevSettings) => ({
          ...prevSettings,
          storage: settingsData.storage,
        }));
      if (settingsData.background_source)
        setSettings((prevSettings) => ({
          ...prevSettings,
          background_source: settingsData.background_source,
        }));
    } else {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          background_source: defaultBackground.src,
          storage: true,
        })
      );
      document.body.style.backgroundImage = `url("${defaultBackground.src}")`;
    }
  }, []);

  const handleBackgroundChange = (image: StaticImageData) => {
    document.body.style.backgroundImage = `url("${image.src}")`;
    const settings = localStorage.getItem("settings");
    if (settings) {
      const settingsData = JSON.parse(settings);
      settingsData.background_source = image.src;
      localStorage.setItem("settings", JSON.stringify(settingsData));
    }
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="rounded-full aspect-square"
        >
          <SettingsIcon />
        </Button>
      </DialogTrigger>
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
                <ScrollArea className="h-96">
                  {backgrounds.map(({ label, value, images }) => (
                    <AccordionItem value={value} key={value}>
                      <AccordionTrigger>{label}</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-3 gap-4">
                          {images.map((image, index) => (
                            <AspectRatio ratio={16 / 9} key={index}>
                              <Image
                                src={image.src}
                                width={1080}
                                height={608}
                                alt={`${label} ${index + 1}`}
                                className="rounded-lg duration-150 hover:brightness-60 hover:cursor-pointer"
                                onClick={() => handleBackgroundChange(image)}
                              />
                            </AspectRatio>
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
