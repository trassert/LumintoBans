import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell } from "@/components/ui/table";

export const AvatarSkeletonCell = ({ className }: { className?: string }) => (
  <TableCell className={cn("space-y-1 w-40", className)}>
    <Skeleton className="mx-auto rounded-sm size-8" />
    <Skeleton className="mx-auto w-16 h-4 mt-1" />
  </TableCell>
);

export const ReasonSkeletonCell = ({
  className,
  skeletonClassName = "w-20 md:w-40 h-4"
}: {
  className?: string;
  skeletonClassName?: string;
}) => (
  <TableCell className={className}>
    <Skeleton className={skeletonClassName} />
  </TableCell>
);

export const DateSkeletonCell = ({ className = "w-[215px]" }: { className?: string }) => (
  <TableCell className={className}>
    <Skeleton className="w-20 md:w-[132px] h-4" />
  </TableCell>
);

export const StatusSkeletonCell = ({ className = "w-[215px]" }: { className?: string }) => (
  <TableCell className={className}>
    <div className="flex items-center">
      <Skeleton className="flex rounded-full p-1 mr-2" />
      <Skeleton className="w-20 md:w-36 h-4" />
    </div>
  </TableCell>
);

export const ButtonSkeletonCell = () => (
  <TableCell className="!pl-0 !pr-3">
    <Skeleton className="size-8 rounded-md" />
  </TableCell>
);
