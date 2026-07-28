import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import EasterEgg from "@/components/EasterEgg";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://sameerahmed.dev"; // TODO: swap for the real domain
const DESCRIPTION =
  "Full-stack engineer building AI-powered products end to end — architecture, build, and ship. Two years, shipped to production.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Sameer Ahmed — Full-stack engineer building AI-era products",
  description: DESCRIPTION,
  openGraph: {
    title: "Sameer Ahmed — Full-stack engineer",
    description: DESCRIPTION,
    url: SITE,
    siteName: "Sameer Ahmed",
    type: "profile",
  },
  twitter: { card: "summary_large_image", title: "Sameer Ahmed", description: DESCRIPTION },
};

// Recruiters google you before they email you; this is what search engines read.
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sameer Ahmed",
  jobTitle: "Full-stack engineer",
  description: DESCRIPTION,
  url: SITE,
  email: "mailto:sameer03054@gmail.com",
  sameAs: [
    "https://github.com/SameerAhm-ed",
    "https://www.linkedin.com/in/sameerahm-ed/",
  ],
  knowsAbout: [
    "Full-stack engineering",
    "AI agents",
    "Retrieval-augmented generation",
    "Next.js",
    "TypeScript",
    "Cloud infrastructure",
  ],
};

// Runs before first paint so the correct theme is on <html> immediately —
// otherwise the page flashes light before hydration can correct it.
const THEME_INIT = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.setAttribute('data-theme','dark');}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT }}
        />
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
      </head>
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <CommandPalette />
        <EasterEgg />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
