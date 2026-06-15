# Happy Birthday 💕 — A Personal Interactive Birthday Experience

A premium, mobile-first birthday website built with React, Vite, and Framer Motion.
Five magical scenes — a gift entrance, a flower-garden letter, 12 flip cards of
reasons, a wish jar, and a secret garden finale — all wrapped in a pink, white,
and pastel glassmorphism aesthetic.

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal (usually `http://localhost:5173`).

To build a production-ready version:

```bash
npm run build
npm run preview
```

The output is generated in the `dist/` folder, which you can deploy to any
static host (Netlify, Vercel, GitHub Pages, etc).

## Personalizing the Content

Everything you'll want to edit lives in **one file**:

```
src/data/content.js
```

This includes:

- `recipientName` — the name shown throughout the experience
- `entranceLines` — the typewriter lines on the gift page
- `letterLines` — the full letter text (line by line)
- `reasons` — the 12 flip-card titles and personal messages
- `wishes` — the 8 wishes that float out of the jar
- `finalMessage` — the closing message on the garden page
- `hiddenMessage` — the message revealed when the glowing heart is tapped

No other code changes are needed to personalize the site — just edit this
file and save.

## Project Structure

```
src/
├── components/
│   ├── EntrancePage.jsx     # Page 1 — gift box entrance
│   ├── LetterPage.jsx        # Page 2 — flower garden letter
│   ├── ReasonsPage.jsx       # Page 3 — 12 flip cards
│   ├── WishJarPage.jsx       # Page 4 — magical wish jar
│   ├── GardenPage.jsx        # Page 5 — secret garden ending
│   ├── FloatingHearts.jsx    # Ambient floating heart particles
│   ├── Sparkles.jsx          # Ambient sparkle particles
│   ├── FallingPetals.jsx     # Ambient falling petal particles
│   ├── Butterflies.jsx       # Animated butterflies
│   ├── ConfettiBurst.jsx     # Confetti burst effect
│   ├── Typewriter.jsx        # Line-by-line typewriter text
│   └── ProgressDots.jsx      # Page progress indicator
├── data/
│   └── content.js            # ✏️ EDIT ALL TEXT HERE
├── styles/
│   ├── global.css             # Design tokens (colors, fonts, shadows)
│   └── components.css         # All page and component styles
├── App.jsx                    # Page flow and transitions
└── main.jsx                   # Entry point
```

## Tech

- React 19 (functional components + hooks)
- Vite
- Framer Motion (all animation/transitions)
- Plain CSS with custom properties (no CSS framework)

## Notes

- Fully mobile-first; scales up gracefully to tablet and desktop.
- Respects `prefers-reduced-motion` for accessibility.
- No images required — everything is built with SVG, CSS, and gradients.

Made with 🤍 for someone special.
