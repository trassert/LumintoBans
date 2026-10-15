import { ReactNode, Suspense } from "react";

import { Filters } from "@/components/table/filters";
import { TablePagination } from "@/components/table/pagination";
import { PunishmentRowsSkeleton } from "@/components/table/punishment-rows-skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export interface PunishmentTableColumn {
  key: string;
  head?: ReactNode;
  className?: string;
}

interface PunishmentTableProps {
  columns: PunishmentTableColumn[];
  count: number;
  page: number;
  player?: string;
  staff?: string;
  skeletonRow: () => ReactNode;
  children: ReactNode;
}

export const PunishmentTable = ({
  columns,
  count,
  page,
  player,
  staff,
  skeletonRow,
  children
}: PunishmentTableProps) => {
  const totalPages = Math.ceil(count / 10);

  return (
    <div className="space-y-2">
      <Filters player={player} staff={staff} />
      <ScrollArea className="shadow-sm border-y lg:rounded-xl lg:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <Suspense fallback={<PunishmentRowsSkeleton row={skeletonRow} />}>
            {children}
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination actualPage={page} totalPages={totalPages} />
    </div>
  );
};
