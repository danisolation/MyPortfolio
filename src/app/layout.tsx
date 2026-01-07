import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Tran Quoc Dung | Software Developer",
  description:
    "Portfolio of Tran Quoc Dung - A passionate Software Developer specializing in React, Node.js, and modern web technologies.",
  keywords: [
    "Software Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Node.js",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Tran Quoc Dung" }],
  openGraph: {
    title: "Tran Quoc Dung | Software Developer",
    description:
      "Portfolio of Tran Quoc Dung - A passionate Software Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
