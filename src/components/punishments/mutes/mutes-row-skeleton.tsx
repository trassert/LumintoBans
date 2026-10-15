import { TableRow } from "@/components/ui/table";
import {
  AvatarSkeletonCell,
  ButtonSkeletonCell,
  DateSkeletonCell,
  ReasonSkeletonCell,
  StatusSkeletonCell
} from "@/components/table/punishment-row-cells";

export const MutesRowSkeleton = () => (
  <TableRow>
    <AvatarSkeletonCell />
    <AvatarSkeletonCell />
    <ReasonSkeletonCell className="w-[227px]" />
    <DateSkeletonCell />
    <StatusSkeletonCell />
    <ButtonSkeletonCell />
  </TableRow>
);
