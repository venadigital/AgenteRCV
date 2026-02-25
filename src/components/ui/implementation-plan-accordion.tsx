"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

type PlanPhaseItem = {
  number: string;
  title: string;
  description: string;
  deliverable: string;
};

const phaseIcons = [Handshake, Workflow, ShieldCheck, CheckCircle2] as const;

export function ImplementationPlanAccordion({
  items,
  className,
}: {
  items: readonly PlanPhaseItem[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openIndex = useMemo(
    () => (hoveredIndex === null ? activeIndex : hoveredIndex),
    [activeIndex, hoveredIndex],
  );

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const Icon = phaseIcons[index % phaseIcons.length];
        const isOpen = openIndex === index;

        return (
          <button
            key={item.number}
            type="button"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "group relative block w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-in-out",
              "bg-[#f6f6f8] shadow-[0_8px_24px_rgba(0,102,103,0.04)]",
              isOpen
                ? "border-[#006667]/25 bg-white"
                : "border-[#006667]/10 hover:border-[#006667]/18",
            )}
            aria-expanded={isOpen}
            aria-label={`Fase ${item.number}: ${item.title}`}
          >
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-300",
                "bg-[radial-gradient(circle_at_top_right,rgba(188,207,3,0.14),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(0,102,103,0.08),transparent_60%)]",
                isOpen && "opacity-100",
              )}
            />

            {isOpen ? (
              <>
                <div className="absolute left-3 top-3 h-6 w-6">
                  <div className="absolute left-0 top-0 h-0.5 w-4 bg-[#006667]" />
                  <div className="absolute left-0 top-0 h-4 w-0.5 bg-[#006667]" />
                </div>
                <div className="absolute bottom-3 right-3 h-6 w-6">
                  <div className="absolute bottom-0 right-0 h-0.5 w-4 bg-[#006667]" />
                  <div className="absolute bottom-0 right-0 h-4 w-0.5 bg-[#006667]" />
                </div>
              </>
            ) : null}

            <div className="relative px-4 py-4 sm:px-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#bccf03]/25 text-sm font-bold text-[#083334]">
                  {item.number}
                </span>
                <span className="mt-0.5 rounded-lg border border-[#006667]/10 bg-white p-1.5 text-[#006667] shadow-sm">
                  <Icon className="size-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p
                        className={cn(
                          "text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300",
                          isOpen ? "text-[#006667]" : "text-[#006667]/70",
                        )}
                      >
                        Fase {item.number}
                      </p>
                      <h3 className="mt-1 text-lg font-bold leading-6 tracking-tight text-[#083334] sm:text-xl">
                        {item.title}
                      </h3>
                    </div>

                    <span
                      className={cn(
                        "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:text-[11px] sm:tracking-widest",
                        isOpen
                          ? "border-[#006667]/15 bg-[#006667]/5 text-[#006667]"
                          : "border-[#006667]/10 bg-white text-[#006667]/70",
                      )}
                    >
                      {isOpen ? "Abierta" : "Ver detalle"}
                      <ArrowRight
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          isOpen ? "translate-x-0.5" : "",
                        )}
                      />
                    </span>
                  </div>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "mt-4 grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="rounded-xl border border-[#006667]/10 bg-[#f6f6f8] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#006667]/75">
                            Descripción y Actividades Clave
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#083334]/90">
                            {item.description}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#006667]/10 bg-white p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#006667]/75">
                            Entregable / Criterio de Salida
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#083334]/90">
                            {item.deliverable}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
