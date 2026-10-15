import { siteConfig } from "@config/site"

const STEVE_UUID = "2bc90ee6-7b81-3a66-a268-f89d4472e8ec";

const isBedrockPlayer = (playername: string | null | undefined): boolean =>
  siteConfig.bedrock.enabled &&
  !!playername &&
  playername.startsWith(siteConfig.bedrock.prefix);

// Skin services only resolve Mojang (online-mode) UUIDs, so Bedrock players and
// players without a UUID fall back to Steve's UUID.
const getSkinUUID = (playername: string | null | undefined, uuid: string | null | undefined): string =>
  isBedrockPlayer(playername) ? STEVE_UUID : uuid ?? STEVE_UUID;

// Identifier used by the 3D skin renderer. Dashes are stripped to skip the
// renderer's redirect and the extra cache entry it creates.
const getSkinId = (playername: string | null | undefined, uuid: string | null | undefined): string =>
  getSkinUUID(playername, uuid).replace(/-/g, "");

const bedrockPrefixRegex = new RegExp(`^${siteConfig.bedrock.prefix}`);

export { getSkinUUID, getSkinId, isBedrockPlayer, bedrockPrefixRegex }
