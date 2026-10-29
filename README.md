# Gabriel Sobral — Portfolio

Personal portfolio: who I am, what I work on, projects, experience, résumés and contact.
Designed like a technical manual: warm paper, black ink, one signal orange, numbered sections.

- English and Brazilian Portuguese, light/dark/system theme, keyboard and screen-reader friendly.
- Live local time with time zone, for teams in other countries.

## Editing the content

- **Text, skills, projects and experience:** [`src/content/profile.ts`](src/content/profile.ts).
  Text that changes per language is written as `{ en, pt }`. Links set to `null` are hidden.
- **Résumés and cover letters:** drop PDFs into [`documents/`](documents/). They are listed automatically
  on the next build (see the README in that folder for file naming).
- **Project screenshots:** `public/projects/`.

## Development

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Type-check and production build |
| `npm run lint` | ESLint |
| `npm test` | Unit and component tests (Vitest) |

Built with React, TypeScript, Vite and Tailwind CSS.
