# John Jomi, portfolio

Source for [johnjomi.dev](https://johnjomi.dev): the portfolio of John Jomi, an AI engineer and full-stack developer in Bengaluru.

The design is called Kinetic. It uses one typeface, Roboto Flex, and changes its weight and width as you move the pointer. The page colour changes with the section in view.

## Pages

| Route | Content |
|---|---|
| `/` | Home: name, selected work, short intro, current role |
| `/about` | Background, focus areas, how I build software |
| `/projects` | All projects, filterable by field |
| `/projects/[slug]` | A case study for each project |
| `/experience` | Internships, research and leadership |
| `/skills` | Tools, grouped by the stage of building software |
| `/certifications` | Courses and credentials, each linking to the original file |
| `/contact` | Email, availability and links |

Links from the previous build (`/work/:slug`) redirect to `/projects/:slug`.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Plain CSS in `src/app/globals.css`, no UI library
- Roboto Flex, self-hosted through `next/font/local`
- Static output: every page is prerendered at build time

## Run it locally

You need Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint
npm run type-check # TypeScript, no emit
```

## Project layout

```
src/
  app/            Routes, layout, global CSS, sitemap, manifest, OG image
  components/     Kinetic type, nav, project list, filters, shared bits
  data/           All site content (see below)
  lib/work.ts     Joins projects with their case studies
  fonts/          Roboto Flex (variable font file)
public/
  certificates/   Certificate PDFs and images
  resume/         Résumé PDF
  profile-photo.jpeg
```

## Editing content

Content lives in `src/data/`, not in the page components.

| File | What it holds |
|---|---|
| `site.ts` | Name, email, links, experience, about copy, skill stages |
| `projects.ts` | Each project: title, description, tags, status, repo link |
| `case-studies.ts` | Long write-ups, keyed by project slug |
| `certificates.ts` | Certificates and the file each one links to |

To add a project, add an entry to `projects.ts`. Add a matching entry to `case-studies.ts` for a full write-up. Also set its fields in `src/lib/work.ts` (`disciplines`, and `figures` for headline numbers). It then appears in the list, the filters, the sitemap and gets its own page.

Anything not yet confirmed is shown as a visible `[TODO]` on the page. Search for `todos` in `src/lib/work.ts` to find them.

## Motion and accessibility

- The moving type, ticker, spinning badge and cursor-following card are switched off when the visitor's system asks for reduced motion.
- The cursor effects only run for a mouse. Touch devices get a full-screen menu and static type.
- The site has a skip link, visible keyboard focus, and the project filter and menu report their state to screen readers.

## Deploying

The site builds to static pages, so any host that serves a Next.js build works. It is set up for Vercel: connect the repository and deploy, with no environment variables needed.

## Branches

- `main`: the previous version of the site
- `kinetic-redesign`: the Kinetic multi-page site (this README)
