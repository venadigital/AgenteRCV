import type { ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Bot,
  Brain,
  CheckCircle2,
  Database,
  Handshake,
  PhoneCall,
  Server,
  ShieldCheck,
  UserRoundCog,
  Workflow,
} from "lucide-react";

import { ProposalMotion } from "@/components/proposal-motion";
import { ProposalTopNav } from "@/components/proposal-top-nav";
import { AnimatedCapabilities } from "@/components/ui/animated-capabilities";
import { AnimatedMetricsDashboard } from "@/components/ui/animated-metrics-dashboard";
import { AnimatedPrerequisites } from "@/components/ui/animated-prerequisites";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { BlurFade } from "@/components/ui/blur-fade";
import { DiagnosticProblemAccordion } from "@/components/ui/diagnostic-problem-accordion";
import { HeroLogoOrbit, HeroLogoOrbitScaled } from "@/components/ui/hero-logo-orbit";
import { ImplementationPlanAccordion } from "@/components/ui/implementation-plan-accordion";

const architectureNodes = [
  { label: "Paciente", sub: "WhatsApp", icon: PhoneCall },
  { label: "Canal", sub: "WhatsApp Business API", icon: Bot },
  { label: "Orquestador", sub: "n8n (VPS)", icon: Workflow },
  { label: "Cerebro IA", sub: "OpenAI (GPT)", icon: Brain },
  { label: "Integración", sub: "API SuNube", icon: Database },
  { label: "Respaldo", sub: "Google Calendar / Workspace", icon: Server },
  {
    label: "Escalamiento",
    sub: "Recepcionista / operador humano",
    icon: UserRoundCog,
  },
] as const;

const phases = [
  {
    number: "1",
    title: "Levantamiento (PDR)",
    description:
      "Entrevistas con Diana, Pedro, recepcionistas y profesionales del centro. Mapeo del proceso actual, identificación de riesgos, definición de reglas de negocio (horarios, políticas de cancelación, no-show, escalamiento), y casos de excepción.",
    deliverable:
      "Documento de Requisitos del Proyecto (PDR) validado y firmado por Diana y Pedro.",
    icon: Handshake,
  },
  {
    number: "2",
    title: "Construcción e Integración",
    description:
      "Desarrollo del workflow en n8n. Integración con API de Su Nube (agendamiento y consulta de disponibilidad). Configuración del agente en OpenAI con la base de conocimiento del PDR. Configuración de WhatsApp Business API y Google Calendar como respaldo.",
    deliverable:
      "Agente funcional en entorno de pruebas con todos los flujos integrados.",
    icon: Workflow,
  },
  {
    number: "3",
    title: "Piloto (1–2 semanas)",
    description:
      "Prueba end-to-end con conversaciones reales. Monitoreo intensivo de logs y errores. Ajustes de interpretación del modelo, reglas de negocio y experiencia de usuario. Validación de UAT por parte de la recepción del centro.",
    deliverable:
      "Piloto concluido sin fallas críticas. Informe de resultados y ajustes documentados.",
    icon: ShieldCheck,
  },
  {
    number: "4",
    title: "Despliegue y Entrega",
    description:
      "Puesta en producción para todos los clientes del centro. Entrega de manuales de uso y guías de supervisión para el equipo de RCV Recover. Activación del monitoreo 24/7 y protocolo de escalamiento.",
    deliverable:
      "Agente en producción. Documentación técnica y manuales entregados.",
    icon: CheckCircle2,
  },
] as const;

const setupCosts = [
  {
    concept: "Setup Inicial (Pago Único)",
    scope:
      "Incluye: PDR (levantamiento y documentación de requisitos), construcción del workflow en n8n, integración con SuNube y APIs, configuración del agente IA, piloto de 1–2 semanas y entrega de documentación.",
    amount: "$3.600.000",
  },
  {
    concept: "Creación API (Pago Único)",
    scope: "Incluye: Pago a SuNube para activar API del módulo de citas",
    amount: "$277.000",
  },
] as const;

const monthlyCosts = [
  {
    concept: "Mantenimiento Mensual",
    scope:
      "Incluye: Hosting del servidor VPS, consumo de API de WhatsApp Business, consumo de API de OpenAI, monitoreo 24/7 del sistema y soporte técnico.",
    amount: "$ 260.000",
  },
  {
    concept: "API SuNube",
    scope: "Incluye: hasta 5.000 transacciones al mes",
    amount: "$ 183.000",
  },
] as const;

const paymentConditions = [
  {
    cuota: "1ª Cuota Setup (60%)",
    momento:
      "Antes de iniciar las entrevistas del PDR (Fase 1). ** El plan de pago no incluye los pagos a Sunube, este los hace directamente RCV",
    monto: "$2.160.000",
  },
  {
    cuota: "2ª Cuota Setup (40%)",
    momento: "Al finalizar satisfactoriamente el piloto de 1–2 semanas.",
    monto: "$1.440.000",
  },
  {
    cuota: "Mantenimiento Mensual",
    momento:
      "Facturado los primeros 3 días de cada mes, a partir del mes post-despliegue. ** El pago mensual no incluye los pagos a Sunube, este los hace directamente RCV",
    monto: "$260.000 /mes",
  },
] as const;

const risks = [
  {
    level: "Alto",
    risk: "Dependencia de la API de Su Nube: acceso, permisos y tiempos de integración.",
    mitigation:
      "RCV Recover gestiona el contacto técnico con Su Nube en la Fase 1. Se define SLA de integración antes de iniciar construcción.",
    score: 90,
  },
  {
    level: "Alto",
    risk: "PDR incompleto o impreciso: reglas de negocio mal definidas generarán errores en la agenda.",
    mitigation:
      "Entrevistas estructuradas con todos los stakeholders (Diana, Pedro, recepcionistas, fisioterapeutas). Validación formal del PDR por Diana y Pedro.",
    score: 85,
  },
  {
    level: "Medio",
    risk: "Doble agendamiento por fallo de sincronización con Su Nube.",
    mitigation:
      "Integración vía API con logs de auditoría. Google Calendar como sistema de conciliación secundario. Lógica de doble confirmación con el paciente.",
    score: 58,
  },
  {
    level: "Medio",
    risk: "Gobernanza de datos: información sensible de pacientes gestionada por canales externos.",
    mitigation:
      "Definición de política de privacidad y manejo de datos durante el PDR. Cifrado TLS en servidor. Minimización del dato almacenado en el agente.",
    score: 55,
  },
  {
    level: "Medio",
    risk: "Fallo en alguno de los servicios externos (WhatsApp, OpenAI, VPS).",
    mitigation:
      "Monitoreo 24/7 con alertas automáticas. Plan de contingencia documentado: fallback a mensaje informativo y toma manual.",
    score: 52,
  },
  {
    level: "Bajo",
    risk: "Rechazo o baja adopción por parte de los pacientes.",
    mitigation:
      "Piloto controlado de 1–2 semanas para medir adopción. Tono y experiencia conversacional natural. Opción de escalamiento humano siempre disponible.",
    score: 25,
  },
] as const;

const metrics = [
  {
    title: "Tasa de resolución autónoma",
    description:
      "Porcentaje de conversaciones gestionadas completamente por el agente sin escalamiento (objetivo: >80%).",
    value: 82,
  },
  {
    title: "Tiempo de respuesta promedio",
    description:
      "Tiempo entre el mensaje del paciente y la respuesta del agente (objetivo: <10 segundos).",
    value: 92,
  },
  {
    title: "Cobertura fuera de horario",
    description:
      "Volumen de interacciones atendidas fuera del horario laboral de la recepcionista.",
    value: 76,
  },
  {
    title: "Carga operativa de recepcionista",
    description:
      "Disminución en el tiempo dedicado a gestión de WhatsApp.",
    value: 68,
  },
] as const;

const nextSteps = [
  "Aprobar la presente propuesta comercial.",
  "Realizar el pago del 60% del setup para activar el proyecto.",
  "Compartir el contacto técnico del proveedor de Su Nube. (Ya realizado)",
  "Autorizar el acceso al número de WhatsApp Business (Meta Business Manager).",
  "Designar las recepcionistas responsables para entrevistas y piloto.",
  "Proveer acceso a cuenta de OpenAI y Google Workspace.",
  "Coordinar agenda de entrevistas para Fase 1 (PDR).",
] as const;

const heroCapabilities = [
  "Brindar información completa sobre servicios, horarios, sedes, convenios y costos.",
  "Agendar, modificar y cancelar citas verificando disponibilidad en tiempo real.",
  "Recordar el historial de interacciones para personalizar la atención.",
  "Escalar automáticamente a un operador humano cuando sea necesario.",
] as const;

const businessImpacts = [
  "Pérdida de ingresos por citas no agendadas por falta de respuesta oportuna.",
  "Insatisfacción de pacientes que experimentan demoras en confirmaciones y modificaciones.",
  "Subutilización del talento humano en tareas de bajo valor en lugar de atención clínica y relacional.",
  "Ausencia de datos estructurados sobre demanda, horarios pico y servicios más solicitados.",
] as const;

const solutionCapabilitiesDetailed = [
  "Responder consultas sobre servicios, terapias, especialidades, sedes, convenios con aseguradoras y costos (privado y con prestadores).",
  "Consultar disponibilidad de agenda en tiempo real desde «SuNube» y proponer opciones al paciente.",
  "Confirmar, modificar y cancelar citas, actualizando el sistema de gestión automáticamente.",
  "Solicitar doble confirmación al paciente antes de registrar cualquier cambio en la agenda.",
  "Reconocer al paciente por su número de documento de identidad y recuperar el contexto de interacciones anteriores (memoria).",
  "Detectar frustación o temas fuera de su base de conocimiento y escalar automáticamente a la recepcionista con el historial completo de la conversación.",
] as const;

const solutionArchitectureRows = [
  {
    componente: "Cerebro IA",
    tecnologia: "OpenAI (GPT)",
    funcion:
      "Procesamiento del lenguaje natural, toma de decisiones y memoria de conversación.",
  },
  {
    componente: "Orquestador",
    tecnologia: "n8n (VPS)",
    funcion:
      "Motor de automatización y flujos de trabajo desplegado en servidor dedicado.",
  },
  {
    componente: "Canal",
    tecnologia: "WhatsApp Business API",
    funcion:
      "Recepción y envío de mensajes vía el número de WhatsApp del centro.",
  },
  {
    componente: "Integración",
    tecnologia: "API SuNube",
    funcion:
      "Consulta y escritura de citas, verificación de disponibilidad y registro en tiempo real.",
  },
  {
    componente: "Respaldo",
    tecnologia: "Google Calendar / Workspace",
    funcion: "Sistema de conciliación secundario y backup de citas.",
  },
] as const;

const prerequisitesBeforeStart = [
  "Pago del 60% del setup inicial",
  "Contacto técnico del proveedor de Su Nube para iniciar la gestión de integración.",
  "Cuenta activa de WhatsApp Business vinculada al número del centro (Meta Business Manager).",
  "Cuenta de OpenAI/ChatGPT para el motor de IA del agente.",
  "Cuenta de Google Workspace (o personal) para respaldos en Google Calendar.",
  "Disponibilidad de Diana, Pedro y las recepcionistas para las entrevistas de levantamiento (Fase 1).",
] as const;

const prerequisitesPilot = [
  "Participación activa de las recepcionistas en pruebas UAT y reporte de incidencias.",
  "Disponibilidad de Diana o Pedro para validar ajustes a las reglas de negocio.",
] as const;

const prerequisitesPostDeploy = [
  "Registro y pago del fee mensual de mantenimiento los primeros 3 días de cada mes.",
  "Notificación oportuna al equipo implementador ante cualquier cambio en los servicios, precios o políticas del centro que requiera actualización de la base de conocimiento del agente.",
] as const;

const successMetricsDetailed = [
  "Tasa de resolución autónoma: porcentaje de conversaciones gestionadas completamente por el agente sin escalamiento (objetivo: >80%).",
  "Tasa de citas agendadas automáticamente: proporción de citas registradas en Su Nube a través del agente vs. total de solicitudes recibidas.",
  "Tiempo de respuesta promedio: tiempo entre el mensaje del paciente y la respuesta del agente (objetivo: <10 segundos).",
  "Cobertura fuera de horario: volumen de interacciones atendidas fuera del horario laboral de la recepcionista.",
  "Satisfacción del paciente: medida a través de encuestas opcionales al final de la conversación.",
] as const;

const nextStepsTable = [
  {
    id: "1",
    action: "Aprobar la presente propuesta comercial.",
    responsible: "Diana Rengifo / Pedro Escobar",
  },
  {
    id: "2",
    action: "Realizar el pago del 60% del setup para activar el proyecto.",
    responsible: "Diana Rengifo / Pedro Escobar",
  },
  {
    id: "3",
    action: "Compartir el contacto técnico del proveedor de Su Nube.",
    responsible: "Ya realizado",
  },
  {
    id: "4",
    action: "Autorizar el acceso al número de WhatsApp Business (Meta Business Manager).",
    responsible: "Diana Rengifo",
  },
  {
    id: "5",
    action: "Designar las recepcionistas responsables para entrevistas y piloto.",
    responsible: "Diana Rengifo",
  },
  {
    id: "6",
    action: "Proveer acceso a cuenta de OpenAI y Google Workspace.",
    responsible: "Diana Rengifo",
  },
  {
    id: "7",
    action: "Coordinar agenda de entrevistas para Fase 1 (PDR).",
    responsible: "Diana Rengifo / Pedro Escobar",
  },
] as const;

export default function Home() {
  return (
    <>
      <ProposalMotion />
      <main className="relative overflow-x-clip bg-[#f6f6f8] pb-24 text-[#083334] md:pb-0">
        <ProposalTopNav />

        <div className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen w-px bg-white/30 lg:block">
          <div className="js-line-progress h-full w-full origin-top bg-[#bccf03]" />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-[-8rem] h-64 w-64 rounded-full bg-[#bccf03]/20 blur-3xl" />
          <div className="absolute right-[-5%] top-64 h-80 w-80 rounded-full bg-[#006667]/15 blur-3xl" />
          <div className="absolute left-1/3 top-[38rem] h-72 w-72 rounded-full bg-[#006667]/8 blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 md:pt-24 lg:px-10">
          <div className="grid gap-6">
            <section className="js-hero-panel relative overflow-hidden rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.12)] sm:p-8">
              <div className="pointer-events-none absolute right-0 top-0 z-0 h-20 w-20 rounded-bl-[1.5rem] bg-[#bccf03] sm:h-28 sm:w-28 sm:rounded-bl-[2rem]" />
              <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-center">
                <div className="xl:flex xl:min-h-[20rem] xl:flex-col xl:justify-center">
                  <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                    RCV RECOVER ⎥Agente de Atención al Cliente
                  </p>
                  <h1
                    data-hero-title
                    data-final-title="Agente Virtual de WhatsApp impulsado por Inteligencia Artificial"
                    className="mt-3 max-w-[14ch] text-balance text-4xl leading-[0.95] font-extrabold tracking-tight text-[#083334] sm:text-5xl"
                  />
                </div>

                <div className="flex justify-center xl:hidden">
                  <HeroLogoOrbitScaled size={220} />
                </div>

                <div className="hidden xl:flex xl:justify-end">
                  <HeroLogoOrbit />
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <MetaCell label="Preparado para" value="Centro de Fisioterapia RCV Recover" />
                <MetaCell
                  label="Responsables cliente"
                  value="Diana Rengifo – Pedro Escobar"
                />
                <MetaCell label="Preparado por" value="Laura Salazar / Vena Digital" />
                <MetaCell label="Fecha" value="25 de febrero de 2026" />
                <MetaCell label="Versión" value="1.0 – Propuesta Inicial" />
                <MetaCell
                  label="Vigencia"
                  value="30 días a partir de la fecha de emisión"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-[#006667]/10 bg-[#006667] p-4 text-white">
                <p className="tracking-widest text-[11px] font-semibold uppercase text-white/80">
                  Resumen Ejecutivo
                </p>
                <div className="mt-2 space-y-3 text-sm leading-6">
                  <p>
                    RCV Recover enfrenta una pérdida tangible de oportunidades de negocio
                    como consecuencia de la imposibilidad de responder mensajes de WhatsApp
                    de manera oportuna fuera del horario laboral. La recepcionista dedica la
                    mayor parte de su jornada a tareas repetitivas de atención vía WhatsApp
                    (consultas, confirmaciones y agendamientos), reduciendo drásticamente su
                    disponibilidad para actividades de mayor valor.
                  </p>
                  <p>
                    La presente propuesta detalla la implementación de un Agente Virtual
                    24/7 en WhatsApp, impulsado por Inteligencia Artificial (OpenAI),
                    integrado en tiempo real con el software médico «SuNube» a través de la
                    plataforma de automatización n8n.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {heroCapabilities.map((item, index) => (
                  <article
                    key={item}
                    className="js-capability-card group relative overflow-hidden rounded-2xl border border-[#006667]/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,102,103,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,102,103,0.12)]"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute -top-10 -right-6 h-24 w-24 rounded-full bg-[#bccf03]/18 blur-2xl" />
                      <div className="absolute -bottom-8 -left-6 h-20 w-20 rounded-full bg-[#006667]/10 blur-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#bccf03]/5 via-transparent to-[#006667]/5" />
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-[#bccf03]/35" />

                    <div className="relative z-10 flex h-full min-h-[124px] flex-col justify-between">
                      <div className="transition-all duration-300 group-hover:-translate-y-1">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-xl bg-[#bccf03]/25 p-2 text-[#083334] transition-transform duration-300 group-hover:scale-90 group-hover:bg-[#bccf03]/35">
                            {index === 0 && <Database className="size-4" />}
                            {index === 1 && <Workflow className="size-4" />}
                            {index === 2 && <Brain className="size-4" />}
                            {index === 3 && <UserRoundCog className="size-4" />}
                          </div>
                          <span className="rounded-full bg-[#f6f6f8] px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-[#006667] transition-colors duration-300 group-hover:bg-white">
                            Capacidad {index + 1}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-[#083334]/90">{item}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="diagnostico"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div>
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                  Diagnóstico: Situación Actual
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    Problema Central
                  </h2>
                </BlurFade>
                <p className="mt-3 text-sm leading-6 text-[#083334]/85 sm:text-base">
                  El canal de WhatsApp es hoy el principal punto de contacto entre RCV
                  Recover y sus pacientes. Sin embargo, su gestión manual genera tres
                  cuellos de botella críticos:
                </p>
              </div>

              <DiagnosticProblemAccordion />

              <div className="mt-6 rounded-2xl border border-[#006667]/10 bg-[#083334] p-5 text-white">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-2 text-[#bccf03]">
                    <AlertTriangle className="size-4" />
                  </div>
                  <div>
                    <p className="tracking-widest text-[11px] font-semibold uppercase text-white/75">
                      Impacto de Negocio
                    </p>
                    <p className="text-sm text-white/90">
                      Estos problemas se traducen directamente en:
                    </p>
                  </div>
                </div>

                <ul className="grid gap-2 sm:grid-cols-2">
                  {businessImpacts.map((item, index) => (
                    <li
                      key={item}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0 text-sm leading-6 text-white/95 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07] hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div
                          className={`absolute h-24 w-24 rounded-full blur-2xl ${
                            index % 2 === 0
                              ? "-left-4 -top-4 bg-[#bccf03]/12"
                              : "-right-4 -top-4 bg-white/8"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-[#bccf03]/[0.04]" />
                      </div>

                      <div className="relative z-10 p-3 transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="flex items-start gap-2">
                          <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#bccf03] transition-transform duration-300 group-hover:scale-125" />
                          <span>{item}</span>
                        </div>
                      </div>

                      <div className="pointer-events-none absolute right-2 bottom-2 left-2 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#bccf03]/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              id="solucion"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div>
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                  Solución Propuesta
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    El Agente Virtual IA
                  </h2>
                </BlurFade>
                <p className="mt-3 text-sm leading-6 text-[#083334]/85 sm:text-base">
                  Se implementará un asistente conversacional de lenguaje natural (no un
                  chatbot rígido de menús) impulsado por modelos de lenguaje de OpenAI,
                  orquestado mediante n8n (herramienta de automatización) e integrado
                  directamente con «SuNube». Operará en el número de WhatsApp Business
                  existente del centro.
                </p>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-[#006667]/10 bg-[#f6f6f8] p-4 sm:p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-white p-2 text-[#006667] shadow-sm">
                      <Bot className="size-4" />
                    </div>
                    <div>
                      <p className="tracking-widest text-[11px] font-semibold uppercase text-[#006667]/75">
                        Capacidades funcionales del agente
                      </p>
                    </div>
                  </div>

                  <AnimatedCapabilities items={solutionCapabilitiesDetailed} />
                </div>

                <div className="rounded-2xl border border-[#006667]/10 bg-[#083334] p-4 text-white sm:p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2 text-[#bccf03]">
                      <Brain className="size-4" />
                    </div>
                    <div>
                      <p className="tracking-widest text-[11px] font-semibold uppercase text-white/75">
                        Arquitectura Técnica
                      </p>
                      <p className="text-sm text-white/90">
                        La solución se construye sobre un ecosistema de herramientas
                        probadas y estándar en automatización empresarial:
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 md:hidden">
                    {solutionArchitectureRows.map((row) => (
                      <div
                        key={row.componente}
                        className="rounded-xl border border-white/10 bg-white/5 p-3"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
                          {row.componente}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {row.tecnologia}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/85">
                          {row.funcion}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="hidden overflow-x-auto rounded-xl border border-white/10 bg-white/5 md:block">
                    <table className="min-w-full border-separate border-spacing-0 text-sm">
                      <thead>
                        <tr className="bg-white/10 text-left">
                          <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                            Componente
                          </th>
                          <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                            Tecnología
                          </th>
                          <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                            Función
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {solutionArchitectureRows.map((row, index) => (
                          <tr
                            key={row.componente}
                            className={index % 2 === 0 ? "bg-transparent" : "bg-white/3"}
                          >
                            <td className="border-t border-white/10 px-3 py-3 align-top font-semibold text-white">
                              {row.componente}
                            </td>
                            <td className="border-t border-white/10 px-3 py-3 align-top text-white/95">
                              {row.tecnologia}
                            </td>
                            <td className="border-t border-white/10 px-3 py-3 align-top text-white/85">
                              {row.funcion}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="flujo"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div className="mb-5">
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/75">
                  Arquitectura / Flujo
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    Mapa de flujo de atención y operación
                  </h2>
                </BlurFade>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#083334]/75 sm:text-base">
                  Representación visual del ecosistema técnico descrito en la propuesta
                  (OpenAI, n8n, WhatsApp Business API, SuNube y Google Calendar /
                  Workspace).
                </p>
              </div>

              <div
                data-flow-timeline
                className="rounded-3xl border border-[#006667]/10 bg-[#f6f6f8] p-4 shadow-[0_15px_45px_rgba(0,102,103,0.06)] sm:p-6"
              >
                <div className="mb-5 hidden rounded-2xl border border-[#006667]/10 bg-white p-4 lg:block">
                  <div className="h-1 rounded-full bg-[#006667]/10">
                    <div
                      data-flow-progress-fill
                      className="h-full origin-left rounded-full bg-gradient-to-r from-[#006667] to-[#bccf03]"
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {[
                      "Paciente",
                      "Canal",
                      "Orquestador",
                      "Cerebro IA",
                      "Integración",
                      "Respaldo",
                      "Escalamiento",
                    ].map((label) => (
                      <div
                        key={label}
                        data-flow-marker
                        className="rounded-xl border border-[#006667]/8 bg-[#f6f6f8] px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-widest text-[#006667]/70"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  <FlowNode {...architectureNodes[0]} accent="lime" step="01" className="js-flow-seq" />
                  <ArrowPipe className="js-flow-seq" />
                  <FlowNode {...architectureNodes[1]} step="02" className="js-flow-seq" />
                  <ArrowPipe className="js-flow-seq" />
                  <FlowNode {...architectureNodes[2]} step="03" className="js-flow-seq" />
                </div>

                <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#006667]/20 to-transparent" />

                <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  <FlowNode {...architectureNodes[3]} step="04" className="js-flow-seq" />
                  <ArrowPipe className="js-flow-seq" />
                  <FlowNode {...architectureNodes[4]} step="05" className="js-flow-seq" />
                  <ArrowPipe className="js-flow-seq" />
                  <FlowNode {...architectureNodes[5]} step="06" className="js-flow-seq" />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_2fr]">
                  <FlowNode {...architectureNodes[6]} accent="teal" step="07" className="js-flow-seq" />
                  <ArrowPipe vertical className="js-flow-seq" />
                  <div
                    data-flow-seq
                    data-flow-kind="note"
                    className="rounded-2xl border border-dashed border-[#006667]/20 bg-white p-4 text-sm text-[#083334]/80"
                  >
                    <p className="font-semibold text-[#083334]">
                      Escalamiento automático (según propuesta)
                    </p>
                    <p className="mt-2 leading-6">
                      Se activa cuando el agente detecta frustración o temas fuera de su
                      base de conocimiento, transfiriendo el historial completo de
                      conversación a la recepcionista.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="plan-implementacion"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div>
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                  Implementación / Fases
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    Plan de Implementación
                  </h2>
                </BlurFade>
                <p className="mt-3 text-sm leading-6 text-[#083334]/85 sm:text-base">
                  El proyecto se ejecuta en cuatro fases secuenciales, garantizando
                  validación en cada etapa antes de avanzar a la siguiente.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#006667]/10 bg-[#f6f6f8] p-2 sm:p-3">
                <ImplementationPlanAccordion
                  items={phases.map((phase) => ({
                    number: phase.number,
                    title: phase.title,
                    description: phase.description,
                    deliverable: phase.deliverable,
                  }))}
                />
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-[#006667]/20 bg-[#f6f6f8] p-4">
                <p className="tracking-widest text-[11px] font-semibold uppercase text-[#006667]/75">
                  Nota
                </p>
                <p className="mt-2 text-sm leading-6 text-[#083334]/85">
                  El periodo de piloto (1–2 semanas) no tiene costo adicional y está
                  incluido en el setup inicial.
                </p>
              </div>
            </section>

            <section
              id="inversion"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div>
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                  Modelo de Inversión
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    Estructura de Costos
                  </h2>
                </BlurFade>
              </div>

              <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="grid gap-5">
                  <div>
                    <p className="mb-2 tracking-widest text-[11px] font-semibold uppercase text-[#006667]/75">
                      Setup Pago único
                    </p>
                    <CostTableCard
                      className="js-reveal"
                      title="Setup Pago único"
                      total="$3.877.000"
                      rows={setupCosts}
                    />
                  </div>

                  <div>
                    <p className="mb-2 tracking-widest text-[11px] font-semibold uppercase text-[#006667]/75">
                      Fee mensual de operación
                    </p>
                    <CostTableCard
                      className="js-reveal"
                      title="Fee mensual de operación"
                      total="$ 443.000"
                      rows={monthlyCosts}
                    />
                  </div>
                </div>

                <div className="js-reveal rounded-3xl border border-[#006667]/10 bg-white p-5 shadow-[0_14px_40px_rgba(0,102,103,0.07)]">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#bccf03]/25 p-2 text-[#083334]">
                      <BadgeDollarSign className="size-5" />
                    </div>
                    <div>
                      <p className="tracking-widest text-[11px] font-semibold uppercase text-[#006667]/75">
                        Condiciones de Pago
                      </p>
                      <p className="text-sm font-semibold text-[#083334]">
                        Cuota, momento del pago y monto
                      </p>
                    </div>
                  </div>

                  <ol className="mt-5 grid gap-4">
                    {paymentConditions.map((item, index) => (
                      <li
                        key={item.cuota}
                        className="rounded-2xl border border-[#006667]/12 bg-[#f6f6f8] p-4"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-[#006667]">
                            Paso {index + 1}
                          </span>
                          <span className="text-sm font-bold text-[#006667]">
                            {item.monto}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#083334]">{item.cuota}</p>
                        <p className="mt-2 text-sm leading-6 text-[#083334]/85">
                          {item.momento}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 rounded-2xl border border-dashed border-[#006667]/20 bg-white p-4 text-sm leading-6 text-[#083334]/80">
                    <p className="font-semibold text-[#083334]">Nota importante</p>
                    <p>
                      Las nuevas funcionalidades no incluidas en este alcance (p.ej.
                      campañas de marketing proactivo, módulos de informes personalizados,
                      integraciones adicionales) se cotizarán como proyectos independientes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="prerrequisitos"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div>
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                  Cliente / Prerrequisitos
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    Prerrequisitos y Responsabilidades del Cliente
                  </h2>
                </BlurFade>
                <p className="mt-3 text-sm leading-6 text-[#083334]/85 sm:text-base">
                  Para garantizar el éxito del proyecto y cumplir los plazos estimados, RCV
                  Recover debe proveer los siguientes elementos antes del inicio de cada
                  fase:
                </p>
              </div>

              <div className="mt-6">
                <AnimatedPrerequisites
                  items={[
                    {
                      id: "fase-1",
                      label: "Antes del inicio (Fase 1)",
                      title: "Antes del inicio",
                      items: prerequisitesBeforeStart,
                      tone: "light",
                      iconKey: "inicio",
                    },
                    {
                      id: "fase-3",
                      label: "Durante el Piloto (Fase 3)",
                      title: "Durante el piloto",
                      items: prerequisitesPilot,
                      tone: "light",
                      iconKey: "piloto",
                    },
                    {
                      id: "post-despliegue",
                      label: "Post-Despliegue",
                      title: "Post-despliegue",
                      items: prerequisitesPostDeploy,
                      tone: "dark",
                      iconKey: "post",
                    },
                  ]}
                />
              </div>
            </section>

            <section
              id="metricas-exito"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div>
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                  Seguimiento / Indicadores
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    Métricas de Éxito
                  </h2>
                </BlurFade>
                <p className="mt-3 text-sm leading-6 text-[#083334]/85 sm:text-base">
                  Al finalizar el piloto y durante los primeros 3 meses de operación, se
                  evaluará el rendimiento del agente en función de los siguientes
                  indicadores:
                </p>
              </div>

              <div className="mt-6">
                <AnimatedMetricsDashboard
                  metrics={metrics}
                  detailedItems={successMetricsDetailed}
                  observation="Estas métricas permiten evaluar adopción, velocidad de respuesta y aporte del agente a la reducción de carga operativa del equipo de recepción."
                />
              </div>
            </section>

            <section
              id="siguientes-pasos"
              className="js-reveal rounded-[2rem] border border-[#006667]/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,102,103,0.08)] sm:p-8"
            >
              <div>
                <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/80">
                  Activación / Inicio del Proyecto
                </p>
                <BlurFade inView inViewMargin="-80px" blur="8px">
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
                    Siguientes Pasos para Iniciar el Proyecto
                  </h2>
                </BlurFade>
                <p className="mt-3 text-sm leading-6 text-[#083334]/85 sm:text-base">
                  Para dar inicio formal al proyecto, se requieren las siguientes acciones
                  por parte de RCV Recover:
                </p>
              </div>

              <div className="mt-6 grid gap-3 md:hidden">
                {nextStepsTable.map((row) => {
                  const done = row.responsible.toLowerCase() === "ya realizado";

                  return (
                    <article
                      key={row.id}
                      className={`rounded-2xl border p-4 ${
                        done
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-[#006667]/10 bg-[#f6f6f8]"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="inline-flex size-7 items-center justify-center rounded-full bg-[#bccf03]/25 text-xs font-bold text-[#083334]">
                          {row.id}
                        </div>
                        {done ? (
                          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-700">
                            Ya realizado
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm leading-6 font-semibold text-[#083334]">
                        {row.action}
                      </p>
                      {!done ? (
                        <div className="mt-3 rounded-xl border border-[#006667]/10 bg-white px-3 py-2">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#006667]/70">
                            Responsable
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#083334]">
                            {row.responsible}
                          </p>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>

              <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-[#006667]/10 bg-[#f6f6f8] p-2 sm:p-3 md:block">
                <table className="min-w-[860px] w-full border-separate border-spacing-0 text-sm">
                  <thead>
                    <tr className="bg-[#006667] text-left text-white">
                      <th className="rounded-l-xl px-3 py-3 text-xs font-semibold uppercase tracking-widest">
                        #
                      </th>
                      <th className="px-3 py-3 text-xs font-semibold uppercase tracking-widest">
                        Acción Requerida
                      </th>
                      <th className="rounded-r-xl px-3 py-3 text-xs font-semibold uppercase tracking-widest">
                        Responsable
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {nextStepsTable.map((row, index) => {
                      const done = row.responsible.toLowerCase() === "ya realizado";

                      return (
                        <tr
                          key={row.id}
                          className={
                            done
                              ? "bg-emerald-50"
                              : index % 2 === 0
                                ? "bg-white"
                                : "bg-[#eef3f3]"
                          }
                        >
                          <td className="border-t border-[#006667]/10 px-3 py-4 align-top">
                            <div className="inline-flex size-7 items-center justify-center rounded-full bg-[#bccf03]/25 text-xs font-bold text-[#083334]">
                              {row.id}
                            </div>
                          </td>
                          <td className="border-t border-[#006667]/10 px-3 py-4 align-top leading-6 text-[#083334]/90">
                            {row.action}
                          </td>
                          <td className="border-t border-[#006667]/10 px-3 py-4 align-top">
                            {done ? (
                              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                                Ya realizado
                              </span>
                            ) : (
                              <span className="text-sm font-semibold text-[#083334]">
                                {row.responsible}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>

        <footer className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-10">
          <BackgroundBeamsWithCollision className="js-reveal">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <BlurFade inView inViewMargin="-40px" blur="10px">
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                  ¿Y si la IA lo hace por ti?
                </h2>
              </BlurFade>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
                <Image
                  src="/logo-vena-digital-white.png"
                  alt="Vena Digital"
                  width={220}
                  height={72}
                  className="h-auto w-[6.25rem] object-contain sm:w-[7rem]"
                />
              </div>

              <p className="mt-5 text-sm font-medium tracking-tight text-white/85 sm:text-base">
                Vena Digital 2026 ⎥Todos los derechos reservados ®
              </p>
            </div>
          </BackgroundBeamsWithCollision>
        </footer>
      </main>
    </>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
      <div className="mb-5 js-reveal">
        <p className="tracking-widest text-xs font-semibold uppercase text-[#006667]/75">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#083334] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#083334]/75 sm:text-base">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#006667]/10 bg-[#f6f6f8] px-4 py-3">
      <p className="tracking-widest text-[11px] font-semibold uppercase text-[#006667]/70">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#083334]">{value}</p>
    </div>
  );
}

function FlowNode({
  label,
  sub,
  icon: Icon,
  accent,
  step,
  className,
}: {
  label: string;
  sub: string;
  icon: LucideIcon;
  accent?: "lime" | "teal";
  step?: string;
  className?: string;
}) {
  const accentStyles =
    accent === "lime"
      ? "border-[#bccf03]/50 bg-[#bccf03]/15"
      : accent === "teal"
        ? "border-[#006667]/30 bg-[#006667]/8"
        : "border-[#006667]/12 bg-[#f6f6f8]";

  return (
    <div
      data-flow-seq
      data-flow-kind="node"
      className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,102,103,0.08)] ${accentStyles} ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-[#bccf03]/10 blur-2xl" />
        <div className="absolute -left-5 -bottom-5 h-16 w-16 rounded-full bg-[#006667]/10 blur-2xl" />
      </div>
      <div className="relative z-10 mb-2 flex items-center justify-between gap-2">
        <div className="inline-flex rounded-xl bg-white p-2 text-[#006667] shadow-sm transition-transform duration-300 group-hover:scale-95">
          <Icon className="size-5" />
        </div>
        {step ? (
          <span className="rounded-full border border-[#006667]/10 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#006667]/70">
            {step}
          </span>
        ) : null}
      </div>
      <p className="relative z-10 text-sm font-bold text-[#083334]">{label}</p>
      <p className="relative z-10 mt-1 text-xs leading-5 text-[#083334]/75">{sub}</p>
    </div>
  );
}

function ArrowPipe({
  vertical = false,
  className,
}: {
  vertical?: boolean;
  className?: string;
}) {
  if (vertical) {
    return (
      <div
        data-flow-seq
        data-flow-kind="link"
        data-flow-orientation="vertical"
        className={`hidden items-center justify-center md:flex ${className ?? ""}`}
      >
        <div className="flex flex-col items-center gap-1">
          <div data-flow-link-track className="h-4 w-px bg-[#006667]/20" />
          <ArrowRight data-flow-link-arrow className="size-4 rotate-90 text-[#006667]" />
          <div data-flow-link-track className="h-4 w-px bg-[#006667]/20" />
        </div>
      </div>
    );
  }

  return (
    <div
      data-flow-seq
      data-flow-kind="link"
      data-flow-orientation="horizontal"
      className={`hidden items-center justify-center md:flex ${className ?? ""}`}
    >
      <div className="flex items-center gap-1">
        <div data-flow-link-track className="h-px w-4 bg-[#006667]/20" />
        <ArrowRight data-flow-link-arrow className="size-4 text-[#006667]" />
        <div data-flow-link-track className="h-px w-4 bg-[#006667]/20" />
      </div>
    </div>
  );
}

function CostTableCard({
  title,
  rows,
  total,
  className,
}: {
  title: string;
  rows: ReadonlyArray<{ concept: string; scope: string; amount: string }>;
  total: string;
  className?: string;
}) {
  const isFeatured = title.toLowerCase().includes("setup");

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(0,102,103,0.12)] ${
        isFeatured
          ? "border-[#006667]/20 bg-gradient-to-b from-[#0c4a4b] to-[#083334] text-white shadow-[0_16px_42px_rgba(0,102,103,0.18)]"
          : "border-[#006667]/10 bg-white text-[#083334] shadow-[0_14px_40px_rgba(0,102,103,0.07)]"
      } ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${
            isFeatured ? "bg-[#bccf03]/25" : "bg-[#006667]/10"
          }`}
        />
        <div
          className={`absolute -bottom-10 -left-8 h-24 w-24 rounded-full blur-3xl ${
            isFeatured ? "bg-white/10" : "bg-[#bccf03]/20"
          }`}
        />
      </div>

      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div>
          <p
            className={`tracking-widest text-[11px] font-semibold uppercase ${
              isFeatured ? "text-white/75" : "text-[#006667]/75"
            }`}
          >
            Estructura de costos
          </p>
          <h3
            className={`text-xl font-bold tracking-tight ${
              isFeatured ? "text-white" : "text-[#083334]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-1 text-xs leading-5 ${
              isFeatured ? "text-white/75" : "text-[#083334]/65"
            }`}
          >
            {isFeatured
              ? "Setup inicial + integración + piloto incluido"
              : "Operación mensual, APIs y monitoreo continuo"}
          </p>
        </div>
        <div
          className={`rounded-2xl border px-3 py-2 text-right transition-transform duration-500 group-hover:scale-[1.02] ${
            isFeatured
              ? "border-[#bccf03]/35 bg-[#bccf03]/18"
              : "border-[#006667]/10 bg-[#bccf03]/20"
          }`}
        >
          <p
            className={`text-[11px] font-semibold uppercase tracking-widest ${
              isFeatured ? "text-white/80" : "text-[#083334]/70"
            }`}
          >
            Total
          </p>
          <p
            className={`text-2xl font-extrabold tracking-tight ${
              isFeatured ? "text-white" : "text-[#083334]"
            }`}
          >
            {total}
          </p>
        </div>
      </div>

      <div
        className={`relative rounded-2xl border p-3 ${
          isFeatured ? "border-white/10 bg-white/5" : "border-[#006667]/10 bg-[#f6f6f8]"
        }`}
      >
        <div
          className={`mb-3 grid grid-cols-[1.1fr_1.7fr_auto] gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-widest ${
            isFeatured
              ? "bg-white/5 text-white/75"
              : "bg-[#006667] text-white"
          }`}
        >
          <span>Concepto</span>
          <span>Descripción / Alcance</span>
          <span className="text-right">Monto</span>
        </div>

        <div className="grid gap-2.5">
          {rows.map((row, index) => (
            <div
              key={row.concept}
              style={{ transitionDelay: `${index * 40}ms` }}
              className={`group/row rounded-2xl border p-3 transition-all duration-500 hover:-translate-y-0.5 ${
                isFeatured
                  ? "border-white/10 bg-white/6 hover:bg-white/10"
                  : "border-[#006667]/10 bg-white hover:border-[#006667]/20 hover:shadow-[0_10px_24px_rgba(0,102,103,0.07)]"
              }`}
            >
              <div className="grid gap-3 md:grid-cols-[1.05fr_1.75fr_auto] md:items-start">
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border ${
                      isFeatured
                        ? "border-white/15 bg-white/10 text-[#bccf03]"
                        : "border-[#006667]/10 bg-[#bccf03]/20 text-[#083334]"
                    }`}
                  >
                    <CheckCircle2 className="size-3.5" />
                  </span>
                  <p
                    className={`text-sm font-semibold leading-6 ${
                      isFeatured ? "text-white" : "text-[#083334]"
                    }`}
                  >
                    {row.concept}
                  </p>
                </div>

                <p
                  className={`text-sm leading-6 ${
                    isFeatured ? "text-white/85" : "text-[#083334]/80"
                  }`}
                >
                  {row.scope}
                </p>

                <div className="md:text-right">
                  <span
                    className={`inline-flex rounded-xl border px-3 py-1.5 text-sm font-extrabold tracking-tight transition-transform duration-300 group-hover/row:scale-[1.02] ${
                      isFeatured
                        ? "border-[#bccf03]/25 bg-[#bccf03]/10 text-white"
                        : "border-[#006667]/10 bg-[#f6f6f8] text-[#006667]"
                    }`}
                  >
                    {row.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LevelBadge({ level }: { level: "Alto" | "Medio" | "Bajo" }) {
  const tone =
    level === "Alto"
      ? "bg-red-50 text-red-700 border-red-200"
      : level === "Medio"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase ${tone}`}
    >
      {level}
    </span>
  );
}
