"use client";

import { cn } from "@/lib/utils";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";

export default function PostThumbnail({
  imageSrc,
  className,
  slug,
}: {
  imageSrc: string;
  className?: string;
  slug: string;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "block relative mx-auto aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-secondary xl:aspect-w-7 xl:aspect-h-8 z-0 transition-all duration-300 h-52",
        className
      )}
    >
      <Image
        src={imageSrc}
        className={`transform transition-all duration-500 rounded-lg group-hover:opacity-75 ${
          isImageLoaded
            ? "scale-100 blur-0 grayscale-0 hover:scale-110 cursor-pointer"
            : "scale-75 blur-2xl grayscale"
        }`}
        layout="fill"
        objectFit="cover"
        alt=""
        onLoad={() => setIsImageLoaded(true)}
      />
    </Link>
  );
}
