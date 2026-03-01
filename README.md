# sportsdb-app

A Vue 3 SPA for listing and showing sports leagues and badges, built with Vite, Tailwind CSS, and Pinia.

## Application Architecture

The project follows a clean, composable-based architecture:

It fetches leagues from SportsDB api, and saves it in local memory to prevent repeated requests. on League card click we fetch the leagues badges and displey them in gallery modal.
This API has limits on free tier so designed the App to be able to run the full api and bring all the sports list availbale.
The free api does not provide pagination so it will be recommended to add pagination support for full api.

### App URL
- [Check the live site here](https://sportsapp.sabado.dev)

- **Vue 3 (Composition API)**: Leveraging `script setup` for concise and readable components.
- **Pinia**: Centralized state management for league and badges data.
- **Tailwind CSS v4**: High-performance, utility-first styling and provide a simple theming definition to be used with darkMode.
- **Composables**: Reusable logic for data fetching (`useFetch`, `useSessionStorage` ) and reactive patterns.
- **i18n**: Multi-language support for global accessibility.
- **Testing**: Unit tests available using Vitetest

##  Request Caching Strategies
For this simple SPA I've used in memory cache inside the Pinia Store
and persisiting its content in browser sessionStorage.

For larger, production-grade projects, I'd recommend a server side caching solution

## AI
Google Gemini AI was used for tests, styling and helping with some functions and css transitions like modals and image gallery
Also used for quick translations and composables refactoring.

## Project Setup

> [!IMPORTANT]
>Projects was built using [Node 24 LTS](https://nodejs.org/en/download)
>And uses [pnpm](https://pnpm.io/es/) as package manager
> It's recommended to use Node >= 22 to run/build the project and pnpm through [Node corepack](https://pnpm.io/installation#using-corepack)
>

### Enable corepack and pnpm
```sh
corepack enable pnpm
```

### install deps
```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
