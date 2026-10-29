# gabriel.status

My portfolio, presented as a live **status page**: projects are monitored services, skills are system
components, and my career is the incident history.

- **Real measurements, no fake data.** Each project is pinged from the visitor's browser to show its actual
  response time. Uptime bars start at the project's launch date and fill in as days pass.
- **Live local time** with time zone and working hours, for teams in other time zones.
- **Easter egg:** press *Simulate outage* in the footer.
- English and Brazilian Portuguese, light/dark/system theme, keyboard and screen-reader friendly.

## Editing the content

Everything personal lives in [`src/content/profile.ts`](src/content/profile.ts): name, title, links,
skills, projects and the career timeline. Links set to `null` are hidden. Text that changes per language
is written as `{ en, pt }`.

To add a project, append it to `projects`, and put a screenshot in `public/projects/`.

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
