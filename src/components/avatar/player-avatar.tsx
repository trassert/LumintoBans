import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinFaceUrl } from "@/utils/skin";

import { SkinImage } from "@/components/avatar/skin-image";

interface PlayerAvatarProps {
  name: string | null | undefined;
  uuid?: string | null;
  size?: number;
  className?: string;
}

export const PlayerAvatar = ({
  name,
  uuid,
  size,
  className
}: PlayerAvatarProps) => (
  <SkinImage
    src={getSkinFaceUrl(name, uuid, 8)}
    fallbackSrc={siteConfig.defaultSkin.head}
    alt="Аватар"
    width={size ?? 32}
    height={size ?? 32}
    className={cn("mx-auto rounded-sm", className)}
  />
)
