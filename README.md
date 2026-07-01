# Sealer Zone — Demo Suite

Three interactive prototypes built to show a brick-and-mortar epoxy/sealer supplier what going digital could look like. They're **pitch demos** — designed to look real, run instantly, and seed a conversation — not the production system.

**Live entry point:** open `index.html` for the landing page that links all three.

## What's inside

| # | Demo | Folder | What it shows |
|---|------|--------|---------------|
| 01 | **Storefront** | `storefront/` | Bilingual (EN/PT) B2B catalog with contractor pricing, product detail pages, a coverage calculator, a **floor-system builder** (auto-sizes a full bill of materials from job size), a **bilingual assistant** that answers coverage/quantity, price, and stock questions, quick reorder, and a multi-step checkout. |
| 02 | **CRM** | `crm/` | Account dashboard, profile pages (order history, notes, spend trend), order detail with a fulfillment timeline, a drag-and-drop pipeline, and an **Insights** view (value segments, revenue concentration, language mix, at-risk accounts). |
| 03 | **Inventory** | `inventory/` | Stock health KPIs, reorder alerts, SKU detail (movement log, velocity), a receive-shipment flow, a PO builder, and a **Forecast** view (demand projection chart + per-item reorder-by dates). |

## Running it

No build step, no install, no dependencies. Two options:

**Just open it** — double-click `index.html` (or any demo's `index.html`). Works straight from disk.

**Or serve locally** (nicer URLs):
```bash
cd sealer-zone-demos
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Create a repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Sealer Zone demo suite"
   git branch -M main
   git remote add origin git@github.com:YOUR_USER/sealer-zone-demos.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` / `root`.
3. Your live URL will be `https://YOUR_USER.github.io/sealer-zone-demos/`.

## Tech notes

- Plain HTML, CSS, and vanilla JavaScript. The only network request is Google Fonts (Space Grotesk + Inter), which falls back to system fonts offline — so the demos still work with no internet at a job site.
- Shared design tokens live in `assets/brand.css` (slate + teal brand, industrial status colors).
- Seed data is isolated in each demo's `data.js` so it's easy to swap in real product names, accounts, or stock numbers before a pitch.

## Structure

```
sealer-zone-demos/
├── index.html            landing page (links all three)
├── assets/
│   └── brand.css         shared design system
├── storefront/
│   ├── index.html
│   ├── data.js           products, account, EN/PT strings
│   └── app.js
├── crm/
│   ├── index.html
│   └── data.js           accounts + order pipeline
└── inventory/
    ├── index.html
    └── data.js           stock, reorder points, velocity
```

---
*Prototypes for discussion. Seed data is illustrative; no real orders or customers.*
