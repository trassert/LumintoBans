import { SearchParams } from "@/types";
import { siteConfig } from "@config/site";
import { db } from "@/lib/db";

const uuidPattern = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const playerNamePattern = /^[A-Za-z\d_]{1,16}$/;

const isUuid = (value?: string) => !!value && uuidPattern.test(value);

const getPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  let page = params.page ? parseInt(params.page as string) : 1;

  if (isNaN(page) || !Number.isFinite(page) || page < 1) {
    page = 1;
  }

  return Math.floor(page);
}

const getPlayer = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const player = typeof params.player === "string" ? params.player : undefined;
  if (!player) {
    return undefined;
  }

  if (isUuid(player)) return player;
  if (!playerNamePattern.test(player)) return undefined;

  const playerRecord = await db.litebans_history.findFirst({
    where: { name: player },
    orderBy: { date: "desc" },
    select: { uuid: true }
  });

  return playerRecord?.uuid ?? undefined;
}

const getStaff = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const staff = typeof params.staff === "string" ? params.staff : undefined;
  if (!staff || (!isUuid(staff) && staff !== siteConfig.console.uuid && !playerNamePattern.test(staff))) {
    return undefined;
  }

  if (isUuid(staff) || staff === siteConfig.console.uuid) return staff;

  const staffRecord = await db.litebans_history.findFirst({
    where: { name: staff },
    orderBy: { date: "desc" },
    select: { uuid: true }
  });

  return staffRecord?.uuid ?? staff;
}

export { getPage, getPlayer, getStaff, isUuid };