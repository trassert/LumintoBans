"use client"

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimateNumber } from 'motion-number'

import { cn } from "@/lib/utils";

import { 
  Card, 
  CardContent, 
  CardTitle 
} from "@/components/ui/card";

interface PunishmentTypeCardProps {
  title: string;
  fromGradient: string;
  count: number;
  href: string;
  punishmentIcon: ReactNode;
}

export const PunishmentTypeCard = ({
  title,
  fromGradient,
  count,
  href,
  punishmentIcon,
}: PunishmentTypeCardProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // AnimateNumber animates whenever its value changes, so seed it with 0 and
    // let it count up to the real value once mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(count);
  }, [count]);

  return (
    <Link
      href={href}
    >
      <Card 
        className={cn("overflow-hidden mx-auto w-60 h-36 flex-col flex items-center relative transition ease-in-out hover:scale-110 hover:bg-linear-to-tr to-transparent group", fromGradient)}
      >
        {punishmentIcon}
        <CardContent className="text-center mt-auto z-[1]">
          <AnimateNumber
            format={{ notation: 'standard', useGrouping: false, minimumIntegerDigits: count.toString().length }}
            className="text-[3.5rem] leading-none font-bold"
          >
            {value}
          </AnimateNumber>
          <CardTitle className="text-2xl font-medium">{title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  )
};