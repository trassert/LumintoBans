import { getMuteCount } from "@/lib/punishment/mute";
import { language } from "@/lib/language/dictionaries";

import { PunishmentTable } from "@/components/table/punishment-table";
import { MutesBodyData } from "@/components/punishments/mutes/mutes-body-data";
import { MutesRowSkeleton } from "@/components/punishments/mutes/mutes-row-skeleton";

interface MutesTableProps {
  page: number;
  player?: string;
  staff?: string;
}

export const MutesTable = async ({
  page,
  player,
  staff
}: MutesTableProps) => {

  const { lang, dictionary } = await language();
  const heads = dictionary.pages.mutes.table.heads;

  const muteCount = await getMuteCount(player, staff);

  return (
    <PunishmentTable
      page={page}
      player={player}
      staff={staff}
      count={muteCount}
      skeletonRow={MutesRowSkeleton}
      columns={[
        { key: "player", head: heads.player, className: "text-center" },
        { key: "by", head: heads.by, className: "text-center" },
        { key: "reason", head: heads.reason },
        { key: "date", head: heads.date },
        { key: "expires", head: heads.expires },
        { key: "info" }
      ]}
    >
      <MutesBodyData language={lang} dictionary={dictionary} page={page} player={player} staff={staff} />
    </PunishmentTable>
  );
};
