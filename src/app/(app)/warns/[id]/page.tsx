import { notFound } from "next/navigation";

import { formatDate } from "@/lib/date";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { getCachedWarn as getWarn } from "@/lib/punishment/warn";

import { PunishmentInfoCard } from "@/components/info/punishment-info-card";

export async function generateMetadata({ params }: { params: { id: string } }) {

  const { dictionary } = await language();

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const warn = await getWarn(parseInt(params.id));

  if (!warn) {
    return notFound();
  }

  return {
    title: p(dictionary.pages.warns.info.title, {
      id: params.id
    }),
    openGraph: {
      images: `https://minotar.net/helm/${warn?.name ?? warn?.uuid}`,
      description: p(siteConfig.openGraph.punishments.warn.description, {
        name: warn.name,
        staff: warn.banned_by_name,
        reason: warn.reason,
        time: formatDate(warn.time),
        server: warn.server
      })
    }
  }
}

export default async function Warn({
  params
}: {
  params: { id: string }
}) {

  const { dictionary } = await language();
  const localDictionary = dictionary.pages.warns;

  if (isNaN(parseInt(params.id))) {
    notFound();
  }

  const warn = await getWarn(parseInt(params.id));

  if (!warn) {
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
      </div>

      <section className="w-full max-w-5xl">
        <PunishmentInfoCard type="warn" punishment={warn} />
      </section>
    </div>
  )
}
