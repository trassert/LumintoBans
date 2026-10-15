import { notFound } from "next/navigation";

import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { formatDate, formatDuration } from "@/lib/date";
import { getSkinFaceUrl } from "@/utils/skin";
import { getCachedBan as getBan } from "@/lib/punishment/ban";

import { Badge } from "@/components/ui/badge";
import { PunishmentInfoCard } from "@/components/info/punishment-info-card";

export async function generateMetadata({ params }: { params: { id: string } }) {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.bans;

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const ban = await getBan(parseInt(params.id), localDictionary);

  if (!ban) {
    return notFound();
  }

  return {
    title: p(dictionary.pages.bans.info.title, {
      id: params.id
    }),
    openGraph: {
      images: getSkinFaceUrl(ban.name, ban.uuid, 40),
      description: p(siteConfig.openGraph.punishments.ban.description, {
        name: ban.name,
        staff: ban.banned_by_name,
        reason: ban.reason,
        time: formatDate(ban.time),
        duration: ban.until instanceof Date ? formatDuration(ban.time, ban.until, lang) : ban.until,
        server: ban.server
      })
    }
  }
}

export default async function Ban({
  params
}: {
  params: { id: string }
}) {

  const { dictionary } = await language();
  const localDictionary = dictionary.pages.bans;

  if (isNaN(parseInt(params.id))) {
    notFound();
  }

  const ban = await getBan(parseInt(params.id), localDictionary);

  if (!ban) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 px-4 py-8 md:py-12 md:pb-8 lg:py-18">
      <div className="space-y-2">
        <h1 className="text-gradient text-center text-4xl font-bold leading-tight tracking-tighter sm:text-5xl lg:leading-[1.1]">
          {p(localDictionary.info.title, {
            id: params.id
          })}
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {ban.ipban && (
            <Badge variant="secondary">{localDictionary.info.badges.ipban}</Badge>
          )}
          {ban.active && (
            <Badge variant="secondary">{localDictionary.info.badges.active}</Badge>
          )}
          {(ban.status !== undefined && !ban.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.expired}</Badge>
          )}
          {(ban.permanent && ban.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.permanent}</Badge>
          )}
        </div>
      </div>

      <section className="w-full max-w-5xl">
        <PunishmentInfoCard type="ban" punishment={ban} />
      </section>
    </div>
  )
}
