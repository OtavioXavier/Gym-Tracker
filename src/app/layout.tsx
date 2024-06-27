import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "./../components/layout/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from '../components/ui/toaster';
import Loading from './loading'
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GymTracker",
  description: "Tack your workout end to end",
  icons: { icon: "./logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      {/* overflow-x-hidden */}
        <body className={`${inter.className} `}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Suspense fallback={<Loading />}/>
            <NavBar>{children}</NavBar>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
