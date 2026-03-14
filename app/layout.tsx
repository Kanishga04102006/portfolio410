import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanishga Sathiyamoorthy",
  description: "Portfolio of Jayaprakash N - Full Stack Developer specializing in AI-powered applications, React, and modern web technologies. Building practical solutions that solve real problems.",
  keywords: ["Full Stack Developer", "AI", "React", "Next.js", "Python", "Portfolio", "Jayaprakash", "Web Developer", "Machine Learning"],
  authors: [{ name: "Jayaprakash N" }],
  creator: "Jayaprakash N",
  metadataBase: new URL("https://jayaprakash.dev"),
  openGraph: {
    title: "Jayaprakash N",
    description: "Building practical applications that solve real problems using AI and modern web technologies.",
    type: "website",
    locale: "en_US",
    siteName: "Jayaprakash N Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayaprakash N",
    description: "Building practical applications that solve real problems using AI and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0e7490" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ecfeff" media="(prefers-color-scheme: light)" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
