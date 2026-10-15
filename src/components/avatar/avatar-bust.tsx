import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinId } from "@/utils/bedrock";

import { SkinImage } from "@/components/avatar/skin-image";

interface AvatarBustProps {
  name: string | null | undefined;
  uuid?: string | null;
  console?: boolean;
  className?: string;
}

export const AvatarBust = ({ name, uuid, console, className }: AvatarBustProps) => (
  <SkinImage
    src={console ? siteConfig.console.bust : `https://minotar.net/bust/${encodeURIComponent(getSkinId(name, uuid))}/512`}
    fallbackSrc={console ? undefined : siteConfig.defaultSkin.bust}
    alt={name ?? ""}
    width={192}
    height={192}
    className={cn("md:hidden mx-auto transition ease-in-out", className)}
  />
)
