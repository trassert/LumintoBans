import { siteConfig } from "@config/site"

// NMSR (see utils/skin) accepts a username, UUID or texture hash. Usernames are
// preferred because offline-mode servers store UUIDs that Mojang cannot resolve,
// while a username still maps to the real (premium) account when one exists.
const DEFAULT_SKIN_ID = "MHF_Steve";

const isBedrockPlayer = (playername: string | null | undefined): boolean =>
  siteConfig.bedrock.enabled &&
  !!playername &&
  playername.startsWith(siteConfig.bedrock.prefix);

// Bedrock players resolve to the default skin; everyone else uses their
// username first and their UUID second.
const getSkinId = (playername: string | null | undefined, uuid: string | null | undefined): string =>
  isBedrockPlayer(playername) ? DEFAULT_SKIN_ID : playername || uuid || DEFAULT_SKIN_ID;

const bedrockPrefixRegex = new RegExp(`^${siteConfig.bedrock.prefix}`);

export { getSkinId, isBedrockPlayer, bedrockPrefixRegex, DEFAULT_SKIN_ID }
