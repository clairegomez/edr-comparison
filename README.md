# EDR Market Intelligence Report: CrowdStrike vs SentinelOne

A professional multi-page React application presenting an independent technical analysis of the two leading Endpoint Detection & Response (EDR) platforms.

**Author:** Claire Gomez
---

## Overview

This application is structured as an interactive analyst report with seven sections, navigable via a fixed left sidebar. It covers architecture, feature analysis, MITRE ATT&CK performance, pricing, and a decision-support tool.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing / multi-page navigation |
| Recharts | Bar charts, radar charts, and data visualizations |
| Tailwind CSS 3 | Utility-first styling with dark professional theme |
| Vite | Fast development server and build tool |

## Project Structure

```
src/
├── App.jsx                        # Root component with React Router setup
├── main.jsx                       # Entry point
├── index.css                      # Tailwind base styles + custom utilities
└── components/
    ├── Navigation.jsx             # Fixed left sidebar with active route highlighting
    ├── ExecutiveSummary.jsx       # Hero, product cards, analyst bio
    ├── ArchitectureComparison.jsx # Animated architecture diagrams
    ├── FeatureAnalysis.jsx        # Expandable feature comparison table
    ├── MitreAttack.jsx            # MITRE ATT&CK bar/radar charts (Recharts)
    ├── PricingCalculator.jsx      # Live pricing calculator with tier cards
    ├── DecisionTool.jsx           # 5-question weighted recommendation quiz
    └── AnalystRecommendation.jsx  # Final verdict with use-case matrix
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:5173` by default.

## Report Sections

1. **Executive Summary** — Product cards, key verdict, and analyst bio
2. **Architecture Comparison** — Cloud-native (CS) vs on-device AI (S1) with animated callouts
3. **Feature Analysis** — Expandable accordion with 30+ features across 5 categories
4. **MITRE ATT&CK Performance** — Detection, protection, and false positive charts from 2024 evaluations
5. **Pricing Calculator** — Drag slider for endpoint count; real-time annual cost across all tiers
6. **Decision Tool** — 5-question quiz producing a weighted recommendation
7. **Analyst Recommendation** — Claire's final verdict, use-case matrix, and when-to-choose guide

## Design Decisions

- **Dark analyst theme** — Inspired by professional security dashboards (GitHub-dark palette with vendor accent colors: CrowdStrike red `#e6182c`, SentinelOne purple `#7b2fff`)
- **Component-per-section architecture** — Each page is a standalone React component; easy to extend with additional sections
- **Recharts for all visualizations** — Consistent tooltip styling and responsive containers across all charts
- **No external icon libraries** — All icons are inline SVG for zero-dependency overhead

## Data Sources

- MITRE Engenuity ATT&CK Enterprise Evaluations (Round 6, 2024)
- Gartner Magic Quadrant for Endpoint Protection Platforms
- G2 and Gartner Peer Insights user reviews
- CrowdStrike and SentinelOne public documentation and pricing pages
- Industry analyst reports (Forrester Wave EPP, IDC MarketScape)

---

*This report is an independent academic research project and does not constitute official purchasing advice. Pricing estimates are approximations; always obtain vendor quotes.*
