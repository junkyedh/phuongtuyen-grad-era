# Phương Tuyền Graduation Invitation

This document describes the current application. `src/data/event.ts`, `src/data/content.ts`, and the rendered components are the source of truth for event data, copy, and behavior.

## 1. Project Overview

The project is a single-route public graduation invitation for Trần Nguyễn Phương Tuyền. Its concept is **Sunny Graduation / Sunflower Editorial**, with the theme **A New Chapter Begins**. It is intended for friends, family, and other guests through one shareable URL at `/`.

The experience opens with an interactive potted sunflower and then presents four content sections: Hero, Personal Invitation, Event Details, and Closing. The application is frontend-only: there is no backend, personalized guest data, RSVP, authentication, or language switcher.

## 2. Event Information

Event and media values are maintained in `src/data/event.ts`.

| Field | Current value |
|---|---|
| Graduate | Trần Nguyễn Phương Tuyền |
| University | Trường Đại học Bách khoa TP.HCM |
| Program | Kỹ thuật Hệ thống công nghiệp |
| Class | ISE K22 |
| Date | Friday, 27 November 2026 |
| Time | 15:00–17:00 |
| Time zone | `Asia/Ho_Chi_Minh` |
| Venue | Trường Đại học Bách khoa TP.HCM |
| Address | 268 Lý Thường Kiệt, Phường Diên Hồng (Quận 10 cũ), TP.HCM |
| Contact | Phương Tuyền — 0908 719 199 |
| Phone action | `tel:+84908719199` |

The event data also contains the Google Maps directions URL, iframe URL, portrait path, and audio path.

## 3. Design System

### Visual identity

The visual direction is warm, bright, friendly, youthful, and editorial. Cream and yellow surfaces, brown typography, generous but controlled spacing, and hand-drawn sunflower details carry the theme. The entry screen uses a cream paper-like surface on a butter-yellow background. The invitation section uses an open editorial layout rather than a bordered message card.

### Color tokens

The CSS custom properties are defined in `src/app/globals.css`:

| Token | Value |
|---|---|
| `--cream` | `#FFF9EF` |
| `--butter` | `#F7E19B` |
| `--beige` | `#E9DCC6` |
| `--sunflower` | `#F4B942` |
| `--brown` | `#654321` |
| `--brown-soft` | `#765A3C` |
| `--paper` | `#FFFDF8` |

### Typography and layout

`src/app/layout.tsx` loads Be Vietnam Pro for body copy and Barlow Condensed for display headings through `next/font/google`. The page uses semantic section headings and a responsive editorial layout. CSS switches to the mobile layout at `max-width: 767px`; desktop two-column layouts begin at `min-width: 768px`. The invitation content uses a centered maximum-width layout, while the map and portrait maintain their own responsive dimensions.

### Illustrations

`SunflowerIllustration.tsx` provides reusable inline SVG variants (single flower, sprig, bouquet, and heading accent). The reveal flower is a separate inline SVG in `SunflowerReveal.tsx`, with a potted plant, closed bud, and open petal groups. Decorative SVGs are hidden from assistive technology.

## 4. User Experience

1. The root page renders a centered potted sunflower interaction over the warm yellow background. The button includes the sender line **“PHƯƠNG TUYỀN GỬI BẠN CHÚT NẮNG”** and the visible prompt **“CHẠM ĐỂ HOA NỞ”**.
2. Activating the semantic button starts a music playback request synchronously in the same user gesture and changes the experience from `closed` to `blooming`.
3. CSS grows the plant from the pot, transitions the bud into open petals, and then the experience switches to `open`. The invitation reveal timer is 2,050 ms. The button is disabled during the bloom transition.
4. With `prefers-reduced-motion: reduce`, the experience opens immediately rather than waiting for the bloom animation.
5. After opening, the visitor can read and scroll through the four invitation sections. A small fixed speaker button controls music.

The invitation remains on `/`; opening it does not navigate or reload the page.

## 5. Website Sections

The sections are composed in order in `src/app/page.tsx` and `src/components/invitation/InvitationSections.tsx`. Text is centralized in `src/data/content.ts`, with event facts in `src/data/event.ts`.

### Hero / Graduation Cover

The hero presents `YOU'RE INVITED!`, then **LỄ / TỐT NGHIỆP**, the graduate’s name, `ISE K22 – Kỹ thuật Hệ thống công nghiệp`, and the university name. The name is rendered from the event data and wraps only between `TRẦN NGUYỄN` and `PHƯƠNG TUYỀN`. A portrait and `CLASS OF 2026` caption complete the composition, with a small botanical sprig accent.

The portrait source is `/img/pt-portrait.jpg`, configured by `event.portraitSrc` and rendered through `next/image`.

### Personal-style General Invitation

There is no visible section heading. A visually hidden heading supplies the section’s accessible name. The section pairs a sunflower illustration with this supporting line and invitation copy:

> Hành trình thanh xuân khép lại, một chặng đường mới mở ra...
>
> Vậy là sắp đến ngày tốt nghiệp rồi!
>
> Nếu hôm đó rảnh, ghé chụp với Phương Tuyền vài tấm hình nha.
>
> Mong gặp được mọi người.

The visible copy comes from `siteContent.invitationSupporting`, `invitationOpening`, `invitationDetails`, and `invitationClosing`.

### Event Details / Google Maps

The section heading is `SAVE THE DATE`. It displays the event date, time, university, venue address, and a contact link for Phương Tuyền. The contact link uses the `tel:` URL from `event.contact.tel`.

`VenueMapPreview.tsx` renders a responsive interactive iframe when `event.mapEmbedUrl` is an HTTPS `www.google.com/maps/embed` URL. If the configured value does not pass that check, it shows a simple fallback and the directions link from `event.directionsUrl`. The currently configured map embed is present; the fallback is not displayed for that configuration.

### Closing Message

The final section displays:

> Cảm ơn vì đã trở thành một mảnh ghép trong thanh xuân của Phương Tuyền.
>
> *Our day, your presence, endless memories*

The section includes a decorative sunflower bouquet. The English line is rendered without a heart glyph in the current content data.

## 6. Motion and Animations

- **Reveal:** `InvitationExperience.tsx` owns the `closed → blooming → open` state flow. CSS grows the plant over 1,800 ms and transitions from bud to flower. The main content appears after a 2,050 ms timer.
- **Scroll reveals:** after opening, one `IntersectionObserver` watches elements marked `[data-reveal]` at a 0.12 threshold. CSS applies opacity and small transform transitions. Elements marked `data-reveal-motion="zoom"` use a zoom treatment; the map is marked `fade` and avoids positional or scale movement.
- **Unsupported observer:** if `IntersectionObserver` is unavailable, reveal setup is skipped and content remains visible.
- **Ambient petals:** `FloatingPetals.tsx` renders ten decorative petals. CSS keyframes animate them across the viewport without JavaScript timers or scroll listeners. The effect is hidden for reduced-motion users.
- **Reduced motion:** the experience skips its opening delay when the preference is enabled. CSS also minimizes animation and transition durations, makes pending scroll reveals visible, and disables the ambient petals.

These are CSS and native browser effects; the project does not use an animation library.

## 7. Audio Behavior

`MusicPlayer.tsx` uses a native `<audio>` element with the looping source in `event.audioSrc` (`/audio/grad-audio.mp3`). The sunflower activation handler calls `startFromGesture()` before starting the bloom timer, giving the browser a user-initiated playback request. Audio is not guaranteed to play; browsers may block playback, and the player handles a rejected `play()` promise or audio error by keeping its playing state false.

The fixed speaker button lets the visitor pause or retry playback manually. Playback state follows the audio element’s play, pause, and error events. The track loops while playing. There is no repeated automatic retry after a visitor pauses it.

## 8. Map and Contact

- The embed and directions URL are configured in `src/data/event.ts` as `mapEmbedUrl` and `directionsUrl`.
- `VenueMapPreview.tsx` validates the embed scheme, host, and `/maps/embed` path before rendering the iframe. The iframe has a descriptive title, lazy loading, strict-origin referrer policy, and full-screen support.
- When the embed URL is invalid or absent, the component displays a fallback with a directions link. With the current valid embed configuration, the fallback is not rendered.
- The contact data (`name`, `phone`, and `tel`) is in `event.contact`; the Date & Location section renders a clickable telephone link.

## 9. Architecture

| Path | Responsibility |
|---|---|
| `src/app/page.tsx` | Composes the invitation at the root route. |
| `src/app/layout.tsx` | Sets Vietnamese document language, fonts, and page metadata. |
| `src/app/globals.css` | Design tokens, responsive layout, illustration styling, reveal transitions, and reduced-motion rules. |
| `src/components/invitation/InvitationExperience.tsx` | Owns reveal phase, reduced-motion opening behavior, scroll observer, and music-player control. |
| `src/components/invitation/SunflowerReveal.tsx` | Accessible button and potted sunflower SVG. |
| `src/components/invitation/InvitationSections.tsx` | Renders the four main content sections. |
| `src/components/invitation/SunflowerIllustration.tsx` | Reusable inline SVG botanical variants. |
| `src/components/invitation/FloatingPetals.tsx` | Decorative, aria-hidden ambient petals. |
| `src/components/invitation/MusicPlayer.tsx` | Native looping audio and speaker control. |
| `src/components/invitation/VenueMapPreview.tsx` | Google Maps iframe validation and fallback. |
| `src/data/content.ts` | Vietnamese interface and invitation text. |
| `src/data/event.ts` | Graduate, event, contact, map, portrait, and audio values. |

The application uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, custom CSS, and native browser APIs. No backend or state-management library is present.

## 10. Responsive Design and Accessibility

The stylesheet’s main responsive breakpoint is 768 px: mobile rules apply through 767 px, and desktop grid layouts apply from 768 px. The hero stacks on mobile and uses two columns at desktop widths. The invitation stacks its illustration and text on mobile. The map is full-width within its column and has a reduced fixed responsive height on mobile.

Implemented accessibility details include:

- The reveal is a real button with an accessible name, visible keyboard focus styling, and disabled state while blooming.
- Main content is inert and hidden from assistive technology until the reveal opens; focus moves to the main element after opening.
- Event sections use semantic headings, a `time` element, and a telephone anchor.
- SVG ornaments and ambient petals are hidden from assistive technology.
- Reduced-motion preferences bypass the opening delay and suppress continuous ambient motion.

These are implementation notes, not a claim that every viewport or assistive technology combination has been manually audited.

## 11. Configuration and Maintenance

- **Event, contact, portrait, audio, map:** edit `src/data/event.ts`.
- **Invitation and interface copy:** edit `src/data/content.ts`.
- **Portrait:** replace `public/img/pt-portrait.jpg` and update `event.portraitSrc` if the path changes. The current portrait is configured and present.
- **Audio:** replace `public/audio/grad-audio.mp3` and update `event.audioSrc` if the path changes.
- **Map:** update `event.mapEmbedUrl` with a real Google Maps embed URL and `event.directionsUrl` with its visitor navigation link. Do not use the short navigation URL as an iframe source.
- **Design and responsive behavior:** edit `src/app/globals.css`; illustration geometry and variants are in `SunflowerIllustration.tsx` and `SunflowerReveal.tsx`.

## 12. Development and Verification

The repository scripts are defined in `package.json`:

```sh
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

The development and build scripts explicitly use Webpack. `npm run lint` runs ESLint; TypeScript can be checked separately with `npx tsc --noEmit`. `npm run start` serves a completed production build.

Manual browser verification should cover the opening by keyboard and pointer, reduced-motion behavior, audio start and manual retry/pause, section content, click-to-call, the embedded map and its controls, and mobile/desktop layouts. Automated lint, type, and build commands do not replace visual or interactive browser review. Record browser verification only when it has actually been performed.

## 13. Deployment

The repository defines a standard Next.js production build and start workflow (`npm run build`, then `npm run start`). `next.config.ts` enables Cache Components and Partial Prerendering and retains a CSS loader configuration for Turbopack; the package scripts currently invoke the Webpack builder. There is no provider-specific deployment workflow or project deployment configuration in the repository. No application environment variables are required by the current source.

## 14. Current Scope and Limitations

- One public route at `/`; the invitation is the same for all visitors.
- No backend, database, personalized guest links, RSVP, authentication, or language switching.
- Music playback depends on browser policy and user activation; playback cannot be guaranteed.
- The map fallback is shown when the configured embed URL fails the component’s URL validation. The component does not detect a later iframe network/render failure.
- There is no provider-specific deployment setup in this repository.
