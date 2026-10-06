# Cosmos Bank Cyberattack — 2018

A polished, static, web-based cybersecurity case-study presentation built for GitHub Pages.

## Case-study objective

Present the 2018 Cosmos Cooperative Bank cyber incident as a technical, defensive, incident-analysis walkthrough for college-level cybersecurity evaluation.

## Features

- 18-slide presentation format (non-scrolling slide navigation)
- Keyboard controls (←, →, Space, Home, End, F, ?)
- Previous/Next controls, slide counter, progress indicator
- Full-screen presentation mode
- Interactive timeline, attack-flow stages, lifecycle cards, defense layers
- SOC-style dashboards and conceptual SVG diagrams
- Responsive layout for laptop/tablet/mobile
- Reduced-motion accessibility mode
- Data-driven case-study content from `data/case-study.json`

## Technology used

- HTML5
- CSS3
- Vanilla JavaScript
- SVG diagrams

No backend, build process, database, authentication, or API keys.

## Project structure

- `/index.html` — slide layout and presentation shell
- `/css/styles.css` — theme, responsive design, animations
- `/js/app.js` — interactions, navigation, data rendering
- `/data/case-study.json` — factual content, matrices, references

## Run locally

Option 1 (recommended, avoids local fetch restrictions):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Option 2:

Open `index.html` directly in a browser that permits local JSON fetches.

## Deploy on GitHub Pages

1. Push repository changes to GitHub.
2. In repository settings, enable **GitHub Pages**.
3. Set source to the repository branch/folder containing `index.html` (root).
4. Save; GitHub Pages will host the static presentation.

## Sources / references

Reference links are listed in slide 18 and maintained in `data/case-study.json`.

## Disclaimer

This presentation contains defensive analysis and educational reconstruction.

- Diagrams are simplified conceptual representations where noted.
- Factual claims are source-attributed where applicable.
- Where reporting differs, the content explicitly marks values as reported/approximate.
