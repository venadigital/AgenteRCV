"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  UserRoundCog,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type PrereqCardItem = {
  id: string;
  label: string;
  title: string;
  items: readonly string[];
  tone?: "light" | "dark";
  iconKey: "inicio" | "piloto" | "post";
};

const iconMap = {
  inicio: CheckCircle2,
  piloto: Workflow,
  post: UserRoundCog,
} as const;

const accentMap = {
  light: "from-[#bccf03]/24 via-[#006667]/6 to-transparent",
  dark: "from-[#006667]/25 via-[#083334]/18 to-[#083334]/8",
} as const;

export function AnimatedPrerequisites({
  items,
  autoplay = false,
  className,
}: {
  items: readonly PrereqCardItem[];
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => (prev + 1) % items.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(handleNext, 5500);
    return () => window.clearInterval(timer);
  }, [autoplay, items.length]);

  const current = items[active];
  const Icon = iconMap[current.iconKey];
  const isDark = current.tone === "dark";

  return (
    <div className={cn("relative", className)}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-3 h-full rounded-2xl border border-[#006667]/8 bg-white/75 shadow-[0_12px_28px_rgba(0,102,103,0.05)]"
        animate={{
          y: 10,
          rotate: active % 2 === 0 ? -1 : 1,
          scale: 0.986,
          opacity: 0.72,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-7 top-6 h-full rounded-2xl border border-[#006667]/7 bg-white/60 shadow-[0_10px_22px_rgba(0,102,103,0.04)]"
        animate={{
          y: 18,
          rotate: active % 2 === 0 ? 1.3 : -1.3,
          scale: 0.972,
          opacity: 0.55,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border p-4 shadow-[0_10px_24px_rgba(0,102,103,0.06)] sm:p-5",
          isDark
            ? "border-[#006667]/15 bg-[#083334] text-white"
            : "border-[#006667]/10 bg-white text-[#083334]",
        )}
      >
        <motion.div
          key={`prereq-accent-${active}`}
          aria-hidden
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br",
            accentMap[isDark ? "dark" : "light"],
          )}
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ y: 14, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -10, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "rounded-xl p-2 shadow-sm",
                    isDark
                      ? "bg-white/10 text-[#bccf03]"
                      : "bg-[#bccf03]/20 text-[#083334]",
                  )}
                >
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-widest",
                      isDark ? "text-white/75" : "text-[#006667]/75",
                    )}
                  >
                    {current.label}
                  </p>
                  <h4
                    className={cn(
                      "mt-1 text-base font-bold tracking-tight sm:text-xl",
                      isDark ? "text-white" : "text-[#083334]",
                    )}
                  >
                    {current.title}
                  </h4>
                </div>

                <span
                  className={cn(
                    "ml-auto shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
                    isDark
                      ? "border-white/10 bg-white/5 text-white/75"
                      : "border-[#006667]/10 bg-white/85 text-[#006667]/75",
                  )}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-4 grid gap-2">
                {current.items.map((line, index) => (
                  <motion.div
                    key={`${current.id}-${index}`}
                    initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.2,
                      delay: 0.04 + index * 0.035,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm leading-6",
                      isDark
                        ? "border-white/10 bg-white/5 text-white/95"
                        : "border-[#006667]/10 bg-[#f6f6f8] text-[#083334]/90",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-2 inline-block size-1.5 shrink-0 rounded-full",
                        isDark ? "bg-[#bccf03]" : "bg-[#006667]",
                      )}
                    />
                    <span>{line}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-full border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:px-3 sm:text-[11px] sm:tracking-widest",
                  active === index
                    ? isDark
                      ? "border-[#bccf03]/35 bg-[#bccf03]/10 text-white"
                      : "border-[#006667]/20 bg-[#006667]/5 text-[#006667]"
                    : isDark
                      ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      : "border-[#006667]/10 bg-white text-[#006667]/70 hover:border-[#006667]/20",
                )}
                aria-label={`Ir a ${item.title}`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              className={cn(
                "group/button flex h-8 w-8 items-center justify-center rounded-full border",
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-[#006667]/12 bg-[#f6f6f8]",
              )}
              aria-label="Anterior"
            >
              <ArrowLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-300 group-hover/button:-translate-x-0.5",
                  isDark ? "text-white" : "text-[#083334]",
                )}
              />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={cn(
                "group/button flex h-8 w-8 items-center justify-center rounded-full border",
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-[#006667]/12 bg-[#f6f6f8]",
              )}
              aria-label="Siguiente"
            >
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5",
                  isDark ? "text-white" : "text-[#083334]",
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
