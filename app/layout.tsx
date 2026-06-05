import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/features/Navbar";
import { Footer } from "@/components/features/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "./globals.css";

/* ─── Font ───────────────────────────────────── */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* ─── Root Metadata ──────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Compensation Intelligence Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Compensation Intelligence Platform`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── Root Layout ────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
