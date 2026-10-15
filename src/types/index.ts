export type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const PUNISMENT_TYPES = {
  BAN: "ban",
  MUTE: "mute",
  WARN: "warn",
  KICK: "kick"
} as const

export type PunishmentType = typeof PUNISMENT_TYPES[keyof typeof PUNISMENT_TYPES]

export type PunishmentListItem = {
  id: bigint | number
  uuid: string | null
  reason: string | null
  banned_by_uuid: string
  banned_by_name: string | null
  time: bigint | number
  until: bigint | number
  active: boolean | string
  type?: PunishmentType
}

// Sanitized punishment passed to the punishment info card. Fields that only
// apply to some punishment types (until/status/warned) are optional.
export type PunishmentInfo = {
  uuid: string | null
  name: string | null | undefined
  banned_by_uuid: string | null
  banned_by_name: string | null
  console: boolean
  reason: string | null
  time: Date | string
  until?: Date | string | number | bigint | null
  status?: boolean
  warned?: boolean
  server?: string | null
}