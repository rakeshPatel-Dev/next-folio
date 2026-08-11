"use client";

import Link from "next/link";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PullCordThemeToggler } from "@/components/ui/pullcord-theme-toggler";

import { Github, Linkedin, Mail } from "lucide-react";

const socialDock = [
  { label: "GitHub", icon: Github, href: "https://github.com/rakeshPatel-Dev" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/101rakesh" },
  { label: "Email", icon: Mail, href: "mailto:rk5080976@gmail.com" },
];

export function AppDock() {
  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <TooltipProvider delayDuration={80}>
          <Dock direction="middle">

            {socialDock.map((item, i) => {
              const Icon = item.icon;
              return (
                <DockIcon key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        aria-label={item.label}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12 rounded-full"
                        )}
                      >
                        <Icon className="size-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{item.label}</TooltipContent>
                  </Tooltip>
                </DockIcon>
              );
            })}


          </Dock>
        </TooltipProvider>
      </div>

      {/* Theme toggle */}
      <PullCordThemeToggler />
    </>
  );
}
