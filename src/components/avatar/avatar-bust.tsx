import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinBodyUrl } from "@/utils/skin";

import { SkinImage } from "@/components/avatar/skin-image";

interface AvatarBustProps {
  name: string | null | undefined;
  uuid?: string | null;
  console?: boolean;
  className?: string;
}

export const AvatarBust = ({ name, uuid, console, className }: AvatarBustProps) => (
  <SkinImage
    src={console ? siteConfig.console.bust : getSkinBodyUrl(name, uuid)}
    fallbackSrc={console ? undefined : siteConfig.defaultSkin.bust}
    alt={name ?? ""}
    width={140}
    height={312}
    className={cn("md:hidden mx-auto object-contain transition ease-in-out", className)}
  />
)
