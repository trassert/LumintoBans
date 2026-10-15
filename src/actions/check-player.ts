"use server"

import { db } from "@/lib/db";
import { siteConfig } from "@config/site";

export const checkPlayer = async (name: string) => {
  const player = await db.litebans_history.findFirst({
    where: {
      name
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      name: true,
      uuid: true
    }
  });

  if (player && player.uuid === siteConfig.console.uuid) return { exists: false }

  return { 
    exists: player ? true : false,
    name: player?.name
  };
}