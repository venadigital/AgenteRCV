import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Propuesta Comercial | RCV Recover",
  description:
    "Propuesta comercial visual para Agente Virtual de WhatsApp con IA de RCV Recover.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${libreFranklin.variable} antialiased`}>{children}</body>
    </html>
  );
}
