import { language } from "@/lib/language/dictionaries";
import { getPunishmentCount } from "@/lib/punishment/punishment";

import { PunishmentTable } from "@/components/table/punishment-table";
import { HistoryBodyData } from "@/components/punishments/history/history-body-data";
import { HistoryRowSkeleton } from "@/components/punishments/history/history-row-skeleton";

interface HistoryTableProps {
  page: number;
  player?: string;
  staff?: string;
}

export const HistoryTable = async ({
  page,
  player,
  staff
}: HistoryTableProps) => {

  const { lang, dictionary } = await language();
  const heads = dictionary.pages.history.table.heads;

  const punishmentCount = await getPunishmentCount(player, staff)
    .then(({ bans, mutes, warns, kicks }) => bans + mutes + warns + kicks);

  return (
    <PunishmentTable
      page={page}
      player={player}
      staff={staff}
      count={punishmentCount}
      skeletonRow={HistoryRowSkeleton}
      columns={[
        { key: "type", head: heads.type, className: "text-center" },
        { key: "player", head: heads.player, className: "text-center !px-1" },
        { key: "by", head: heads.by, className: "text-center !px-1" },
        { key: "reason", head: heads.reason },
        { key: "date", head: heads.date },
        { key: "expires", head: heads.expires },
        { key: "info" }
      ]}
    >
      <HistoryBodyData language={lang} dictionary={dictionary} page={page} player={player} staff={staff} />
    </PunishmentTable>
  );
};
