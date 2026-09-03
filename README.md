# EduAcharya Student Success Website

Server-rendered TanStack Start application with React, TanStack Router, Vite, and Tailwind CSS v4.

## Structure

- `src/routes/` — TanStack file-based routes and the SEO document shell
- `src/router.tsx` — TanStack Router configuration
- `src/styles.css` — Tailwind v4 entry point
- `styles.css` — preserved responsive UI styling
- `index.html` — preserved page markup rendered by the home route
- `public/assets/` — production-served imagery

## Development

```sh
npm install
npm run dev
```

## Verification and deployment

Run `npm run typecheck` for strict TypeScript validation. Run `npm run build` to create optimized client and SSR server bundles in `dist/`.

## Form behavior

All enquiry forms create a prefilled WhatsApp message through the React interaction layer in `src/routes/index.tsx`.
