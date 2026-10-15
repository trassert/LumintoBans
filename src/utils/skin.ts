import { getSkinId, DEFAULT_SKIN_ID } from "@/utils/bedrock";

// NMSR renders 3D skins and, unlike services that only accept Mojang UUIDs,
// it also resolves usernames and texture hashes. That matters here because
// LiteBans stores offline-mode UUIDs that Mojang cannot resolve, so usernames
// are the most reliable identifier (see utils/bedrock).
const SKIN_RENDERER = "https://nmsr.nickac.dev";

type SkinRender = "face" | "fullbody" | "bust";

const getSkinUrl = (render: SkinRender, id: string) =>
  `${SKIN_RENDERER}/${render}/${encodeURIComponent(id)}`;

// Flat, square face render, used for avatars and OpenGraph previews.
export const getSkinFaceUrl = (
  name: string | null | undefined,
  uuid: string | null | undefined
) => getSkinUrl("face", getSkinId(name, uuid));

// Full 3D body render (tall).
export const getSkinBodyUrl = (
  name: string | null | undefined,
  uuid: string | null | undefined
) => getSkinUrl("fullbody", getSkinId(name, uuid));

// 3D upper-body render (square).
export const getSkinBustUrl = (
  name: string | null | undefined,
  uuid: string | null | undefined
) => getSkinUrl("bust", getSkinId(name, uuid));

// 3D render of the default skin. Used as a fallback so an unresolved player
// never degrades to the flat bundled placeholder (which is what looked "2D").
export const getDefaultSkinUrl = (render: SkinRender) =>
  getSkinUrl(render, DEFAULT_SKIN_ID);
