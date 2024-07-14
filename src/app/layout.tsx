import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Inter as FontSans } from "next/font/google";

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
          "min-h-screen bg-background font-sans antialiased bg-black",
          fontSans.variable
        )}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
