"use client";

import { useState } from "react";
import { Activity, PhoneCall, Workflow } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  {
    id: 1,
    shortLabel: "Citas perdidas",
    title: "Citas perdidas: Sin cobertura fuera de horario laboral:",
    detail:
      "Los mensajes que llegan fuera del horario de la recepcionista no se atienden hasta el día siguiente, momento en que el paciente ya optó por otra clínica o simplemente abandonó la intención de agendar.",
    Icon: PhoneCall,
  },
  {
    id: 2,
    shortLabel: "Sobrecarga operativa",
    title:
      "Sobrecarga operativa: La recepcionista concentra el 80% de su tiempo en tareas automatizables:",
    detail:
      "Consultas de horarios, precios, confirmaciones y modificaciones de cita que podrían resolverse sin intervención humana.",
    Icon: Workflow,
  },
  {
    id: 3,
    shortLabel: "Tiempos de espera",
    title: "Tiempos de espera variables:",
    detail:
      "Cuando la recepcionista está atendiendo en mostrador o realizando otras tareas, los mensajes de WhatsApp quedan sin respuesta durante períodos prolongados, generando insatisfacción.",
    Icon: Activity,
  },
] as const;

export function DiagnosticProblemAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="mt-5 hidden gap-4 lg:flex">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.Icon;

          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "group relative h-[20.5rem] min-w-0 overflow-hidden rounded-2xl border text-left transition-all duration-700 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006667]/30",
                isActive
                  ? "flex-[5] border-[#006667]/15 bg-gradient-to-br from-[#083334] to-[#006667] shadow-[0_18px_40px_rgba(0,102,103,0.14)]"
                  : "flex-[1.05] border-[#006667]/10 bg-[#f6f6f8] shadow-[0_10px_24px_rgba(0,102,103,0.05)] hover:border-[#006667]/20",
              )}
              aria-expanded={isActive}
              aria-label={item.title}
            >
              <div className="absolute inset-0">
                {isActive ? (
                  <>
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#bccf03]/20 blur-2xl" />
                    <div className="absolute -bottom-6 left-6 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(188,207,3,0.1),transparent_45%)]" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f6f6f8]" />
                )}
              </div>

              <div className="relative z-10 h-full p-4">
                <div className="mb-3 inline-flex rounded-xl bg-white/95 p-2 text-[#006667] shadow-sm">
                  <Icon className={cn("size-4", isActive && "text-[#083334]")} />
                </div>

                <div
                  className={cn(
                    "transition-all duration-500 ease-out",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  )}
                >
                  <p className="text-sm font-semibold leading-6 text-white">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/90">{item.detail}</p>
                </div>

                {!isActive && (
                  <div className="absolute right-3 bottom-3 left-3">
                    <div className="rounded-xl border border-[#006667]/10 bg-white/85 px-2 py-2 text-center backdrop-blur">
                      <span className="block text-[11px] font-semibold uppercase tracking-widest text-[#006667]/75">
                        {item.shortLabel}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 lg:hidden">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.Icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "overflow-hidden rounded-2xl border border-[#006667]/10 bg-[#f6f6f8] text-left shadow-[0_10px_24px_rgba(0,102,103,0.05)] transition-all duration-300",
                isActive && "border-[#006667]/18 bg-white",
              )}
              aria-expanded={isActive}
            >
              <div className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-white p-2 text-[#006667] shadow-sm">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#006667]/70">
                    {item.shortLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#083334]">
                    {item.title}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "grid transition-all duration-500 ease-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 text-sm leading-6 text-[#083334]/82">
                    {item.detail}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
