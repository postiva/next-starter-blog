import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next Blog Starter",
  description: "Next Blog Starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-black text-white",
          fontSans.variable
        )}
      >
        <TooltipProvider>
          <Toaster />
          <main className="container mx-auto pt-24 pb-10 px-20">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
