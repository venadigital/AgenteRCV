"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CircleHelp,
  Database,
  MessageSquareText,
  ShieldCheck,
  UserRoundSearch,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const capabilityIcons = [
  MessageSquareText,
  CalendarClock,
  Database,
  ShieldCheck,
  UserRoundSearch,
  CircleHelp,
] as const;

const capabilityAccent = [
  "from-[#bccf03]/28 to-[#006667]/6",
  "from-[#006667]/12 to-[#bccf03]/10",
  "from-[#bccf03]/18 to-[#083334]/8",
  "from-[#006667]/10 to-[#006667]/4",
  "from-[#bccf03]/22 to-transparent",
  "from-[#006667]/14 to-[#bccf03]/8",
] as const;

export function AnimatedCapabilities({
  items,
  autoplay = false,
  className,
}: {
  items: readonly string[];
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => (prev + 1) % items.length);
  const handlePrev = () =>
    setActive((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(handleNext, 5000);
    return () => window.clearInterval(timer);
  }, [autoplay, items.length]);

  const activeIconIndex = active % capabilityIcons.length;
  const ActiveIcon = capabilityIcons[activeIconIndex];

  return (
    <div className={cn("relative", className)}>
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-3 top-3 h-full rounded-2xl border border-[#006667]/8 bg-white/75",
          "shadow-[0_12px_28px_rgba(0,102,103,0.05)]",
        )}
        animate={{
          y: 10,
          rotate: active % 2 === 0 ? -1.25 : 1.25,
          scale: 0.985,
          opacity: 0.75,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-6 top-6 h-full rounded-2xl border border-[#006667]/7 bg-white/60",
          "shadow-[0_10px_20px_rgba(0,102,103,0.04)]",
        )}
        animate={{
          y: 18,
          rotate: active % 2 === 0 ? 1.5 : -1.5,
          scale: 0.97,
          opacity: 0.55,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />

      <div className="relative flex min-h-[17.5rem] flex-col justify-between rounded-2xl border border-[#006667]/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,102,103,0.05)] sm:min-h-[21rem]">
        <motion.div
          aria-hidden
          key={`accent-${active}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br",
            capabilityAccent[active % capabilityAccent.length],
          )}
        />
        <div className="relative">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 14, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -10, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#bccf03]/22 p-2 text-[#083334]">
                  <ActiveIcon className="size-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold tracking-tight text-[#083334] sm:text-lg">
                    Capacidad {active + 1}
                  </h4>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#006667]/70">
                    Función del agente
                  </p>
                </div>
                <span className="ml-auto rounded-full border border-[#006667]/10 bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#006667]/75">
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>

              <motion.p className="mt-4 text-sm leading-7 text-[#083334]/88 sm:mt-5 sm:text-base sm:leading-8">
                {items[active].split(" ").map((word, index) => (
                  <motion.span
                    key={`${active}-${word}-${index}`}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.18,
                      ease: "easeInOut",
                      delay: 0.015 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>

        <div className="relative mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  active === index ? "w-8 bg-[#006667]" : "w-2 bg-[#006667]/20",
                )}
                aria-label={`Ir a capacidad ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full border border-[#006667]/12 bg-[#f6f6f8]"
              aria-label="Anterior"
            >
              <ArrowLeft className="h-4 w-4 text-[#083334] transition-transform duration-300 group-hover/button:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full border border-[#006667]/12 bg-[#f6f6f8]"
              aria-label="Siguiente"
            >
              <ArrowRight className="h-4 w-4 text-[#083334] transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
