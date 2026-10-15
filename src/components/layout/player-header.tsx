import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import q from "@/lib/language/utils/quantity";
import { getSkinBodyUrl } from "@/utils/skin";
import { PunishmentType } from "@/types";
import { Dictionary } from "@/lib/language/types";
import {
  getPlayerBanCount,
  getPlayerKickCount,
  getPlayerMuteCount,
  getPlayerWarnCount
} from "@/lib/punishment/player";

import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/layout/icons";
import { SkinImage } from "@/components/avatar/skin-image";

interface PlayerHeaderProps {
  player: {
    uuid: string | null;
    name: string | null;
  };
  playerName: string;
  dictionary: Dictionary;
  active?: PunishmentType;
}

export const PlayerHeader = async ({
  player,
  playerName,
  dictionary,
  active
}: PlayerHeaderProps) => {

  const counts: Record<PunishmentType, number> = {
    ban: await getPlayerBanCount(player.uuid!),
    mute: await getPlayerMuteCount(player.uuid!),
    warn: await getPlayerWarnCount(player.uuid!),
    kick: await getPlayerKickCount(player.uuid!)
  };

  const badges: { type: PunishmentType; href: string; icon: React.ReactNode; label: string }[] = [
    { type: "ban", href: `/@${playerName}/bans`, icon: <Icons.ban className="w-4 h-4 mr-1" />, label: dictionary.words.bans },
    { type: "mute", href: `/@${playerName}/mutes`, icon: <Icons.mute className="w-4 h-[0.9rem] mr-1" />, label: dictionary.words.mutes },
    { type: "warn", href: `/@${playerName}/warns`, icon: <Icons.warn className="w-4 h-4 mr-1" />, label: dictionary.words.warns },
    { type: "kick", href: `/@${playerName}/kicks`, icon: <Icons.kick className="w-4 h-4 mr-1" />, label: dictionary.words.kicks }
  ];

  return (
    <div className="space-y-2 md:flex md:space-x-4">
      <SkinImage
        src={getSkinBodyUrl(player.name, player.uuid)}
        fallbackSrc={siteConfig.defaultSkin.bust}
        alt={playerName}
        width={140}
        height={312}
        className="mx-auto h-[192px] w-[192px] object-contain"
      />
      <div className="md:w-[350px] md:py-4 space-y-1">
        <h1 className="text-gradient text-center md:text-left text-4xl font-bold leading-tight tracking-tighter sm:text-5xl lg:leading-[1.1]">
          {p(dictionary.pages.playerHistory.title, {
            player: playerName
          })}
        </h1>
        <div className="flex space-x-2 whitespace-nowrap">
          {badges.map(({ type, href, icon, label }) =>
            counts[type] > 0 && (
              <Link key={type} href={href}>
                <Badge
                  variant={active === type ? "default" : "secondary"}
                  className={cn("px-1", active !== type && "text-secondary-foreground/50")}
                >
                  {icon} {counts[type]} {q(label, counts[type]).toUpperCase()}
                </Badge>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
