import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackBlogs() {
  return (
    <Link
      href="/"
      className={buttonVariants({
        variant: "outline",
        size: "sm",
        className: "flex items-center mb-6 dark:!bg-secondary",
      })}
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      Back to blogs
    </Link>
  );
}
