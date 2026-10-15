import { notFound } from "next/navigation";

import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { formatDate, formatDuration } from "@/lib/date";
import { getSkinFaceUrl } from "@/utils/skin";
import { getCachedMute as getMute } from "@/lib/punishment/mute";

import { Badge } from "@/components/ui/badge";
import { PunishmentInfoCard } from "@/components/info/punishment-info-card";

export async function generateMetadata({ params }: { params: { id: string } }) {

  const { lang, dictionary } = await language();

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const mute = await getMute(parseInt(params.id), dictionary.pages.mutes);

  if (!mute) {
    return notFound();
  }

  return {
    title: p(dictionary.pages.mutes.info.title, {
      id: params.id
    }),
    openGraph: {
      images: getSkinFaceUrl(mute.name, mute.uuid, 40),
      description: p(siteConfig.openGraph.punishments.mute.description, {
        name: mute.name,
        staff: mute.banned_by_name,
        reason: mute.reason,
        time: formatDate(mute.time),
        duration: mute.until instanceof Date ? formatDuration(mute.time, mute.until, lang) : mute.until,
        server: mute.server
      })
    }
  }
}

export default async function Mute({
  params
}: {
  params: { id: string }
}) {

  const { dictionary } = await language();
  const localDictionary = dictionary.pages.mutes;

  if (isNaN(parseInt(params.id))) {
    notFound();
  }

  const mute = await getMute(parseInt(params.id), localDictionary);

  if (!mute) {
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
          {mute.ipban && (
            <Badge variant="secondary">{localDictionary.info.badges.ipmute}</Badge>
          )}
          {mute.active && (
            <Badge variant="secondary">{localDictionary.info.badges.active}</Badge>
          )}
          {(mute.status !== undefined && !mute.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.expired}</Badge>
          )}
          {(mute.permanent && mute.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.permanent}</Badge>
          )}
        </div>
      </div>

      <section className="w-full max-w-5xl">
        <PunishmentInfoCard type="mute" punishment={mute} />
      </section>
    </div>
  )
}
