# Nuxt 3 Todo App

## Features

- [x] CRUD endpoints
- [x] Optimistic UI updates
- [x] Zero setup SQLite DB for local development
- [x] Edge SQLite for production using [Turso](https://turso.tech/)
- [x] [Drizzle ORM](https://orm.drizzle.team/docs/overview) for DB queries and migrations
- [x] Automatically run migrations before each production build
- [x] User authentication using [PropelAuth](https://docs.propelauth.com/overview)
- [x] SSO logins supported
- [x] Protected backend API endpoints and pages
- [x] Targeting edge runtimes deployment

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
