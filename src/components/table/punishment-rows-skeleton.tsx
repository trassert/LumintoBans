import { TableBody } from "@/components/ui/table";

export const PunishmentRowsSkeleton = ({ row: Row }: { row: () => JSX.Element }) => (
  <TableBody>
    {Array.from({ length: 10 }).map((_, index) => (
      <Row key={index} />
    ))}
  </TableBody>
);
