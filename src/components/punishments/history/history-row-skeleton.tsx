import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AvatarSkeletonCell,
  ButtonSkeletonCell,
  DateSkeletonCell,
  ReasonSkeletonCell,
  StatusSkeletonCell
} from "@/components/table/punishment-row-cells";

export const HistoryRowSkeleton = () => (
  <TableRow>
    <TableCell className="w-24 px-0.5">
      <Skeleton className="mx-auto w-11 h-[22px]" />
    </TableCell>
    <AvatarSkeletonCell className="w-[148px]" />
    <AvatarSkeletonCell className="w-[148px]" />
    <ReasonSkeletonCell className="w-[180px]" skeletonClassName="w-20 md:w-36 h-4" />
    <DateSkeletonCell className="w-[200px]" />
    <StatusSkeletonCell className="w-[205px]" />
    <ButtonSkeletonCell />
  </TableRow>
);
