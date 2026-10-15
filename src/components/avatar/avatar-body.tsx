import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinBodyUrl, getDefaultSkinUrl } from "@/utils/skin";

import { SkinImage } from "@/components/avatar/skin-image";

interface AvatarBodyProps {
  name: string | null | undefined;
  uuid?: string | null;
  console?: boolean;
  className?: string;
}

export const AvatarBody = ({ name, uuid, console, className }: AvatarBodyProps) => (
  <SkinImage
    src={console ? siteConfig.console.body : getSkinBodyUrl(name, uuid)}
    fallbackSrc={console ? undefined : [getDefaultSkinUrl("fullbody"), siteConfig.defaultSkin.body]}
    alt={name ?? ""}
    width={184}
    height={312}
    className={cn("hidden md:block mx-auto object-contain transition ease-in-out", className)}
  />
)
