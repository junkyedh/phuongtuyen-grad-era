# Sunny Graduation — Project Specification

**Project status: Phase 1 — Documentation / Planning**

This document is the active specification for the Sunny Graduation project. It distinguishes confirmed requirements from a proposed opening interaction and from assets/configuration that have not yet been supplied. No implementation is claimed by this document.

## 1. Project overview

- **Project name:** Sunny Graduation
- **Concept:** A New Chapter Begins
- **Graduate:** Trần Nguyễn Phương Tuyền
**Purpose:** A public, general graduation invitation. One shareable URL serves all guests.

The website is a separate project with a visual concept and scope distinct from its existing technical foundation. It does not need guest-specific routing, guest management, RSVP, or a backend.

## 2. Confirmed event details

- **University:** Trường Đại học Bách khoa – Đại học Quốc gia TP.HCM (HCMUT)
- **Program:** Kỹ thuật Hệ thống công nghiệp
- **Class:** ISE K22
- **Date:** Friday, November 27, 2026
- **Time:** 15:00–17:00, Asia/Ho_Chi_Minh
- **Venue:** 268 Lý Thường Kiệt, Phường Diên Hồng (Quận 10 cũ), TP.HCM
- **Google Maps navigation link:** [Open the venue in Google Maps](https://maps.app.goo.gl/oxtH9sgLVwcthiY2A?g_st=iz)

The short link above is for visitor navigation. It is not an embeddable map URL.

## 3. Design concept and visual system

The visual direction is sunny, youthful, cute, clean, and warm. The layout should be mobile-first, responsive, bright without becoming visually overwhelming, and use generous whitespace, short content, minimal typography, and a limited number of hand-drawn sunflower and graduation decorations.

| Token | Color |
|---|---|
| Ivory | `#FFF9EC` |
| Sunshine Yellow | `#FFCB54` |
| Honey Yellow | `#EAAA25` |
| Beige | `#EBDCC3` |
| Warm Brown | `#744B25` |

Be Vietnam Pro is the preferred primary font. Reuse existing assets or components only when they suit this concept. The real graduation portrait is pending and must not be represented as an existing asset.

## 4. Page structure and approved copy

The planned page has four main sections. Keep each section focused and avoid repeating details already presented elsewhere.

### Section 1 — Hero

Approved copy:

- `YOU'RE INVITED!`
- `LỄ TỐT NGHIỆP`
- `Trần Nguyễn Phương Tuyền`

Use the future graduation portrait as the primary visual when supplied. Keep the opening compact and easy to read. Do not place long paragraphs, the full schedule, or venue details here.

### Section 2 — A Little Invitation

Proposed approved Vietnamese copy:

> Vậy là sắp đến ngày tốt nghiệp rồi! Nếu hôm đó rảnh, ghé chụp cùng Tuyền vài tấm hình nha. Có mọi người ở đó chắc chắn sẽ vui hơn nhiều!

The tone should feel natural and personal, not formal, excessively poetic, or promotional. It addresses a general audience and needs no guest-specific pronouns. Do not add long paragraphs or repeat graduation details.

### Section 3 — Event Details

Clearly display:

- Friday, November 27, 2026
- 15:00–17:00
- Trường Đại học Bách khoa – ĐHQG TP.HCM
- 268 Lý Thường Kiệt, Phường Diên Hồng, TP.HCM
- Kỹ thuật Hệ thống công nghiệp · ISE K22

Include a responsive, real Google Maps iframe preview and a working navigation action. The iframe `src` must use a valid URL obtained from Google Maps **Share → Embed a map**. Do not fabricate an embed URL or use the supplied `maps.app.goo.gl` navigation short link as its source. If the embed URL is unavailable, treat it as required configuration input and retain a visible navigation fallback in case the iframe fails. Avoid duplicate navigation buttons when the embedded map already provides the needed interaction.

### Section 4 — Closing

Approved copy:

> Our day, your presence, endless memories ♡

> Cùng nhau lưu giữ một ngày thật đáng nhớ.

This is the final section. Keep it minimal, with a subtle sunflower or graduation illustration. Do not repeat the full schedule, graduate name, university, or venue. Do not include an RSVP or contact form.

## 5. Proposed opening interaction — Sunflower Reveal

**Status: Recommended, pending final design approval.** This is a concept for design review, not a finalized UI decision.

The proposed “Sunflower Reveal — Tap to Bloom” opens with a sunflower illustration and a “Tap to bloom” button. Activating it plays a short bloom animation and reveals the invitation. The interaction may initiate music playback when browser policy permits.

Future implementation requirements: keep the interaction lightweight; prefer CSS animation and native React over heavy animation libraries; support keyboard activation; respect `prefers-reduced-motion`; never block access to the invitation if animation fails; and do not require visitor details or login.

## 6. Music and map requirements

### Music

Background music is a planned feature. Use one looping track, preferably enabled by default. Attempt playback where browser policies permit; use the reveal interaction as a user gesture to initiate playback when needed. A small, unobtrusive speaker icon toggles mute without visible “Sound on” or “Sound off” text. Do not report playback as active when autoplay is blocked. Audible autoplay is subject to browser restrictions and cannot be guaranteed before user interaction. Keep audio state management simple.

The actual audio file is pending confirmation.

### Google Maps

Use the confirmed venue navigation link for directions. Obtain a real iframe embed URL via Google Maps Share → Embed a map before implementation. Keep the preview responsive on phones and desktop and provide a visible navigation fallback if the iframe cannot load. Do not invent embed URLs.

## 7. Language and content management

The site has one content version, primarily in Vietnamese. Approved English design phrases may appear, including “You're Invited!”, “A New Chapter Begins”, and “Our day, your presence, endless memories”. Content should remain centrally manageable in the future, preferably through small `content.ts` and `event.ts` modules.

Do not implement a language switcher, translation context, multiple language dictionaries, localized guest addressing, or personalized invitation messages.

## 8. Technical architecture

Subject to the existing repository configuration, the preferred stack is:

- Next.js App Router
- React
- TypeScript
- CSS with reusable design tokens
- Next.js Image for the future portrait
- Native browser APIs where appropriate

Proposed future structure (not to be created in this documentation phase):

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    SunflowerReveal.tsx
    HeroSection.tsx
    InvitationNote.tsx
    EventDetails.tsx
    ClosingSection.tsx
    MusicPlayer.tsx
  data/
    event.ts
    content.ts

public/
  images/
  audio/
```

The repository currently has a Next.js 16 App Router, React 19, and TypeScript foundation. Later migration or simplification must be reviewed against the existing source and preserve unrelated user work. Do not remove existing source code as part of Phase 1. Do not carry forward guest slugs or private routes, guest-specific content, RSVP/Formspree behavior, personalization or guest environment variables, translation providers, the envelope interaction, or unnecessary middleware/proxy logic.

## 9. Functional and non-functional requirements

### Functional

- One public invitation URL serves all visitors.
- Present the four planned sections and approved content.
- Show event date, time, venue, program, and class clearly.
- Provide a responsive Google Maps embed and working venue navigation fallback.
- Provide one looping music track with a discreet mute/unmute control; reflect actual playback state.
- If approved, the sunflower reveal is keyboard operable, does not gate invitation access, and can start audio when permitted.

### Non-functional

- Mobile-first, responsive layout with readable hierarchy and generous whitespace.
- Bright, warm color use without excessive decoration or repeated information.
- Lightweight interactions, native controls/APIs where appropriate, and support for reduced motion.
- Maintainable, centrally managed event and content data.
- No private guest records, credentials, or unrelated personal data in public documentation or source configuration.

## 10. Out of scope

- Guest-specific routes, slugs, personalization, or private guest management
- RSVP, attendance collection, Formspree, or any contact form
- Backend or database requirement
- VI/EN switcher, translation provider, language dictionaries, or guest-specific pronouns
- Login, authentication, or guest data collection
- Envelope opening interaction
- Heavy animation or audio state-management libraries
- Unnecessary middleware or proxy logic
- Implementation, deployment, or removal of existing source code in Phase 1

## 11. Pending assets and open decisions

### Missing inputs

- Real graduation portrait (pending; no file should be assumed available)
- Confirmed audio file (pending)
- Valid Google Maps Share → Embed a map iframe URL (required before map implementation)

### Decisions for later approval

- Final approval or rejection of Sunflower Reveal and its visual behavior
- Final typography and responsive layout details
- Final content review and any visual refinements
- Whether the proposed “music enabled by default” preference can be met within browser autoplay behavior; audible playback before user interaction is not guaranteed

## 12. Implementation phases

1. **Phase 1 — Documentation (current):** Update this specification and README only.
2. **Phase 2 — Design approval:** Finalize opening interaction, typography, content, and responsive layout.
3. **Phase 3 — Core implementation:** Implement the four sections, data structures, responsive styles, and map.
4. **Phase 4 — Interaction and assets:** Add the portrait, Sunflower Reveal if approved, music, and visual refinements.
5. **Phase 5 — QA and deployment:** Verify desktop/mobile layouts, navigation, map, audio behavior, and production build before deployment.

Phases 2–5 are not part of the current task.

## 13. Acceptance criteria

### Phase 1 documentation acceptance

- `README.md` and this specification describe Sunny Graduation and accurately identify the current planning status.
- Confirmed event details, approved content, design requirements, proposed interaction, music/map requirements, architecture, scope exclusions, open inputs, phases, and acceptance criteria are documented.
- Proposed features and missing assets/configuration are clearly distinguished from confirmed requirements.
- No private guest records, prior guest names/links, credentials, environment values, personal contact details, or unrelated personal data are added.
- No implementation files are changed in this phase.

### Future website acceptance

- One public URL serves a concise, primarily Vietnamese invitation with the four planned sections.
- Event details match the confirmed date, time zone, venue, program, and class.
- Responsive map uses a genuine Google-provided embed URL, with visible working navigation fallback.
- A single looping audio track has an unobtrusive mute control and accurately reflects playback limitations.
- If approved, the reveal supports keyboard use and reduced-motion preferences and never blocks invitation access.
- No RSVP, guest personalization, login, or private guest management is present.
- Desktop/mobile layouts, navigation, map, audio behavior, and production build are verified before deployment.
