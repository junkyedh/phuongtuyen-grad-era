# Sunny Graduation

Sunny Graduation is a planned public graduation invitation for Trần Nguyễn Phương Tuyền, built around the concept **A New Chapter Begins**. The site will share one general invitation URL with all guests.

## Planned experience

- A warm, youthful, mobile-first design with sunflower and graduation details
- Four sections: Hero, A Little Invitation, Event Details, and Closing
- A responsive Google Maps embed with a navigation fallback
- A single looping background music track with a discreet mute control
- A possible “Sunflower Reveal — Tap to Bloom” opening interaction, pending design approval

These are planned features; they are not represented as implemented.

## Planned technology

The existing repository is configured with Next.js 16 App Router, React 19, and TypeScript. The planned implementation will use the existing stack, reusable CSS design tokens, Next.js Image for the future portrait, and native browser APIs where appropriate. Be Vietnam Pro is the preferred primary font, subject to the final design review.

## Local development

Requirements: Node.js and npm. Install the dependencies recorded by the repository lockfile and start the existing development server:

```sh
npm ci
npm run dev
```

Then open `http://localhost:3000`. The repository currently also defines `npm run lint`, `npm run build`, and `npm run start`. The current application remains the pre-existing project foundation; the Sunny Graduation experience has not been implemented yet.

## Project status

**Phase 1 — Documentation / Planning.** Design approval, implementation, QA, and deployment remain future phases. See [docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md) for confirmed requirements, proposed decisions, pending inputs, phases, and acceptance criteria.
