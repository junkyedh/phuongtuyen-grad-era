# Phương Tuyền Graduation Invitation

## Project Overview

A public graduation invitation for Trần Nguyễn Phương Tuyền, styled around the **Sunny Graduation / Sunflower Editorial** concept and “A New Chapter Begins” theme. A single public route (`/`) serves every visitor. The experience opens with an interactive potted sunflower, then presents the graduate, invitation, event details, and closing message.

## Tech Stack

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4 with project-specific CSS in `src/app/globals.css`
- `next/font/google` for Be Vietnam Pro and Barlow Condensed
- Native browser APIs for audio, reduced-motion preferences, and scroll reveals

## Getting Started

Prerequisites: Node.js and npm.

```sh
npm ci
npm run dev
```

The development server uses the repository’s configured Webpack mode. Open `http://localhost:3000`.

Available project commands:

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

`npm run start` serves the production build and should be run after `npm run build`.

## Project Structure

```text
src/
  app/                         App Router page, metadata, and global styles
  components/invitation/       Reveal, invitation sections, music, map, and decorations
  data/                        Event details and Vietnamese UI copy
public/
  audio/grad-audio.mp3         Looping background track
  img/pt-portrait.jpg          Graduate portrait
docs/PROJECT_SPEC.md           Detailed product and implementation reference
```

## Main Features

- Keyboard-accessible sunflower reveal: a potted plant grows from a closed bud into a flower before opening the invitation.
- Four responsive content sections: Hero, Personal Invitation, Event Details, and Closing.
- Reduced-motion support, scroll-based content reveals, and subtle ambient falling petals.
- Looping background music with a speaker control for pausing and retrying playback.
- Graduate portrait rendered with `next/image`.
- Responsive, interactive Google Maps iframe with a directions fallback when the configured embed URL is invalid.
- Click-to-call contact link for Phương Tuyền.

## Content and Asset Management

- Update graduate, venue, date/time, contact, portrait, audio, and map URLs in `src/data/event.ts`.
- Update invitation and interface copy in `src/data/content.ts`.
- Replace the portrait at `public/img/pt-portrait.jpg` and keep `event.portraitSrc` in sync.
- Replace the looping track at `public/audio/grad-audio.mp3` and keep `event.audioSrc` in sync.
- Adjust color tokens, layout, typography, and animations in `src/app/globals.css`.
- The reusable sunflower illustrations are in `src/components/invitation/SunflowerIllustration.tsx`.

## Deployment

The repository has no provider-specific deployment workflow or project deployment settings. For a standard Next.js Node deployment, build with `npm run build` and run the result with `npm run start`. The build and development scripts explicitly use Webpack; `next.config.ts` also contains the existing cache-components, partial-prefetching, and CSS Turbopack-loader settings. No application environment variables are required by the current source.

## Project Scope

This is a single-route public invitation. It has no backend, personalized guest links, RSVP, authentication, or language switcher. See [docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md) for the detailed current behavior and maintenance notes.
