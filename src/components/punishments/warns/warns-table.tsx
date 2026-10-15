import { getWarnCount } from "@/lib/punishment/warn";
import { language } from "@/lib/language/dictionaries";

import { PunishmentTable } from "@/components/table/punishment-table";
import { WarnsBodyData } from "@/components/punishments/warns/warns-body-data";
import { WarnsRowSkeleton } from "@/components/punishments/warns/warns-row-skeleton";

interface WarnsTableProps {
  page: number;
  player?: string;
  staff?: string;
}

export const WarnsTable = async ({
  page,
  player,
  staff
}: WarnsTableProps) => {

  const { lang, dictionary } = await language();
  const heads = dictionary.pages.warns.table.heads;

  const warnCount = await getWarnCount(player, staff);

  return (
    <PunishmentTable
      page={page}
      player={player}
      staff={staff}
      count={warnCount}
      skeletonRow={WarnsRowSkeleton}
      columns={[
        { key: "player", head: heads.player, className: "text-center" },
        { key: "by", head: heads.by, className: "text-center" },
        { key: "reason", head: heads.reason },
        { key: "date", head: heads.date },
        { key: "notified", head: heads.notified, className: "text-center" },
        { key: "info" }
      ]}
    >
      <WarnsBodyData language={lang} page={page} player={player} staff={staff} />
    </PunishmentTable>
  );
};
