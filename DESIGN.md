# Design Brief

## Direction

Lutix Signal — a precision-instrument deep-tech brand: deep indigo-ink surfaces, an electric cyan signal accent, and warm amber for human warmth.

## Tone

Editorial dark-tech with instrument-panel restraint — confident and premium, never the purple-gradient-on-black AI cliché.

## Differentiation

A faint coordinate grid and glowing signal-line motif turn the whole page into a calibrated instrument; monospaced eyebrow labels read like telemetry.

## Color Palette

| Token      | OKLCH       | Role                                          |
| ---------- | ----------- | --------------------------------------------- |
| background | 0.16 0.022 265 | Deep indigo-ink page surface               |
| foreground | 0.95 0.01 260  | Off-white primary text                     |
| card       | 0.2 0.026 265  | Elevated section / service surfaces        |
| primary    | 0.78 0.14 195  | Electric cyan signal — CTAs, links, active |
| accent     | 0.78 0.15 75   | Warm amber — sparing highlights, icons     |
| muted      | 0.24 0.028 265 | Quiet panels, trust strip, inputs          |

## Typography

- Display: Space Grotesk — hero and section headings, tight tracking
- Body: General Sans — paragraphs, UI labels, navigation
- Mono: JetBrains Mono — uppercase eyebrows, facts, telemetry labels
- Scale: hero `text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-xs font-medium uppercase tracking-[0.22em] font-mono`, body `text-base md:text-lg`

## Elevation & Depth

Layered dark surfaces: background → card → popover with soft elevated shadows and 1px cyan-tinted borders; depth comes from glow and grid texture, not heavy drop shadows.

## Structural Zones

| Zone    | Background            | Border           | Notes                                       |
| ------- | --------------------- | ---------------- | ------------------------------------------- |
| Header  | card/80 + blur backdrop | border-b       | Sticky, active section link in primary      |
| Content | background + grid/glow  | —              | Alternate `bg-card/40` band per section     |
| Footer  | card/60                 | border-t       | Wordmark, quick links, social icons         |

## Spacing & Rhythm

Generous vertical rhythm (`py-20 md:py-28` sections), max-width `container` with 2rem gutters, 8/12/16px micro-spacing, 24px card padding.

## Component Patterns

- Buttons: primary = cyan gradient pill with dark ink text, hover lift; secondary = outlined border with ghost hover
- Cards: 2xl radius, `bg-card/70` with backdrop blur, 1px border, hover elevation + border brighten
- Badges: pill, mono uppercase, primary/10 background with primary text

## Motion

- Entrance: fade-up on scroll, 0.5s ease-out, staggered 80ms
- Hover: 0.3s smooth lift, border and icon color shift
- Decorative: slow floating signal orbs and a pulsing grid glow (6–10s loops)

## Constraints

- Dark theme only; no light mode
- Tokens only — no raw hex/rgb in components
- 3 core colors max: cyan primary, amber accent, indigo neutrals

## Signature Detail

The calibrated-grid hero with a wireframe sphere and cyan signal lines — a spatial/typographic instrument motif that anchors the whole brand.
