"use client";

import Image from "next/image";
import { useState } from "react";

export default function PostDetailThumbnail({
  imageSrc,
}: {
  imageSrc: string;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  return (
    <div className="relative aspect-w-1 aspect-h-1 w-[360px] md:w-[600px] h-52 overflow-hidden rounded-xl bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 md:h-96">
      <Image
        src={imageSrc}
        className={`transform transition-all duration-500 rounded-lg group-hover:opacity-7 ${
          isImageLoaded
            ? "scale-75 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }`}
        layout="fill"
        objectFit="cover"
        alt=""
        onLoadingComplete={() => setIsImageLoaded(false)}
      />
    </div>
  );
}
