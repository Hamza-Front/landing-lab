# TODO.md

> Execution checklist for `feat/restaurant-landing`.
> Source of truth: `BRIEF-restaurant.md` — do not add tasks not in the brief.
> **Rule:** check a box only after the artifact is committed and pushed.

---

## 0. Setup (Day 0 — before writing any code)

- [ ] Create branch: `git checkout -b feat/restaurant-landing`
- [ ] Create `index.html` at repo root (empty shell, valid HTML5)
- [ ] Create `style.css` at repo root (empty file)
- [ ] Add Google Fonts `preconnect` links in `<head>`
- [ ] Add font families: Amiri (400), Cairo (600,700), IBM Plex Sans Arabic (400,600), Tajawal (500)
- [ ] Set `<html lang="ar" dir="rtl">`
- [ ] Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Add `<title>` placeholder
- [ ] Test: Live Server opens, background = default white
- [ ] Commit: `chore: scaffold index.html + style.css`

---

## 1. Design tokens (Day 1 — first commit)

- [ ] `:root` block in `style.css` with all color vars from brief §4
- [ ] Add spacing vars `--space-1` → `--space-12`
- [ ] Add radius vars (`--radius-pill`, `--radius-card`, `--radius-img`, `--radius-input`)
- [ ] Add font-family vars (`--font-logo`, `--font-heading`, `--font-body`)
- [ ] Add type-scale vars (display, h2, h3, body-lg, body, body-sm)
- [ ] Reset block (`*`, `html`, `body`) — margin, padding, box-sizing
- [ ] Base `body`: background `--canvas`, color `--text-main`, font `--font-body`, line-height 1.6
- [ ] Rule: no `box-shadow` anywhere. Enforce mentally.
- [ ] Commit: `style: add design tokens + reset`

---

## 2. Hero section (Day 1)

### HTML
- [ ] `<section class="hero">` with:
  - [ ] `<h1>` — "طعم البيت… وأجواء تُحكى"
  - [ ] `<p class="hero__sub">` — "أطباق شامية أصيلة، وأجواء دافئة، في قلب المدينة"
  - [ ] `<a class="btn btn--primary">` — "زُرنا اليوم — اعرف موقعنا" → Google Maps link (placeholder OK)
  - [ ] `<img class="hero__image">` — Unsplash food/interior photo
- [ ] Image has `alt`, `loading="eager"` (LCP), `width` + `height` set
- [ ] Image is responsive: `max-width: 100%; height: auto;`

### CSS
- [ ] `.hero` layout: mobile stacked, desktop side-by-side (min 1024px)
- [ ] H1 size: `clamp(2.5rem, 6vw, 5rem)`
- [ ] `line-height: 1.15` on H1
- [ ] Sub text color: `--text-sub`, size `18px`
- [ ] Button: pill (9999px), bg `--accent`, color `--canvas`
- [ ] Button hover: bg darkens (add `--accent-dark` var)
- [ ] Button focus-visible: 2px ring using `--text-main`
- [ ] Section padding: `--space-12` vertical on desktop, `--space-8` mobile
- [ ] Commit: `feat: hero section — markup + styles`

---

## 3. About section (Day 1)

- [ ] `<section class="about">` — h2 + 2–3 sentences
- [ ] H2: "قصتنا" or "عن المطعم"
- [ ] Text: short story, no marketing fluff
- [ ] Max content width: `1100px`, centered
- [ ] No image. Text only. (Per brief §3: "short story, 2–3 sentences max")
- [ ] Commit: `feat: about section`

---

## 4. Menu section (Day 2)

- [ ] `<section class="menu">` — h2 + grid of 3–6 dishes
- [ ] Each dish card:
  - [ ] Name (h3)
  - [ ] 1-line description
  - [ ] Optional: price
  - [ ] Card styling: `--surface` bg, `1px solid --border`, radius `12px`, padding `--space-4`
- [ ] Grid: 1 col mobile → 2 col tablet → 3 col desktop
- [ ] No images on cards (v1). Text-only. (Design decision to keep ship fast.)
- [ ] Commit: `feat: menu section`

---

## 5. Experience section (Day 2)

- [ ] `<section class="experience">` — h2 + 2–3 photos
- [ ] Photos: Unsplash interior/atmosphere
- [ ] Each image: `alt`, `loading="lazy"`, `width` + `height`
- [ ] Layout: horizontal scroll on mobile OR stacked (pick one)
- [ ] **Decision:** stacked on mobile (simpler, no JS)
- [ ] Radius: `16px`
- [ ] Commit: `feat: experience section`

---

## 6. Testimonials section (Day 2)

- [ ] `<section class="testimonials">` — h2 + 3 quotes
- [ ] Each quote:
  - [ ] Text (2–3 sentences)
  - [ ] Attribution (first name + last initial)
- [ ] No avatars. No star ratings. (Per brief §3.)
- [ ] Blockquote styling: `--text-sub` color, `--font-heading` if serif feel
- [ ] Card layout on desktop, stacked on mobile
- [ ] Commit: `feat: testimonials`

---

## 7. Location section (Day 3)

- [ ] `<section class="location">` — h2 + address + hours + map CTA
- [ ] Address: placeholder string, real text
- [ ] Hours: `<dl>` or table — clear, scannable
- [ ] Map: link to Google Maps (opens new tab)
- [ ] Add `target="_blank" rel="noopener"` on external link
- [ ] Commit: `feat: location section`

---

## 8. Final CTA + Footer (Day 3)

- [ ] `<section class="cta-final">` — repeat primary CTA
- [ ] Same button style as hero. Same text.
- [ ] `<footer>` — logo (Amiri), copyright, 1 social link (Instagram)
- [ ] Footer border-top: `1px solid --border`
- [ ] Commit: `feat: final CTA + footer`

---

## 9. SEO + meta (Day 3)

- [ ] Real `<title>`: "بيت السعادة | مطعم شامي في [المدينة]"
- [ ] `<meta name="description">` — 155 chars max, Arabic
- [ ] OG tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter card tags (mirror OG)
- [ ] JSON-LD `Restaurant` schema in `<head>`:
  - [ ] name, address, telephone, openingHours, priceRange, image
- [ ] `<link rel="canonical">` → GitHub Pages URL
- [ ] Commit: `seo: meta tags + JSON-LD`

---

## 10. Analytics (Day 3)

- [ ] Add GA4 snippet in `<head>` (async)
- [ ] Add Meta Pixel snippet (async)
- [ ] Add click event on CTA:
  - [ ] Vanilla JS, inline `<script>` at bottom
  - [ ] Fires `gtag('event', 'map_click')`
  - [ ] Fires `fbq('track', 'Lead')`
- [ ] Verify in GA4 Realtime: click CTA → event appears
- [ ] Commit: `analytics: GA4 + Pixel + map_click event`

---

## 11. Verification (before merging)

### Functional
- [ ] Live URL loads on incognito
- [ ] CTA opens Google Maps in new tab
- [ ] `map_click` event fires (GA4 Realtime)
- [ ] All 7 sections render
- [ ] Footer social link works

### Responsive
- [ ] 375px (iPhone SE) — no horizontal scroll
- [ ] 768px (iPad) — layout holds
- [ ] 1024px (laptop) — desktop layout applied
- [ ] 1440px — content max-width capped at 1100px

### Quality
- [ ] Lighthouse (mobile): Performance > 90
- [ ] Lighthouse (mobile): Accessibility > 90
- [ ] Lighthouse (mobile): Best Practices > 90
- [ ] Lighthouse (mobile): SEO > 90
- [ ] No console errors (DevTools → Console)
- [ ] No console warnings about missing images/fonts
- [ ] Arabic text renders — no tofu boxes (□□□)

### Accessibility
- [ ] Keyboard tab order logical
- [ ] Focus ring visible on all buttons/links
- [ ] All images have meaningful `alt`
- [ ] `<html lang="ar">` present
- [ ] Color contrast: rerun all text against `--canvas`

---

## 12. Deploy (Day 3, final)

- [ ] Merge `feat/restaurant-landing` → `main`
- [ ] Push `main`
- [ ] Wait 60s for GitHub Pages rebuild
- [ ] Test live URL: `https://hamza-front.github.io/landing-lab/`
- [ ] Run Lighthouse on live URL (not local)
- [ ] Add live URL to `README.md`
- [ ] Take screenshots: 375px + 1440px → save in repo `/docs` (optional)
- [ ] Commit: `docs: add live URL + screenshots`

---

## 13. Post-ship (backlog — do NOT do now)

- [ ] Replace placeholder images with real photos
- [ ] Replace placeholder address/phone with real
- [ ] Add `sitemap.xml` + `robots.txt`
- [ ] Add self-hosted fonts (remove Google Fonts)
- [ ] Add `theme-color` meta
- [ ] Add `<link rel="preload">` for hero image
- [ ] Extract design tokens to a shared `tokens.css` for future templates
- [ ] English version (`dir="ltr"`)

---

## Blockers log

| Date | Blocker | Status |
|---|---|---|
| | | |

---

