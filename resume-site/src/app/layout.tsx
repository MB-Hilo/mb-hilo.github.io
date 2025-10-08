import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FloatingLettersBackground from "@/components/FloatingLettersBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mark Bradley — Full‑Stack Developer & Technical Co‑founder",
  description: "Resume and portfolio of Mark Bradley, Full-Stack Developer and Technical Co-founder with 15+ years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <FloatingLettersBackground />
        {children}
      </body>
    </html>
  );
}
