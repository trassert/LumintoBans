import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AvatarSkeletonCell,
  ButtonSkeletonCell,
  DateSkeletonCell,
  ReasonSkeletonCell
} from "@/components/table/punishment-row-cells";

export const WarnsRowSkeleton = () => (
  <TableRow>
    <AvatarSkeletonCell />
    <AvatarSkeletonCell />
    <ReasonSkeletonCell className="w-[292px]" />
    <DateSkeletonCell />
    <TableCell className="w-[150px]">
      <Skeleton className="mx-auto size-3 rounded-sm" />
    </TableCell>
    <ButtonSkeletonCell />
  </TableRow>
);
