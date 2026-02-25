"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type BeamConfig = {
  initialX: number;
  translateX?: number;
  duration: number;
  repeatDelay: number;
  delay?: number;
  rotate?: number;
  className?: string;
};

type CollisionPoint = {
  detected: boolean;
  coordinates: { x: number; y: number } | null;
};

export function BackgroundBeamsWithCollision({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const beams: BeamConfig[] = [
    { initialX: 40, duration: 7, repeatDelay: 3, delay: 0.5, className: "h-12" },
    { initialX: 180, duration: 4.5, repeatDelay: 4, delay: 1.2, className: "h-20" },
    { initialX: 320, duration: 6.8, repeatDelay: 3, delay: 2.3, className: "h-10" },
    { initialX: 520, duration: 5.6, repeatDelay: 2.5, delay: 0.8, className: "h-16" },
    { initialX: 760, duration: 7.5, repeatDelay: 3.5, delay: 2.8, className: "h-12" },
    { initialX: 980, duration: 5.2, repeatDelay: 2.2, delay: 1.6, className: "h-16" },
    { initialX: 1180, duration: 8.2, repeatDelay: 4.5, delay: 3.1, className: "h-10" },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative flex min-h-[15rem] w-full items-center justify-center overflow-hidden rounded-3xl sm:min-h-[20rem]",
        "border border-[#006667]/12 bg-gradient-to-b from-[#083334] via-[#072c2d] to-[#051d1e]",
        "shadow-[0_18px_50px_rgba(0,40,40,0.18)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_10%,rgba(188,207,3,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(0,102,103,0.22),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.03),transparent_55%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {beams.map((beam, idx) => (
        <CollisionBeam
          key={`${beam.initialX}-${idx}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      <div className="relative z-20 w-full px-4 py-8 sm:px-10 sm:py-10">{children}</div>

      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 border-t border-white/5 bg-gradient-to-b from-[#0f3f40]/90 to-[#052728]"
        style={{
          boxShadow:
            "0 -8px 24px rgba(0,102,103,0.12), 0 -1px 0 rgba(255,255,255,0.04) inset",
        }}
      />
    </div>
  );
}

function CollisionBeam({
  parentRef,
  containerRef,
  beamOptions,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  beamOptions: BeamConfig;
}) {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<CollisionPoint>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          setCollision({
            detected: true,
            coordinates: {
              x: beamRect.left - parentRect.left + beamRect.width / 2,
              y: beamRect.bottom - parentRect.top,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const interval = window.setInterval(checkCollision, 50);
    return () => window.clearInterval(interval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (!collision.detected) return;

    const resetTimer = window.setTimeout(() => {
      setCollision({ detected: false, coordinates: null });
      setCycleCollisionDetected(false);
    }, 900);

    const rerenderTimer = window.setTimeout(() => {
      setBeamKey((prev) => prev + 1);
    }, 950);

    return () => {
      window.clearTimeout(resetTimer);
      window.clearTimeout(rerenderTimer);
    };
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: "-220px",
          translateX: beamOptions.initialX,
          rotate: beamOptions.rotate ?? 0,
          opacity: 0.95,
        }}
        variants={{
          animate: {
            translateY: "1200px",
            translateX: beamOptions.translateX ?? beamOptions.initialX,
            rotate: beamOptions.rotate ?? 0,
            opacity: [0.85, 1, 0.85],
          },
        }}
        transition={{
          duration: beamOptions.duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay ?? 0,
          repeatDelay: beamOptions.repeatDelay,
        }}
        className={cn(
          "absolute left-0 top-0 m-auto w-px rounded-full",
          "bg-gradient-to-b from-transparent via-[#39c3c4] to-[#bccf03]",
          "shadow-[0_0_14px_rgba(57,195,196,0.35)]",
          beamOptions.className ?? "h-14",
        )}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates ? (
          <BeamExplosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function BeamExplosion(props: React.HTMLProps<HTMLDivElement>) {
  const sparks = Array.from({ length: 14 }, (_, index) => ({
    id: index,
    dx: Math.floor(Math.random() * 70 - 35),
    dy: Math.floor(Math.random() * -40 - 8),
  }));

  return (
    <div {...props} className={cn("absolute z-30 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-[#39c3c4] to-transparent blur-sm"
      />

      <motion.div
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 1.4, opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bccf03]/60"
      />

      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: spark.dx, y: spark.dy, opacity: 0 }}
          transition={{ duration: 0.45 + Math.random() * 0.4, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-[#bccf03] to-[#39c3c4]"
        />
      ))}
    </div>
  );
}
