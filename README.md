<div align="center">
  <img style="width:100px;" src="https://cdn.yosoyvillaa.dev/uploads/next-litebans.png" alt="MelodyMine Logo">

  <h1 style="font-size: 38px">Luminto-Litebans</h1>

  Веб-интерфейс для [LiteBans](https://www.spigotmc.org/resources/litebans.3715/), созданный на базе:

  [![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) [![Prisma](https://img.shields.io/badge/Prisma-black?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/) [![shadcn/ui](https://cdn.yosoyvillaa.dev/uploads/shadcn.svg)](https://ui.shadcn.com/)
</div>

## 👾 Демо

Посмотреть демо-версию проекта можно [здесь](https://lumintomc.ru/bans).

## 🚀 Развертывание

### Требования

- Node.js версии v20.x или выше
- Работающий LiteBans на MySQL, MariaDB или PostgreSQL

### Установка

1. Клонируйте репозиторий: `git clone https://github.com/trassert/LumintoBans.git`
2. Установите зависимости: `npm install`
3. Скопируйте файл `.env.example` в `.env` и заполните необходимые поля. За помощью обратитесь к разделу [URL базы данных](#url-базы-данных).
4. Если вы используете PostgreSQL, ознакомьтесь с разделом [Настройка PostgreSQL](#настройка-postgresql).
5. Настройте сайт ([конфигурация](#️-конфигурация)).
6. Выполните `npm run setup:db:generate` для генерации клиента Prisma.
7. Выполните `npm run build` для сборки проекта.
8. Выполните `npm run start` для запуска сервера.

### URL базы данных

Необходимо установить переменную окружения `DATABASE_URL` в файле `.env`. Примеры подключения для MySQL и PostgreSQL:

#### Настройка URL для MySQL

![MySQL](https://cdn.yosoyvillaa.dev/uploads/mysql.png)

```env
DATABASE_URL="mysql://user:password@host:port/database"
```

#### Настройка URL для PostgreSQL

![PostgreSQL](https://cdn.yosoyvillaa.dev/uploads/postgresql.png)

```env
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

### Настройка PostgreSQL

Если вы используете PostgreSQL, удалите все **модели** в файле `prisma/schema.prisma` и измените `provider` на `postgresql`, либо замените содержимое файла на:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Обновите URL в файле `.env` строкой подключения к PostgreSQL.

Затем выполните `npm run setup:db:pull` для получения схемы базы данных.

## 🛠️ Конфигурация

Любые параметры сайта (заголовок страницы, иконка и др.) можно настроить в файле `config/site.ts`.

### 🖼️ Изображения

Изображения можно разместить в папке `public/` и использовать на сайте через путь `/`. Для использования внешних ссылок на изображения добавьте следующую конфигурацию в `next.config.js`:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      // Один объект для каждого домена
      {
        protocol: 'https',
        hostname: 'domain.example',
      }
    ]
  }
};
```

### 🌍 Интернационализация

Чтобы настроить доступные языки, отредактируйте объект `languages` в файле `config/site.ts`. Затем вы можете изменить существующие переводы в папке `language/` или создать новые, скопировав существующие файлы и изменив значения.

### 👤 Совместимость с Bedrock

Если ваш сервер поддерживает игроков Bedrock через [Geyser](https://github.com/GeyserMC/Geyser) и/или [Floodgate](https://github.com/GeyserMC/Floodgate), включите режим совместимости в файле `config/site.ts`, установив свойство `bedrock` в `true`. Также настройте префикс имен для игроков Bedrock, чтобы заменить их скины на стандартный скин Стива.

```js
  bedrock: {
    enabled: true,
    prefix: "BP_", // Префикс для игроков Bedrock
  },
```
