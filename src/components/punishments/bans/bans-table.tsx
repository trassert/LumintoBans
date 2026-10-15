import { getBanCount } from "@/lib/punishment/ban";
import { language } from "@/lib/language/dictionaries";

import { PunishmentTable } from "@/components/table/punishment-table";
import { BansBodyData } from "@/components/punishments/bans/bans-body-data";
import { BansRowSkeleton } from "@/components/punishments/bans/bans-row-skeleton";

interface BansTableProps {
  page: number;
  player?: string;
  staff?: string;
}

export const BansTable = async ({
  page,
  player,
  staff
}: BansTableProps) => {

  const { lang, dictionary } = await language();
  const heads = dictionary.pages.bans.table.heads;

  const banCount = await getBanCount(player, staff);

  return (
    <PunishmentTable
      page={page}
      player={player}
      staff={staff}
      count={banCount}
      skeletonRow={BansRowSkeleton}
      columns={[
        { key: "player", head: heads.player, className: "text-center" },
        { key: "by", head: heads.by, className: "text-center" },
        { key: "reason", head: heads.reason },
        { key: "date", head: heads.date },
        { key: "expires", head: heads.expires },
        { key: "info" }
      ]}
    >
      <BansBodyData language={lang} dictionary={dictionary} page={page} player={player} staff={staff} />
    </PunishmentTable>
  );
};
