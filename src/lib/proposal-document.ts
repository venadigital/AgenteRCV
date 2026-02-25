import { readFileSync } from "node:fs";
import path from "node:path";

const SECTION_HEADINGS = [
  { id: "resumen-ejecutivo", label: "1. Resumen Ejecutivo" },
  { id: "diagnostico", label: "2. Diagnóstico: Situación Actual" },
  { id: "solucion-propuesta", label: "3. Solución Propuesta" },
  { id: "plan-implementacion", label: "4. Plan de Implementación" },
  { id: "modelo-inversion", label: "5. Modelo de Inversión" },
  { id: "riesgos", label: "6. Riesgos y Plan de Mitigación" },
  {
    id: "prerrequisitos",
    label: "7. Prerrequisitos y Responsabilidades del Cliente",
  },
  { id: "metricas-exito", label: "8. Métricas de Éxito" },
  {
    id: "siguientes-pasos",
    label: "9. Siguientes Pasos para Iniciar el Proyecto",
  },
] as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function addSectionAnchors(html: string) {
  return SECTION_HEADINGS.reduce((acc, section) => {
    const pattern = new RegExp(
      `<p class="p11"><b>${escapeRegExp(section.label)}</b><b><\\/b><\\/p>`,
      "g",
    );

    return acc.replace(
      pattern,
      `<p id="${section.id}" class="p11"><b>${section.label}</b><b></b></p>`,
    );
  }, html);
}

export function getProposalDocumentBodyHtml() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "propuesta-original.html",
  );

  const raw = readFileSync(filePath, "utf8");
  const bodyMatch = raw.match(/<body>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch?.[1] ?? raw;

  return addSectionAnchors(bodyHtml.trim());
}

