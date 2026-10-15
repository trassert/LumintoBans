"use client"

import { useEffect, useState } from "react";

interface SkinImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  alt?: string;
}

// Renders a skin image and swaps it for the default skin when the skin service
// fails (unknown player, network error, service outage), so the preview never
// degrades to text-only.
export const SkinImage = ({ src, fallbackSrc, alt = "", ...props }: SkinImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
