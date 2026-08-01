import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME } from "@/lib/brand.config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Revestimientos de alta gama`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Paneles de revestimiento madera-look sobre núcleo de poliuretano y respaldo de acero. Ingeniería de tres capas para proyectos exigentes.",
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
      className={`${fraunces.variable} ${generalSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-carbon font-body text-offwhite antialiased">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-sand focus:px-4 focus:py-2 focus:text-offwhite"
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
