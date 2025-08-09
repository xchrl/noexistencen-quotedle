import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { CircleQuestionMarkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import globals from "@/lib/globals";

export default function PrivacyPolicy({ isOnMobile }: { isOnMobile: boolean }) {
  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          {isOnMobile ? (
            <Button type="button" variant="outline">
              <CircleQuestionMarkIcon /> Privacy Policy
            </Button>
          ) : (
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full aspect-square size-min"
              >
                <CircleQuestionMarkIcon />
              </Button>
            </TooltipTrigger>
          )}
        </DialogTrigger>
        <TooltipContent>Privacy Policy</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            {globals.PROJECT_NAME} | Last updated: 10-09-2025
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-100 sm:h-120 md:h-140">
          <div className="wrapper flex flex-col gap-6">
            <div>
              <p>
                We value your privacy and aim to be transparent about how your
                data is handled. This policy outlines the types of data we
                collect, how it&apos;s used, and your control over it.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-center mb-2">
                1. Data Stored in Your Browser
              </h2>
              <div>
                <p>
                  We store the following information locally in your browser
                  using <strong>localStorage</strong> and{" "}
                  <strong>cookies</strong>:
                </p>
                <ul className="list-disc pl-8">
                  <li>
                    <h3 className="font-bold">LocalStorage:</h3>
                  </li>
                  <ul className="list-disc pl-8">
                    <li>
                      Game statistics for the Daily Mode:
                      <ul className="list-disc pl-8">
                        <li>Current streak</li>
                        <li>Personal best</li>
                        <li>Total guesses</li>
                        <li>Correct guesses</li>
                      </ul>
                    </li>
                    <li>Player’s previous guesses for today</li>
                    <li>Today&apos;s date</li>
                    <li>
                      User settings:
                      <ul className="list-disc pl-8">
                        <li>Background image</li>
                      </ul>
                    </li>
                  </ul>
                </ul>
              </div>
              <ul className="list-disc pl-8">
                <li>
                  <h3 className="font-bold">Cookies:</h3>
                  <ul className="list-disc pl-8">
                    <li>Anonymous user UUID</li>
                    <li>Selected background image</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-center mb-2">
                2. Optional Data Sync to External Server
              </h2>
              <p>
                You have full control over whether your{" "}
                <strong>localStorage data</strong> is sent to our external
                server:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>
                  <strong>Opt-in/Opt-out Control:</strong>
                  <br />
                  <p className="text-muted-foreground">
                    In the <strong>Settings</strong>, you can check or uncheck
                    the option to allow your local data to be synced.
                  </p>
                </li>
                <li>
                  If <strong>disabled</strong>, your localStorage data remains{" "}
                  <strong>completely local</strong> and is{" "}
                  <strong>never sent or stored</strong> elsewhere.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-center mb-2">
                3. Analytics and Performance Monitoring
              </h2>
              <p>
                To understand how the site is used and improve performance, we
                use:
              </p>
              <ul className="list-disc pl-8">
                <li>
                  <strong>Vercel Web Analytics</strong> – Collects{" "}
                  <strong>anonymous usage statistics</strong> (e.g., page views,
                  device type, country).
                </li>
                <li>
                  <strong>Vercel Speed Insights</strong> – Helps us monitor{" "}
                  <strong>site speed and performance</strong>.
                </li>
              </ul>
              <p className="mt-4">
                These tools do <strong>not</strong> collect personal data and
                are compliant with modern privacy standards.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-center mb-2">
                4. No Personal Identification
              </h2>
              <p>
                We do <strong>not</strong> collect:
              </p>
              <ul className="list-disc pl-8">
                <li>Names</li>
                <li>Emails</li>
                <li>IP addresses (beyond what&apos;s anonymized by Vercel)</li>
                <li>Any personally identifiable information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-center mb-2">5. Contact</h2>
              <p>
                If you have any questions or concerns about this policy, feel
                free to reach out to me by:
              </p>
              <ul className="list-disc pl-8">
                <li>
                  Email:{" "}
                  <a href="mailto:michalbronicki85@gmail.com">
                    michalbronicki85@gmail.com
                  </a>
                </li>
                <li>
                  Twitter:{" "}
                  <a
                    href="https://x.com/_xchrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    _xchrl
                  </a>
                </li>
                <li>Discord: xchrl</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
