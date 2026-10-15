import { getKickCount } from "@/lib/punishment/kick";
import { language } from "@/lib/language/dictionaries";

import { PunishmentTable } from "@/components/table/punishment-table";
import { KicksBodyData } from "@/components/punishments/kicks/kicks-body-data";
import { KicksRowSkeleton } from "@/components/punishments/kicks/kicks-row-skeleton";

interface KicksTableProps {
  page: number;
  player?: string;
  staff?: string;
}

export const KicksTable = async ({
  page,
  player,
  staff
}: KicksTableProps) => {

  const { lang, dictionary } = await language();
  const heads = dictionary.pages.kicks.table.heads;

  const kickCount = await getKickCount(player, staff);

  return (
    <PunishmentTable
      page={page}
      player={player}
      staff={staff}
      count={kickCount}
      skeletonRow={KicksRowSkeleton}
      columns={[
        { key: "player", head: heads.player, className: "text-center" },
        { key: "by", head: heads.by, className: "text-center" },
        { key: "reason", head: heads.reason },
        { key: "date", head: heads.date },
        { key: "info" }
      ]}
    >
      <KicksBodyData language={lang} page={page} player={player} staff={staff} />
    </PunishmentTable>
  );
};
