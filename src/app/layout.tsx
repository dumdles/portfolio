import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify weights you need
  variable: "--font-jetbrains-mono", // Create a CSS variable
});

export const metadata: Metadata = {
  title: "My Porfolio",
  description: "A personal portfolio website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {/* Inter and JetBrains on body */}
        {children}
      </body>
    </html>
  );
}
