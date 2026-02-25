"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleHashChange = () => {
      const hash = window.location.hash;
      const matching = items.find((item) => item.url === hash);
      if (matching) setActiveTab(matching.name);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-2 left-1/2 z-50 w-[calc(100vw-0.75rem)] -translate-x-1/2 md:top-0 md:bottom-auto md:w-auto md:pt-5",
        className,
      )}
    >
      <div className="mx-auto max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full items-center justify-center gap-1 rounded-full border border-[#006667]/12 bg-white/85 px-1 py-1 shadow-[0_12px_30px_rgba(0,102,103,0.12)] backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative shrink-0 cursor-pointer rounded-full px-2.5 py-2 text-sm font-semibold tracking-tight transition-colors md:px-4",
                "text-[#006667]/80 hover:text-[#006667]",
                isActive && "text-[#083334]",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.25} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full rounded-full border border-[#bccf03]/35 bg-[#bccf03]/10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-[#bccf03]">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-[#bccf03]/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-[#bccf03]/20 blur-md" />
                    <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-[#bccf03]/25 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
        </div>
      </div>

      {isMobile && (
        <div className="pointer-events-none mt-2 text-center text-[10px] font-semibold uppercase tracking-widest text-[#006667]/45 md:hidden">
          Navegación
        </div>
      )}
    </div>
  );
}
