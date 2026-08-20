export const siteConfig = {
  title: "Люминт - Баны",
  logo: "/logo.webp",
  favicon: "/logo.webp",
  languages: {
    available: [
      "ru",
    ],
    default: "ru",
  },
  console: {
    name: "Консоль", // Just for filter badge
    uuid: "[Console]", // Use for filter url and to check if a punishment is made from the Console. In some versions of Litebans, the console uuid is "CONSOLE".
    icon: "/console.webp",
    body: "/console-body.webp",
    bust: "/console-bust.webp",
  },
  defaultPlayerLookup: "Trassert",
  // When enabled, body and bust images will show a steve skin
  bedrock: {
    enabled: false,
    prefix: "",
  },
  openGraph: {
    dateFormat: "yyyy-MM-dd hh:mm:ss",
    pages: {
      main: {
        // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        Веб-интерфейс наказаний.

        Всего наказаний: {total}

          🚫 Баны: {bans}
          🔇 Муты: {mutes}
          ⚠️ Варны: {warns}
          ❌ Кики: {kicks}
        `
      },
      history: {
        // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        Всего наказаний: {total}

          🚫 Баны: {bans}
          🔇 Муты: {mutes}
          ⚠️ Варны: {warns}
          ❌ Кики: {kicks}
        `
      },
      player: {
        // Placeholders: {name}, {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        Наказания игрока {name}.

        Всего наказаний: {total}

          🚫 Баны: {bans}
          🔇 Муты: {mutes}
          ⚠️ Варны: {warns}
          ❌ Кики: {kicks}
        `,
        bans: {
          description: `
          Баны игрока {name}.

          Всего банов: {total}
          `,
        },
        mutes: {
          description: `
          Муты игрока {name}.

          Всего мутов: {total}
          `,
        },
        warns: {
          description: `
          Варны игрока {name}.

          Всего варнов: {total}
          `,
        },
        kicks: {
          description: `
          Кики игрока {name}.

          Всего киков: {total}
          `,
        },
      },
      bans: {
        // Placeholders: {total}
        description: "Всего банов: {total}"
      },
      mutes: {
        // Placeholders: {total}
        description: "Всего мутов: {total}"
      },
      warns: {
        // Placeholders: {total}
        description: "Всего варнов: {total}"
      },
      kicks: {
        // Placeholders: {total}
        description: "Всего киков: {total}"
      },
    },
    punishments: {
      ban: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {duration}, {server}
        description: `
        👤 Игрок: {name}
        👮 Персонал: {staff}

        📜 Причина: {reason}
        🕒 Дата: {time}
        ⌛ Длительность: {duration}
        `
      },
      mute: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {duration}, {server}
        description: `
        👤 Игрок: {name}
        👮 Персонал: {staff}

        📜 Причина: {reason}
        🕒 Дата: {time}
        ⌛ Длительность: {duration}
        `
      },
      warn: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {server}
        description: `
        👤 Игрок: {name}
        👮 Персонал: {staff}

        📜 Причина: {reason}
        🕒 Дата: {time}
        `
      },
      kick: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {server}
        description: `
        👤 Игрок: {name}
        👮 Персонал: {staff}

        📜 Причина: {reason}
        🕒 Дата: {time}
        `
      }
    }
  }
}
export type SiteConfig = typeof siteConfig;
