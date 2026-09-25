import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

/** Body and interface copy. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Headlines and display type. The technical-but-drawn half of the pairing. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Labels, part numbers, dates, measurements, terminal panes. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://dumdles.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dylan Chong — Design, Engineering, Security",
    template: "%s — Dylan Chong",
  },
  description: "Portfolio of Dylan Chong. I design interfaces, build software, and study how both break.",
  keywords: ["Dylan Chong", "portfolio", "UI design", "graphic design", "software development", "cybersecurity", "Singapore"],
  authors: [{ name: "Dylan Chong", url: SITE_URL }],
  creator: "Dylan Chong",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: "Dylan Chong",
    title: "Dylan Chong — Design, Engineering, Security",
    description: "Portfolio of Dylan Chong. I design interfaces, build software, and study how both break.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Chong — Design, Engineering, Security",
    description: "Portfolio of Dylan Chong. I design interfaces, build software, and study how both break.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#14181f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required: next-themes sets the class and
    // color-scheme on this element before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks the document as scripted before first paint. Scroll reveals
            only hide content when this attribute is present, so a visitor
            without JavaScript gets a complete, static page rather than a
            blank one. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.setAttribute('data-js','')" }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
