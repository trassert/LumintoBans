import Link from "next/link";

import { siteConfig } from "@config/site";
import { getSkinFaceUrl, getDefaultSkinUrl } from "@/utils/skin";
import { PunishmentInfo, PunishmentType } from "@/types";
import { language } from "@/lib/language/dictionaries";

import { AvatarBody } from "@/components/avatar/avatar-body";
import { AvatarBust } from "@/components/avatar/avatar-bust";
import { SkinImage } from "@/components/avatar/skin-image";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import { PunishmentDetails } from "@/components/info/punishment-details";

interface PunishmentInfoCardProps {
  type: PunishmentType;
  punishment: PunishmentInfo;
}

export const PunishmentInfoCard = async ({ type, punishment }: PunishmentInfoCardProps) => {
  const { lang, dictionary } = await language();

  return (
    <div className="rounded-2xl border bg-card p-6 text-center shadow-sm md:p-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
        {/* Punished player */}
        <div className="flex flex-1 flex-col items-center gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {dictionary.words.player}
          </h2>
          <Link href={`/@${punishment.name}`} className="group block">
            <AvatarBody
              name={punishment.name}
              uuid={punishment.uuid}
              className="drop-shadow-xl group-hover:scale-105 md:h-[312px]"
            />
            <AvatarBust
              name={punishment.name}
              uuid={punishment.uuid}
              className="drop-shadow-xl group-hover:scale-105"
            />
          </Link>
          <div className="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1">
            <SkinImage
              src={getSkinFaceUrl(punishment.name, punishment.uuid)}
              fallbackSrc={[getDefaultSkinUrl("face"), siteConfig.defaultSkin.head]}
              alt={`${punishment.name}'s avatar`}
              width={24}
              height={24}
              className="rounded-sm"
            />
            <p className="text-lg font-medium">{punishment.name}</p>
          </div>
        </div>

        {/* Punishment details (desktop) */}
        <div className="hidden w-[350px] shrink-0 md:block">
          <PunishmentDetails type={type} dictionary={dictionary} lang={lang} punishment={punishment} />
        </div>

        {/* Staff */}
        <div className="flex flex-1 flex-col items-center gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {dictionary.words.staff}
          </h2>
          <Link href={`/history?staff=${punishment.banned_by_uuid}`} className="group block">
            <div className="scale-x-[-1]">
              <AvatarBody
                name={punishment.banned_by_name}
                uuid={punishment.banned_by_uuid}
                console={punishment.console}
                className="drop-shadow-xl group-hover:scale-105 md:h-[312px]"
              />
              <AvatarBust
                name={punishment.banned_by_name}
                uuid={punishment.banned_by_uuid}
                console={punishment.console}
                className="drop-shadow-xl group-hover:scale-105"
              />
            </div>
          </Link>
          <div className="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1">
            {punishment.console ? (
              <ConsoleAvatar name={punishment.banned_by_name!} size={24} className="!mx-0" />
            ) : (
              <SkinImage
                src={getSkinFaceUrl(punishment.banned_by_name, punishment.banned_by_uuid)}
                fallbackSrc={[getDefaultSkinUrl("face"), siteConfig.defaultSkin.head]}
                alt={`${punishment.banned_by_name}'s avatar`}
                width={24}
                height={24}
                className="rounded-sm"
              />
            )}
            <p className="text-lg font-medium">{punishment.banned_by_name}</p>
          </div>
        </div>
      </div>

      {/* Punishment details (mobile) */}
      <div className="mx-auto mt-6 w-full max-w-[350px] md:hidden">
        <PunishmentDetails type={type} dictionary={dictionary} lang={lang} punishment={punishment} />
      </div>
    </div>
  );
}
