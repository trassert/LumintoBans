"use client"

import { useState } from "react";

interface SkinImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
  src: string;
  fallbackSrc?: string | string[];
  alt?: string;
}

// Renders a skin and walks through the fallbacks (e.g. the renderer's default
// 3D skin, then a bundled placeholder) whenever a source fails to load, so a
// preview never degrades to a broken image or a mismatched flat placeholder.
// Keying on the requested source remounts the image whenever the skin changes,
// which resets the fallback step without needing to sync state in an effect.
export const SkinImage = (props: SkinImageProps) => (
  <SkinImageSources key={props.src} {...props} />
);

const SkinImageSources = ({ src, fallbackSrc, alt = "", ...props }: SkinImageProps) => {
  const fallbacks = fallbackSrc ? (Array.isArray(fallbackSrc) ? fallbackSrc : [fallbackSrc]) : [];
  const sources = [src, ...fallbacks];
  const [step, setStep] = useState(0);
  const currentSrc = sources[Math.min(step, sources.length - 1)];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => setStep((current) => Math.min(current + 1, sources.length - 1))}
    />
  );
}
