# vite-najm-course-cat

## Requirement

- NodeJS LTS 20.12.1
- PNPM 8.14.1 / corepack
- NVM (Node Version Manager) - To easily switch between node version

## Tech Stack Package

- Vite v5.4.9
- React v18
- React-dom v18
- Typescript v5.4.9
- Ant Design v5.16.2
- Admiral v2.0.0-beta.x ([Storybook](https://beta--65cb2a66b1a56c748571f7ec.chromatic.com/))

## Quick Start

```bash
# Preparing NVM ENV
nvm install 20.12.1
nvm alias [project-name] 20.12.1
nvm use [project-name]

# Preparing pnpm as package manager
npm install -g corepack
corepack enable

# Installing packages
pnpm install

# Setup .env file
cp .env.example .env.local

# Starting app in development mode
pnpm run dev

# Starting app in production mode
pnpm run build
npm -g install serve (run once)
serve -s dist
```
