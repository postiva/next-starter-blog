"use client";

import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackBlogs() {
  return (
    <Link
      href="/blogs"
      className={buttonVariants({ variant: "outline", size: "sm" })}
    >
      <ChevronLeft className="w-4 h-4" />
      Back to blogs
    </Link>
  );
}
