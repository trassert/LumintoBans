import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinId } from "@/utils/bedrock";

import { SkinImage } from "@/components/avatar/skin-image";

interface AvatarBodyProps {
  name: string | null | undefined;
  uuid?: string | null;
  console?: boolean;
  className?: string;
}

export const AvatarBody = ({ name, uuid, console, className }: AvatarBodyProps) => (
  <SkinImage
    src={console ? siteConfig.console.body : `https://minotar.net/body/${encodeURIComponent(getSkinId(name, uuid))}/512`}
    fallbackSrc={console ? undefined : siteConfig.defaultSkin.body}
    alt={name ?? ""}
    width={192}
    height={192}
    className={cn("hidden md:block mx-auto transition ease-in-out", className)}
  />
)
