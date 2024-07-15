"use client";

import { useState } from "react";
import Image from "next/legacy/image";

export default function PostThumbnail({ imageSrc }: { imageSrc: string }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 md:h-52 h-48">
      <Image src={imageSrc} className={`transform transition-all duration-500 rounded-lg group-hover:opacity-75 ${isImageLoaded ? "scale-100 blur-0 grayscale-0" : "scale-75 blur-2xl grayscale"}`} layout="fill" objectFit="cover" alt="" onLoad={() => setIsImageLoaded(true)} />
    </div>
  );
}
