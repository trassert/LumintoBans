import { notFound } from "next/navigation";

import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { getSkinId } from "@/utils/bedrock";
import { language } from "@/lib/language/dictionaries";
import { getPage, getStaff } from "@/utils/searchParams";
import {
  getPlayerByName,
  getPlayerMuteCount
} from "@/lib/punishment/player";

import { MutesTable } from "@/components/punishments/mutes/mutes-table";
import { PlayerHeader } from "@/components/layout/player-header";

export async function generateMetadata({ params }: { params: { player: string } }) {

  const { dictionary } = await language();

  const playerName = params.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === "CONSOLE") {
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
      images: `https://minotar.net/helm/${encodeURIComponent(getSkinId(player.name, player.uuid))}`,
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
  searchParams: { [key: string]: string | string[] | undefined },
  params: { player: string }
}) {
  const { dictionary } = await language();

  const page = getPage({searchParams});

  const playerName = params.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === "CONSOLE") {
    notFound();
  }

  const staff = await getStaff({searchParams});

  return (
    <div className="flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18">
      <PlayerHeader player={player} playerName={playerName} dictionary={dictionary} active="mute" />

      <section className="w-full lg:w-[1024px]">
        <MutesTable page={page} player={player.uuid!} staff={staff} />
      </section>
    </div>
  );
}
