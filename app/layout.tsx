import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fill Home | Revestimientos de alta gama",
    template: "%s | Fill Home",
  },
  description:
    "Revestimientos de alta gama que combinan la calidez de la madera con la resistencia del metal. Diseño arquitectónico simplificado para proyectos exigentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-carbon font-body text-offwhite antialiased">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-sand focus:px-4 focus:py-2 focus:text-carbon"
        >
          Saltar al contenido principal
        </a>
        <Navbar />
        <main id="contenido-principal" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
