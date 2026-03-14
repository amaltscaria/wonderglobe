import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WONDERGLOBE — Immersive Travel Experience | Arun T Scaria",
  description: "A comprehensive UX case study for WONDERGLOBE — an immersive VR travel experience exploring London landmarks through interactive worlds. UX research, user flows, and high-fidelity prototyping.",
  keywords: ["WONDERGLOBE", "UX Case Study", "VR Travel", "Interaction Design", "Arun T Scaria"],
  authors: [{ name: "Arun T Scaria" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌍</text></svg>",
  },
  openGraph: {
    type: "website",
    url: "https://aruntscaria.com/wonderglobe",
    title: "WONDERGLOBE — Immersive Travel Experience",
    description: "UX case study: Immersive VR travel exploration through interactive worlds",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
