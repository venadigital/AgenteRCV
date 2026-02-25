"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type MetricItem = {
  title: string;
  description: string;
  value: number;
};

function SparkBars({ seed, active }: { seed: number; active: boolean }) {
  const bars = Array.from({ length: 12 }, (_, i) => {
    const base = 30 + ((seed * (i + 3) * 17) % 60);
    return Math.min(100, base);
  });

  return (
    <div className="mt-3 flex h-10 items-end gap-1">
      {bars.map((h, i) => (
        <motion.span
          key={`${seed}-${i}`}
          className={cn(
            "block w-1.5 rounded-full",
            active ? "bg-[#006667]/50" : "bg-[#006667]/20",
          )}
          initial={{ height: 4, opacity: 0.4 }}
          animate={{
            height: `${Math.max(6, h * 0.36)}px`,
            opacity: active ? 1 : 0.7,
          }}
          transition={{ duration: 0.35, delay: i * 0.015, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function AnimatedMetricsDashboard({
  metrics,
  detailedItems,
  observation,
  className,
}: {
  metrics: readonly MetricItem[];
  detailedItems: readonly string[];
  observation: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((prev) => (prev + 1) % metrics.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [metrics.length]);

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-4">
        <div className="rounded-2xl border border-[#006667]/10 bg-[#f6f6f8] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="tracking-widest text-[11px] font-semibold uppercase text-[#006667]/75">
              Indicadores operativos
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#006667]/10 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#006667]/75">
              <TrendingUp className="size-3.5" />
              Dashboard
            </div>
          </div>

          <div className="grid gap-3">
            {metrics.map((metric, index) => {
              const isSelected = index === active % metrics.length;

              return (
                <button
                  key={metric.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border bg-white p-4 text-left transition-all duration-300",
                    isSelected
                      ? "border-[#006667]/20 shadow-[0_10px_24px_rgba(0,102,103,0.08)]"
                      : "border-[#006667]/10 hover:border-[#006667]/18",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
                      "bg-[radial-gradient(circle_at_top_right,rgba(188,207,3,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(0,102,103,0.07),transparent_60%)]",
                      isSelected && "opacity-100",
                    )}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold tracking-tight text-[#083334]">
                        {metric.title}
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${metric.title}-${isSelected ? "active" : "idle"}`}
                          initial={{ opacity: 0.65, y: 4, filter: "blur(3px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0.65, y: -2, filter: "blur(2px)" }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="mt-1 text-sm leading-6 text-[#083334]/72"
                        >
                          {metric.description}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <span className="rounded-full border border-[#006667]/10 bg-[#f6f6f8] px-2.5 py-1 text-xs font-bold text-[#006667]">
                      {metric.value}
                    </span>
                  </div>

                  <div className="relative mt-3">
                    <div className="h-2 rounded-full bg-[#006667]/8">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          isSelected
                            ? "bg-gradient-to-r from-[#006667] to-[#bccf03]"
                            : "bg-[#006667]/40",
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                    <SparkBars seed={metric.value + index * 11} active={isSelected} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-[#006667]/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,102,103,0.05)]">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-[#bccf03]/20 p-2 text-[#083334]">
              <Sparkles className="size-4" />
            </div>
            <p className="tracking-widest text-[11px] font-semibold uppercase text-[#006667]/75">
              Observación
            </p>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#083334]/85">{observation}</p>
        </div>
      </div>
    </div>
  );
}
