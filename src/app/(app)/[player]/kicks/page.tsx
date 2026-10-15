import { notFound } from "next/navigation";

import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { getSkinFaceUrl } from "@/utils/skin";
import { language } from "@/lib/language/dictionaries";
import { getPage, getStaff } from "@/utils/searchParams";
import {
  getPlayerByName,
  getPlayerKickCount
} from "@/lib/punishment/player";

import { KicksTable } from "@/components/punishments/kicks/kicks-table";
import { PlayerHeader } from "@/components/layout/player-header";

export async function generateMetadata({ params }: { params: { player: string } }) {

  const { dictionary } = await language();

  const playerName = params.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === siteConfig.console.uuid) {
    return {
      title: dictionary.pages.errors.notFound.title
    }
  }

  const kickCount = await getPlayerKickCount(player.uuid!);

  return {
    title: p(dictionary.pages.playerHistory.title, {
      player: playerName
    }),
    openGraph: {
      images: getSkinFaceUrl(player.name, player.uuid),
      description: p(siteConfig.openGraph.pages.player.kicks.description, {
        name: player.name,
        total: kickCount
      })
    }
  }
}

export default async function Kicks({
  searchParams,
  params
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { player: string }
}) {
  const { dictionary } = await language();

  const page = getPage({searchParams});

  const playerName = params.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === siteConfig.console.uuid) {
    notFound();
  }

  const staff = await getStaff({searchParams});

  return (
    <div className="flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18">
      <PlayerHeader player={player} playerName={playerName} dictionary={dictionary} active="kick" />

      <section className="w-full lg:w-[1024px]">
        <KicksTable page={page} player={player.uuid!} staff={staff} />
      </section>
    </div>
  );
}
