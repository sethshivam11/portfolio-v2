import "./globals.css";
import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shivam's Portfolio",
  description: "Personal portfolio website of Shivam",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Shivam",
    description:
      "A passionate developer focused on creating beautiful and functional web experiences.",
    siteName: "Shivam",
    images: [
      {
        url: `/opengraph-image.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam",
    description:
      "A passionate developer focused on creating beautiful and functional web experiences.",
    creator: "@sethshivam11",
    siteId: "765045797750706176",
    images: [
      {
        url: `/opengraph-image.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
