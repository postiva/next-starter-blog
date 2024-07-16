import "kmenu/dist/cmdk.css";
import "kmenu/dist/vars.css";
import type { Metadata } from "next";
import "./globals.css";

import { Provider } from "@/components/providers/main-provider";
import { cn } from "@/lib/utils";
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
    <html data-mode="dark" lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-black text-white",
          fontSans.variable
        )}
      >
        <Provider>
          <main className="container mx-auto pt-24 pb-10 px-20">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
