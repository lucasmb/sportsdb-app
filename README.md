# sportsdb-app

A Vue 3 SPA for listing and showing sports leagues and badges, built with Vite, Tailwind CSS, and Pinia.

## Application Architecture

The project follows a clean, composable-based architecture:

It fetches leaues from SportsDB api, and saves it in local memory to prevent repeated requests. on League card click we fetch the leagues badges and displey them in gallery modal.
This API has limits on free tier so designed the App to be able to run the full api and bring all the sports list availbale.
The free api does not provide pagination so it will be recommended to add pagination support for full api.


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
Google Gemini AI was used for tests, styling and helping with some functions and transitions like modals and image gallery
Also used for quick translations and refacotoring composables.

## Project Setup

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
