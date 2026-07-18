import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QuantumCosmosBackground } from "@/components/ui/quantum-cosmos";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScholarProvider } from "@/components/providers/scholar-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quantum Workforce Academy",
    template: "%s | Quantum Workforce Academy",
  },
  description:
    "Premium quantum computing workforce development — courses, labs, careers, and simulations for the quantum era.",
  icons: {
    icon: [{ url: "/qwa-logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/qwa-logo.svg", type: "image/svg+xml" }],
  },
  applicationName: "Quantum Workforce Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning data-theme="dark">
      <body className="flex min-h-full flex-col bg-transparent text-[var(--qwa-fg)]">
        <ThemeProvider>
          <ScholarProvider>
            <QuantumCosmosBackground />
            <Navbar />
            <main className="qwa-page-main flex flex-1 flex-col">{children}</main>
            <Footer />
          </ScholarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
