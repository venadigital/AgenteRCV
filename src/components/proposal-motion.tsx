"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

export function ProposalMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const titleEl = document.querySelector<HTMLElement>("[data-hero-title]");
    const finalTitle = titleEl?.dataset.finalTitle ?? "";

    if (titleEl && finalTitle) {
      titleEl.textContent = reduceMotion ? finalTitle : "";
    }

    if (reduceMotion) {
      document
        .querySelectorAll<HTMLElement>("[data-bar-target]")
        .forEach((barElement) => {
          const target = Number(barElement.dataset.barTarget ?? 100);
          barElement.style.transform = `scaleX(${Math.max(
            0,
            Math.min(1, target / 100),
          )})`;
        });
      return;
    }

    const ctx = gsap.context(() => {
      if (titleEl && finalTitle) {
        gsap.to(titleEl, {
          text: finalTitle,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.15,
        });
      }

      gsap.fromTo(
        ".js-hero-panel",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        ".js-capability-card",
        { y: 20, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.45,
        },
      );

      gsap.utils.toArray<HTMLElement>(".js-diagnostic-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-flow-timeline]")
        .forEach((flowTimelineEl) => {
          const sequenceItems = Array.from(
            flowTimelineEl.querySelectorAll<HTMLElement>("[data-flow-seq]"),
          );
          const markers = Array.from(
            flowTimelineEl.querySelectorAll<HTMLElement>("[data-flow-marker]"),
          );
          const progressFill = flowTimelineEl.querySelector<HTMLElement>(
            "[data-flow-progress-fill]",
          );

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: flowTimelineEl,
              start: "top 78%",
              once: true,
            },
          });

          if (progressFill) {
            tl.fromTo(
              progressFill,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 0.95, ease: "power2.out" },
              0,
            );
          }

          if (markers.length) {
            tl.fromTo(
              markers,
              { y: 6, opacity: 0.45, scale: 0.98 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.35,
                stagger: 0.06,
                ease: "power2.out",
              },
              0.08,
            );
          }

          sequenceItems.forEach((item, index) => {
            const kind = item.dataset.flowKind;

            if (kind === "link") {
              const orientation = item.dataset.flowOrientation;
              const tracks = item.querySelectorAll<HTMLElement>(
                "[data-flow-link-track]",
              );
              const arrow = item.querySelector<HTMLElement>("[data-flow-link-arrow]");

              tl.fromTo(
                item,
                { opacity: 0.35 },
                { opacity: 1, duration: 0.15, ease: "power1.out" },
                index === 0 ? 0.12 : ">-0.05",
              );

              tl.fromTo(
                tracks,
                {
                  scaleX: orientation === "horizontal" ? 0 : 1,
                  scaleY: orientation === "vertical" ? 0 : 1,
                  transformOrigin:
                    orientation === "vertical" ? "top center" : "left center",
                },
                {
                  scaleX: 1,
                  scaleY: 1,
                  duration: 0.24,
                  stagger: 0.04,
                  ease: "power2.out",
                },
                "<",
              );

              if (arrow) {
                tl.fromTo(
                  arrow,
                  { x: orientation === "horizontal" ? -4 : 0, y: orientation === "vertical" ? -4 : 0, opacity: 0 },
                  { x: 0, y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
                  "<+0.05",
                );
              }

              return;
            }

            tl.fromTo(
              item,
              { y: 16, opacity: 0, scale: 0.97, filter: "blur(4px)" },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.35,
                ease: "power2.out",
              },
              index === 0 ? 0.15 : ">-0.06",
            );

            tl.to(
              item,
              {
                boxShadow: "0 0 0 1px rgba(188,207,3,0.35), 0 14px 28px rgba(0,102,103,0.12)",
                duration: 0.16,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
              },
              "<+0.05",
            );
          });
        });

      gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-bar-target]").forEach((bar) => {
        const target = Number(bar.dataset.barTarget ?? 100);

        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: Math.max(0, Math.min(1, target / 100)),
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".js-line-progress",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
