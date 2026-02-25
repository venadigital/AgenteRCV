import Image from "next/image";
import { Cloud } from "lucide-react";
import { SiN8N, SiOpenai, SiWhatsapp } from "react-icons/si";

type OrbitItem = {
  name: string;
  node: React.ReactNode;
  ringSize: number;
  angle: number;
  duration: number;
  reverse?: boolean;
};

const orbitItems: OrbitItem[] = [
  {
    name: "WhatsApp",
    node: <SiWhatsapp className="size-5 text-[#25D366]" />,
    ringSize: 188,
    angle: 20,
    duration: 12,
  },
  {
    name: "n8n",
    node: <SiN8N className="size-5 text-[#EA4B71]" />,
    ringSize: 188,
    angle: 190,
    duration: 12,
  },
  {
    name: "OpenAI",
    node: <SiOpenai className="size-5 text-[#083334]" />,
    ringSize: 252,
    angle: 330,
    duration: 17,
    reverse: true,
  },
  {
    name: "SuNube",
    node: (
      <div className="flex items-center gap-1 text-[#006667]">
        <Cloud className="size-3.5" />
        <span className="text-[10px] font-bold tracking-tight">SuNube</span>
      </div>
    ),
    ringSize: 252,
    angle: 130,
    duration: 17,
    reverse: true,
  },
];

export function HeroLogoOrbit() {
  return <HeroLogoOrbitScaled size={320} />;
}

export function HeroLogoOrbitScaled({
  size = 320,
}: {
  size?: number;
}) {
  const scale = size / 320;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: 320, height: 320, transform: `scale(${scale})` }}
      >
        <div className="absolute inset-0 rounded-[2rem] border border-[#006667]/10 bg-gradient-to-br from-white via-white to-[#f6f6f8] shadow-[0_14px_40px_rgba(0,102,103,0.09)]" />
        <div className="absolute inset-5 rounded-[1.4rem] border border-[#006667]/8 bg-[#f6f6f8]/60" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-28 w-28 rounded-3xl border border-[#006667]/10 bg-white p-2 shadow-[0_10px_26px_rgba(0,102,103,0.1)]">
            <Image
              src="/rcv-recover-logo.png"
              alt="RCV Recover"
              width={112}
              height={112}
              className="h-full w-full rounded-2xl object-contain"
            />
          </div>
        </div>

        {[188, 252].map((ringSize) => (
          <div
            key={ringSize}
            className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-[#006667]/15"
            style={{
              width: ringSize,
              height: ringSize,
              marginLeft: -(ringSize / 2),
              marginTop: -(ringSize / 2),
            }}
          />
        ))}

        {orbitItems.map((item) => (
          <OrbitBadge key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function OrbitBadge({ item }: { item: OrbitItem }) {
  const radius = item.ringSize / 2;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: item.ringSize,
        height: item.ringSize,
        marginLeft: -(item.ringSize / 2),
        marginTop: -(item.ringSize / 2),
        willChange: "transform",
        animation: `rcv-orbit-spin ${item.duration}s linear infinite ${
          item.reverse ? "reverse" : "normal"
        }`,
      }}
    >
      <div
        className="absolute"
        style={{
          left: `calc(50% + ${radius * Math.cos((item.angle * Math.PI) / 180)}px)`,
          top: `calc(50% + ${radius * Math.sin((item.angle * Math.PI) / 180)}px)`,
          willChange: "transform",
          transform: "translate(-50%, -50%)",
          animation: `rcv-orbit-counter ${item.duration}s linear infinite ${
            item.reverse ? "normal" : "reverse"
          }`,
        }}
      >
        <div
          className="group flex min-h-12 min-w-12 items-center justify-center rounded-2xl border border-[#006667]/10 bg-white px-3 py-2 shadow-[0_8px_22px_rgba(0,102,103,0.1)] transition-transform duration-300 hover:scale-105"
          style={{
            animation: `rcv-orbit-bob ${Math.max(3.2, item.duration / 3)}s ease-in-out infinite`,
          }}
        >
          {item.node}
        </div>
      </div>
    </div>
  );
}
