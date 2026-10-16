---
name: Nocturne Algorithmic
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393f'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#282a2f'
  surface-container-highest: '#33353a'
  on-surface: '#e2e2e9'
  on-surface-variant: '#bbcac6'
  inverse-surface: '#e2e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#859490'
  outline-variant: '#3c4947'
  surface-tint: '#4fdbc8'
  primary: '#4fdbc8'
  on-primary: '#003731'
  primary-container: '#14b8a6'
  on-primary-container: '#00423b'
  inverse-primary: '#006b5f'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#adc6ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#75a3ff'
  on-tertiary-container: '#00377d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#71f8e4'
  primary-fixed-dim: '#4fdbc8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#111318'
  on-background: '#e2e2e9'
  surface-variant: '#33353a'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-metric:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  code-badge:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a refined, atmospheric editorial presence for an elite competitive programmer and software engineer. It deliberately rejects the dated "green-terminal" or retro hacker tropes in favor of an intellectual, luminous, and polished digital space. 

The aesthetic is characterized by deep oceanic-charcoal canvases, quiet typographic discipline, celestial starlight highlights (4-point vector sparkles), and disciplined neon-teal accents. It evokes computational precision, quiet mastery, and scholarly rigor—inviting recruiters, collaborators, and engineering peers into a curated exhibition of technical problem solving and architectural craft.

## Colors

The palette balances dark space with precise points of illumination:

- **Canvases & Surfaces:** Canvas is `#0B0D12` (deep obsidian charcoal). Default resting surfaces sit at `#121620`, stepping up to `#181E2C` for elevated panels and popovers. Structural borders utilize `#232B3E` to maintain structural rhythm without visual clutter.
- **Accents:** Electric Teal (`#14B8A6`) acts as the primary interactive anchor, paired with bright cyan highlights (`#2DD4BF`) for active states. Luminous Violet (`#8B5CF6`) provides secondary depth and platform synergy.
- **Typography:** Text uses calibrated contrast tiers: Primary `#F3F4F6` for crisp readability, Secondary `#9CA3AF` for metadata and narrative prose, and Tertiary `#64748B` for understated labels and grid lines.
- **Competitive Programming Badges:** Platform ratings map to standard visual tiers: Codeforces Blue (`#3B82F6`), Codeforces Master Violet (`#A855F7`), and CodeChef Bronze/Gold (`#D97706`).
- **Gradients & Radial Glows:** Soft background radial gradients (`rgba(20, 184, 166, 0.08)` and `rgba(139, 92, 246, 0.06)`) bleed across layout anchors to soften hard structural edges.

## Typography

Typography establishes an intentional contrast between humanistic editorial prose and mathematical computation:

- **Primary Typeface (Plus Jakarta Sans):** Governs all editorial elements, headlines, project abstracts, and navigation. Its geometric construction keeps layouts crisp, contemporary, and balanced.
- **Monospace Companion (JetBrains Mono):** Reserved for technical data: platform ratings, problem metrics, algorithm complexity tags (`O(N log N)`), terminal-free status badges, and social handles (`@darkEye`).
- **Styling Rules:** Section subheads use `label-caps` in uppercase format with wide letter spacing and tertiary coloring (`#64748B`), creating an editorial structure reminiscent of technical research journals.

## Layout & Spacing

The layout is built on a strict 8px increment system aligned to a 12-column responsive grid on desktop and a 4-column flow on mobile.

- **Desktop (>= 1024px):** 1200px max-width container, 1.5rem (24px) gutters, and 2rem outer margin. Generous vertical section offsets (`space-xl` scaled to 5rem–7rem between content blocks) ensure a focused, unhurried reading experience.
- **Tablet (768px - 1023px):** 8-column layout, 1.5rem gutters, and 1.5rem margins. Secondary aside modules collapse beneath main editorial entries.
- **Mobile (< 768px):** 4-column layout, 1rem (16px) gutters, and 1rem canvas margins. Grid cards collapse to full-width modules while maintaining interior component padding.

## Elevation & Depth

Visual hierarchy uses tonal surface layering combined with soft luminous glows:

- **Base Layer:** The `#0B0D12` canvas is flat, hosting optional ambient radial color bleeds behind key showcases.
- **Card Tier 1 (Resting):** `#121620` surface with a 1px continuous hairline outline of `#232B3E`. No drop shadow.
- **Card Tier 2 (Hover & Active Lift):** Cards lift -2px along the Y-axis. The outline shifts to a subtle cyan/teal or violet tint (`rgba(20, 184, 166, 0.3)`), supported by an ambient drop glow: `0 12px 32px -8px rgba(20, 184, 166, 0.12)`.
- **Modals & Overlays:** `#181E2C` surface paired with backdrop-filter blur (`12px`) on a `rgba(11, 13, 18, 0.8)` veil, framed with an active border (`rgba(243, 244, 246, 0.1)`).
- **Accents:** High-value badges and key cards feature a small 4-point vector starlight sparkle positioned near corner anchors or section titles, signaling precision and polish.

## Shapes

The design uses balanced geometry anchored at 16px (`rounded-lg` / `1rem`) for all primary structural containers and cards.

- **Cards & Content Blocks:** Exactly 16px radius.
- **Interactive Controls (Inputs, Standard Buttons):** 8px (`0.5rem`) for a defined, reliable tactile shape.
- **Badges, Tags, & Status Pills:** Fully rounded pills (`9999px`) to maintain clear visual separation between metadata tags and interactive panels.

## Components

### Buttons
- **Primary:** Solid `#14B8A6` background with `#0B0D12` bold text. On hover, background shifts to `#2DD4BF` with a subtle luminous glow (`0 0 16px rgba(45, 212, 191, 0.35)`). 8px border-radius, font: `Plus Jakarta Sans` 14px weight 600.
- **Secondary / Ghost:** Transparent background with `#232B3E` border and `#F3F4F6` text. Hover transitions to `#181E2C` surface and `#14B8A6` border.
- **Icon Actions:** 40x40px square with 8px radius, centered icons, bordered by `#232B3E`.

### Cards (Project & Problem Showcase)
- Built with `#121620` background, 16px radius, and 1px `#232B3E` stroke.
- Interior padding: `1.5rem`.
- Features an optional top-right 4-point star SVG icon (`#14B8A6` or `#F3F4F6`) at 14px scale.
- Smooth transition on `:hover` (lift -2px, teal outline highlight, and ambient glow).

### Metrics & Platform Badges
- **Metric Tile:** Houses large monospace metrics (`code-metric`) in `#F3F4F6` above a micro-label (`label-caps`) in `#64748B`.
- **Platform Rating Chip:** Inline pill badge using `JetBrains Mono` at 12px. Uses low-opacity platform color background (e.g., Codeforces: `rgba(59, 130, 246, 0.12)`) and saturated border/text (`#3B82F6`).

### Tags & Tech Chips
- Enclosed in an 8px radius or full pill, `#181E2C` fill, `#232B3E` border, and `#9CA3AF` typography in `JetBrains Mono` 12px. Hover changes text color to `#F3F4F6`.

### Form Fields & Inputs
- Background `#121620`, border 1px `#232B3E`, text `#F3F4F6`, placeholder `#64748B`.
- Active focus state: border shifts to `#14B8A6` accompanied by an inner glow `0 0 0 1px #14B8A6`.