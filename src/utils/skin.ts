import { getSkinId } from "@/utils/bedrock";

// Mineatar renders 3D images (the successor of the now defunct visage service).
// It resolves skins by Mojang UUID, so names can't be used here.
const SKIN_RENDERER = "https://api.mineatar.io";

// Flat, square face render, used for avatars and OpenGraph previews.
export const getSkinFaceUrl = (
  name: string | null | undefined,
  uuid: string | null | undefined,
  scale = 10
) => `${SKIN_RENDERER}/face/${getSkinId(name, uuid)}?scale=${scale}`;

// Full 3D body render (tall). The renderer has no dedicated bust endpoint.
export const getSkinBodyUrl = (
  name: string | null | undefined,
  uuid: string | null | undefined,
  scale = 8
) => `${SKIN_RENDERER}/body/full/${getSkinId(name, uuid)}?scale=${scale}`;
