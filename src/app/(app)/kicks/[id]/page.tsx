import { notFound } from "next/navigation";

import { formatDate } from "@/lib/date";
import { siteConfig } from "@config/site";
import { getSkinFaceUrl } from "@/utils/skin";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { getCachedKick as getKick } from "@/lib/punishment/kick";

import { PunishmentInfoCard } from "@/components/info/punishment-info-card";

export async function generateMetadata({ params }: { params: { id: string } }) {

  const { dictionary } = await language();

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const kick = await getKick(parseInt(params.id));

  if (!kick) {
    return notFound();
  }

  return {
    title: p(dictionary.pages.kicks.info.title, {
      id: params.id
    }),
    openGraph: {
      images: getSkinFaceUrl(kick.name, kick.uuid, 40),
      description: p(siteConfig.openGraph.punishments.kick.description, {
        name: kick.name,
        staff: kick.banned_by_name,
        reason: kick.reason,
        time: formatDate(kick.time),
        server: kick.server
      })
    }
  }
}

export default async function Kick({
  params
}: {
  params: { id: string }
}) {

  const { dictionary } = await language();
  const localDictionary = dictionary.pages.kicks;

  if (isNaN(parseInt(params.id))) {
    notFound();
  }

  const kick = await getKick(parseInt(params.id));

  if (!kick) {
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
        <PunishmentInfoCard type="kick" punishment={kick} />
      </section>
    </div>
  )
}
