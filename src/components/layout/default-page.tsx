import Balance from "react-wrap-balancer";

import { cn } from "@/lib/utils";

interface DefaultPageProps {
  title: string;
  description: string;
  padding?: string;
  className?: string;
  children: React.ReactNode;
}

export const DefaultPage = ({
  title,
  description,
  padding,
  className,
  children,
}: DefaultPageProps) => {
  return (
    <div className={cn("relative flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18", padding)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-muted/50 to-transparent"
      />

      <h1 className="text-gradient text-center text-5xl font-bold leading-tight tracking-tighter sm:text-6xl lg:leading-[1.1]">
        {title}
      </h1>

      <Balance className="max-w-[750px] text-lg text-muted-foreground sm:text-xl text-center">
        {description}
      </Balance>

      <section className={className}>
        {children}
      </section>
    </div>
  );
};
