import { siteConfig } from "@config/site"

const STEVE_UUID = "2bc90ee6-7b81-3a66-a268-f89d4472e8ec";

const isBedrockPlayer = (playername: string | null | undefined): boolean =>
  siteConfig.bedrock.enabled &&
  !!playername &&
  playername.startsWith(siteConfig.bedrock.prefix);

// Skin services don't recognise Bedrock UUIDs, so those players get Steve's UUID.
const getSkinUUID = (playername: string, uuid: string) => {
  if (!isBedrockPlayer(playername)) return uuid;

  return STEVE_UUID;
}

// Identifier used in skin service URLs. Names are preferred because they also
// work on offline-mode servers, Bedrock players resolve to Steve's UUID and
// dashes are stripped because the service redirects (and caches) dashless ids.
const getSkinId = (playername: string | null | undefined, uuid: string | null | undefined): string => {
  if (isBedrockPlayer(playername) && uuid) return getSkinUUID(playername!, uuid);

  return playername || (uuid ? uuid.replace(/-/g, "") : "");
}

const bedrockPrefixRegex = new RegExp(`^${siteConfig.bedrock.prefix}`);

export { getSkinUUID, getSkinId, isBedrockPlayer, bedrockPrefixRegex }
