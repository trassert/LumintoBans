import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinId } from "@/utils/bedrock";

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
    src={`https://minotar.net/helm/${encodeURIComponent(getSkinId(name, uuid))}/128`}
    fallbackSrc={siteConfig.defaultSkin.head}
    alt="Аватар"
    width={size ?? 32}
    height={size ?? 32}
    className={cn("mx-auto rounded-sm", className)}
  />
)
