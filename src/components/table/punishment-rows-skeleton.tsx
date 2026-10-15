import { type ReactNode } from "react";

import { TableBody } from "@/components/ui/table";

export const PunishmentRowsSkeleton = ({ row: Row }: { row: () => ReactNode }) => (
  <TableBody>
    {Array.from({ length: 10 }).map((_, index) => (
      <Row key={index} />
    ))}
  </TableBody>
);
