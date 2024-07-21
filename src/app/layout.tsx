import "@/styles/kmenu-variables.css";
import "kmenu/dist/cmdk.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Provider } from "@/components/providers/main-provider";
import { Announcement } from "@/components/ui/announcemene";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#375DFB",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    template: "%s - Postiva",
    default: "Postiva - Next.js Blog Template",
  },
  description:
    "Postiva's Next.js Blog Template offers a seamless and customizable solution for creating modern, responsive blogs. With built-in SEO features, easy content management, and stylish design, this template simplifies your blogging experience.",
  robots: "index, follow",
  openGraph: {
    title: "Postiva - Next.js Blog Template",
    type: "website",
    url: "https://next.postiva.app",
    images: [
      {
        url: "/open-graph/banner.png",
        width: 1200,
        height: 630,
        alt: "Postiva - Next.js Blog Template",
      },
    ],
    description:
      "Explore Postiva's Next.js Blog Template, designed for content creators looking for an intuitive and powerful blogging platform. Enhance your online presence with our advanced features.",
    siteName: "Postiva",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Postiva",
    title: "Postiva - Next.js Blog Template",
    description:
      "Discover Postiva's Next.js Blog Template, offering a streamlined solution for creating, managing, and sharing your blog content with ease.",
    images: ["/open-graph/banner.png"],
    creator: "@postivaapp",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.ico",
    },
  ],
  metadataBase: new URL("https://next.postiva.app"),
  keywords: [
    "Next.js blog template",
    "modern blog template",
    "responsive blog design",
    "SEO-friendly blog",
    "content management system",
    "blogging platform",
    "easy blog management",
    "blog content creation",
    "digital marketing",
    "content strategy",
    "blog SEO tools",
    "blog analytics",
    "content optimization",
    "blog collaboration",
    "content sharing",
    "user engagement analytics",
    "content workflow",
    "interactive blog content",
    "content visualization",
    "blog publishing",
    "content curation",
    "blog design",
  ],
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
          "min-h-screen bg-background font-sans antialiased text-black bg-white dark:bg-[#121212] dark:text-white",
          fontSans.variable
        )}
      >
        <Announcement />
        <Provider>
          <main className="container mx-auto pt-24 pb-10 px-20">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
