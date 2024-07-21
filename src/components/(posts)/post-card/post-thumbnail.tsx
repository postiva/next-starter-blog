"use client";

import { cn } from "@/lib/utils";
import Image from "next/legacy/image";
import { useState } from "react";

export default function PostThumbnail({
  imageSrc,
  className,
}: {
  imageSrc: string;
  className: string;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={cn(
        "aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-secondary xl:aspect-w-7 xl:aspect-h-8 h-52",
        className
      )}
    >
      <Image
        src={imageSrc}
        className={`transform transition-all duration-500 rounded-lg group-hover:opacity-75 ${
          isImageLoaded
            ? "scale-100 blur-0 grayscale-0"
            : "scale-75 blur-2xl grayscale"
        }`}
        layout="fill"
        objectFit="cover"
        alt=""
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
}
