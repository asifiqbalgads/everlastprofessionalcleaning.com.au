# Everlast Professional Cleaning Services — Custom Homepage Concept Demo

A custom-designed, mobile-first, GitHub Pages-ready homepage redesign concept for **Everlast Professional Cleaning Services** (`https://www.everlastprofessionalcleaning.com.au/`), based in Melbourne, Australia.

## Business & Brand Extraction Summary

- **Business Name:** Everlast Professional Cleaning Services
- **Location:** Melbourne & Surrounding Suburbs, VIC, Australia
- **Contact:** `0423 679 099` &middot; `everlastprofessionalcleaning@gmail.com`
- **Social Channels:** [Instagram (@everlastprofessionalcleaning)](https://www.instagram.com/everlastprofessionalcleaning/) &middot; [Facebook](https://www.facebook.com/everlastmaintenance/)
- **Extracted Brand Colors (from live Squarespace stylesheet):**
  - Primary Brand Teal: `#00A79D` (`hsl(176.41, 100%, 32.75%)`)
  - Deep Accessible Action Teal: `#006E67`
  - Secondary Cerulean Accent: `#1286A8` (`hsl(192.8, 80.65%, 36.47%)`)
  - Charcoal Ink: `#181717` (`hsl(0, 2.13%, 9.22%)`)
  - Architectural Obsidian-Teal Surface: `#0E191A`
- **Core Services Covered:**
  1. Residential Cleaning (Standard, Deep, Regular Weekly/Fortnightly/Monthly)
  2. Commercial Cleaning (Offices, Warehouses, Healthcare, Retail, Gyms, Childcare)
  3. End-of-Lease / Bond & Vacate Cleaning
  4. Window Cleaning (Residential, Commercial & End-of-Lease)
  5. Carpet, Upholstery & Mattress Steam Cleaning
  6. Builders Clean & Specialised Cleaning (Post-Renovation & Hoarder / Extreme Cleaning)

## Project Structure

```text
.
├── index.html          # Semantic HTML5 homepage (includes noindex,nofollow meta)
├── css/
│   └── style.css       # Mobile-first CSS3 with CSS variables (360px to 1440px+)
├── js/
│   └── script.js       # Vanilla JS (mobile drawer, filters, checklist tabs, FAQ, quote builder)
├── assets/
│   ├── icons/          # Custom SVG icon set
│   ├── images/         # Local optimized JPEG imagery
│   └── logo/           # Vector SVG brand mark & lockups (light & dark variants)
├── .nojekyll           # Disables Jekyll processing on GitHub Pages
└── README.md
```

## Notes on Assets & Static Functionality

- **Images:** Primary photography includes authentic imagery collected from Everlast's existing website CDN (`everlastprofessionalcleaning.com.au`) alongside clean unwatermarked Pexels stock photography, all stored locally under `assets/images/` using relative paths.
- **Logo Assets:** Because direct binary retrieval of the raster `BUSINESS+LOGO.jpg` file from Squarespace CDN was restricted in the sandbox build environment, clean vector SVG brand lockups (`assets/logo/everlast-logo.svg`, `assets/logo/everlast-logo-light.svg`, and `assets/logo/everlast-mark.svg`) were created using the extracted brand typography cues and color tokens so all assets load reliably offline and on GitHub Pages with zero broken links.
- **Static Quote Builder:** As a plain static site with no server backend, the quote form does not simulate fake server submission. Instead, it validates fields and generates a pre-filled `mailto:` email draft or clipboard summary for direct delivery to `everlastprofessionalcleaning@gmail.com`.
- **SEO Protection:** `<meta name="robots" content="noindex, nofollow">` is included so this concept demo does not compete with the live production website in search rankings.

## Local Preview

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Then open `http://localhost:8080/`.
