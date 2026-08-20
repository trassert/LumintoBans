const language = {
  info: {
    country_code: "RU",
    lang_name: "Русский"
  },
  site: {
    description: "Все наказания майнкрафт-сервера Люминт!"
  },
  words: {
    bans: {
      singular: "Бан",
      plural: "Баны"
    },
    mutes: {
      singular: "Мут",
      plural: "Муты"
    },
    kicks: {
      singular: "Кик",
      plural: "Кики"
    },
    warns: {
      singular: "Варн",
      plural: "Варны"
    },
    yes: "Да",
    no: "Нет",
    player: "Игрок",
    staff: "Персонал",
    reason: "Причина",
    date: "Дата",
    expires: "Истекает",
    originServer: "Сервер",
    notified: "Уведомлен",
  },
  pages: {
    home: {
      title: "Главная",
      // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
      subtitle: "Список наказаний на сервере Люминт"
    },
    history: {
      title: "История",
      // Placeholders: {total}
      subtitle: "Всего наказаний: {total}",
      table: {
        heads: {
          type: "Тип",
          player: "Игрок",
          by: "Кем наказан",
          reason: "Причина",
          date: "Дата",
          expires: "Истекает"
        },
        permanent: "Перманентное наказание",
        expire_not_applicable: "Н/Д",
        active: {
          true: "Активно",
          temporal: "Временное",
          false: "Истекло"
        }
      }
    },
    bans: {
      title: "Баны",
      // Placeholders: {total}
      subtitle: "Всего банов: {total}",
      table: {
        heads: {
          player: "Игрок",
          by: "Кем забанен",
          reason: "Причина",
          date: "Дата",
          expires: "Истекает"
        },
        permanent: "Перманентный бан",
        active: {
          true: "Активен",
          temporal: "Временный",
          false: "Истек"
        }
      },
      info: {
        title: "Бан #{id}",
        badges: {
          ipban: "IP Бан",
          active: "Активен",
          expired: "Истек",
          permanent: "Перманентный",
        }
      }
    },
    mutes: {
      title: "Муты",
      // Placeholders: {total}
      subtitle: "Всего мутов: {total}",
      table: {
        heads: {
          player: "Игрок",
          by: "Кем замучен",
          reason: "Причина",
          date: "Дата",
          expires: "Истекает"
        },
        permanent: "Перманентный мут",
        active: {
          true: "Активен",
          temporal: "Временный",
          false: "Истек"
        }
      },
      info: {
        title: "Мут #{id}",
        badges: {
          ipmute: "IP Мут",
          active: "Активен",
          expired: "Истек",
          permanent: "Перманентный",
        }
      }
    },
    warns: {
      title: "Варны",
      // Placeholders: {total}
      subtitle: "Всего варнов: {total}",
      table: {
        heads: {
          player: "Игрок",
          by: "Кем предупреждён",
          reason: "Причина",
          date: "Дата",
          notified: "Уведомлен"
        },
      },
      info: {
        title: "Варн #{id}"
      }
    },
    kicks: {
      title: "Кики",
      // Placeholders: {total}
      subtitle: "Всего киков: {total}",
      table: {
        heads: {
          player: "Игрок",
          by: "Кем кикнут",
          reason: "Причина",
          date: "Дата"
        }
      },
      info: {
        title: "Кик #{id}"
      }
    },
    playerHistory: {
      // Placeholders: {player}
      title: "{player}"
    },
    errors: {
      notFound: {
        title: "404",
        description: "Похоже, вы заблудились. Пожалуйста, вернитесь на главную страницу.",
        button: "Вернуться на главную"
      }
    }
  },
  pagination: {
    previous: "Назад",
    next: "Вперед"
  },
  notifications: {
    playerNotFound: {
      title: "Ошибка",
      description: "Игрок не найден в базе данных.",
    }
  }
}

module.exports = language;
