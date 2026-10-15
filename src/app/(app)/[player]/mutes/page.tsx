import { notFound } from "next/navigation";

import { SearchParamsValues } from "@/types";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { getSkinFaceUrl } from "@/utils/skin";
import { language } from "@/lib/language/dictionaries";
import { getPage, getStaff } from "@/utils/searchParams";
import {
  getPlayerByName,
  getPlayerMuteCount
} from "@/lib/punishment/player";

import { MutesTable } from "@/components/punishments/mutes/mutes-table";
import { PlayerHeader } from "@/components/layout/player-header";

export async function generateMetadata({ params }: { params: Promise<{ player: string }> }) {

  const { dictionary } = await language();

  const routeParams = await params;
  const playerName = routeParams.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === siteConfig.console.uuid) {
    return {
      title: dictionary.pages.errors.notFound.title
    }
  }

  const muteCount = await getPlayerMuteCount(player.uuid!);

  return {
    title: p(dictionary.pages.playerHistory.title, {
      player: playerName
    }),
    openGraph: {
      images: getSkinFaceUrl(player.name, player.uuid),
      description: p(siteConfig.openGraph.pages.player.mutes.description, {
        name: player.name,
        total: muteCount
      })
    }
  }
}

export default async function Mutes({
  searchParams,
  params
}: {
  searchParams: Promise<SearchParamsValues>,
  params: Promise<{ player: string }>
}) {
  const { dictionary } = await language();

  const search = await searchParams;
  const routeParams = await params;

  const page = getPage(search);

  const playerName = routeParams.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === siteConfig.console.uuid) {
    notFound();
  }

  const staff = await getStaff(search);

  return (
    <div className="flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18">
      <PlayerHeader player={player} playerName={playerName} dictionary={dictionary} active="mute" />

      <section className="w-full lg:w-[1024px]">
        <MutesTable page={page} player={player.uuid!} staff={staff} />
      </section>
    </div>
  );
}
