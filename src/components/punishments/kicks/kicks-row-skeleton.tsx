import { TableRow } from "@/components/ui/table";
import {
  AvatarSkeletonCell,
  ButtonSkeletonCell,
  DateSkeletonCell,
  ReasonSkeletonCell
} from "@/components/table/punishment-row-cells";

export const KicksRowSkeleton = () => (
  <TableRow>
    <AvatarSkeletonCell />
    <AvatarSkeletonCell />
    <ReasonSkeletonCell className="w-[442px]" />
    <DateSkeletonCell />
    <ButtonSkeletonCell />
  </TableRow>
);
