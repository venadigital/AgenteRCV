"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Bot,
  Handshake,
  UserRoundCog,
  Workflow,
} from "lucide-react";

import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: "Diagnóstico", url: "#diagnostico", icon: AlertTriangle },
  { name: "Solución", url: "#solucion", icon: Bot },
  { name: "Flujo", url: "#flujo", icon: Workflow },
  { name: "Fases", url: "#plan-implementacion", icon: Handshake },
  { name: "Inversión", url: "#inversion", icon: BadgeDollarSign },
  { name: "Prerrequisitos", url: "#prerrequisitos", icon: UserRoundCog },
  { name: "Métricas", url: "#metricas-exito", icon: Activity },
  { name: "Siguientes pasos", url: "#siguientes-pasos", icon: ArrowRight },
];

export function ProposalTopNav() {
  return <NavBar items={navItems} className="js-hero-panel" />;
}

