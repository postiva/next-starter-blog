"use client";

import { Button } from "@nextui-org/button";
import { ChevronLeft } from "lucide-react";

export default function BackBlogs() {
  return (
    <Button size="sm" variant="flat" href="/blogs" className="w-fit">
      <ChevronLeft className="w-4 h-4" />
      Back to blogs
    </Button>
  );
}
