<<<<<<< HEAD
# MP Engineering College Seat & Fee Explorer

Responsive counselling website for students exploring **B.Tech / engineering colleges in Madhya Pradesh** — IIT, NIT, IIIT, government, private, and AICTE-approved institutes.

## Features

- **Home** — Search, quick type filters (IIT/NIT/IIIT/Government/Private), summary stats
- **College Explorer** — Filters by city, branch, seats, fees, admission mode; college cards with official links
- **Branch Explorer** — CSE, IT, AI/ML, ECE, Mechanical, Civil, and more
- **College Detail** — Seat matrix, fees, cutoffs, placement, scholarships, official sources
- **Compare** — Up to 4 colleges side by side
- **Data / Admin** — Import/export JSON with mandatory `sourceName`, `sourceUrl`, `lastUpdated` on every fee/seat field

## Data policy

- No estimated or fake fees/seats — `null` values show **Fee not available** / **Data not available**
- Seed data lists real MP colleges with structure only; upload verified numbers via Admin JSON import
- Official portals: [JoSAA](https://josaa.nic.in/), [CSAB](https://csab.nic.in/), [MP DTE](https://dte.mponline.gov.in/), [AICTE](https://www.aicte-india.org/), [RGPV](https://www.rgpv.ac.in/)

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Uploading data

Use **Data** page → upload JSON array of colleges. Each numeric field:

```json
{
  "value": 85000,
  "source": {
    "sourceName": "MP DTE fee schedule",
    "sourceUrl": "https://dte.mponline.gov.in/...",
    "lastUpdated": "2025-05-01"
  }
}
```

Use `"value": null` when the official figure is not published.
=======
# career-explorer
>>>>>>> ff0bd8feccc7ede4a91041ff66a4a6be0867bb1c
