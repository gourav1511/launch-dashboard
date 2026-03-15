# Launch Opportunity Dashboard

A clean mission-planning dashboard for evaluating upcoming satellite launch opportunities.

This project helps launch teams do two things quickly:

1. Rank near-term launch missions against mission requirements.
2. Scan the launcher market through an expandable **Launch Vehicle Overview** table.

---

## Why This Dashboard Is Useful

Launch planning data is usually fragmented across multiple sources and formats. This app creates a single, comparable view so a user can:

- define mission constraints (date window, orbit, altitude, inclination, payload mass)
- see transparent fit scores (not a black-box ranking)
- inspect why each mission scored high/low
- filter and sort opportunities quickly
- review launcher options in a structured reference section

---

## What Is Included (MVP)

### Mission Opportunity Dashboard

- Mission requirements input panel
- Transparent scoring engine
  - Date fit (40%)
  - Orbit fit (40%)
  - Data completeness (20%)
- Summary charts
  - launches by month
  - launcher family breakdown
  - score distribution
- Ranked mission table (sortable/filterable)
- Mission detail drawer with score breakdown and source metadata

### Launch Vehicle Overview (new section)

- CSV-backed source of truth (no mock data for this section)
- Compact filter bar
  - search by launcher name/company
  - launch status filter
  - access mode filter (Dedicated/Rideshare/Both/Unknown)
- Expandable inline table rows (no modal/drawer/page)
- Expanded mini-grid fields
  - Basic configuration
  - Capability details
  - Launch location details
  - Notes

---

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **UI:** Tailwind CSS
- **Charts:** Recharts
- **Tables:** TanStack Table
- **Testing:** Vitest + Testing Library

---

## Quick Start (Local)

### Prerequisites

- Node.js 20+
- npm

### Install and Run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

### Quality Checks

```bash
npm run test
npm run lint
npm run build
```

---

## Project Structure

```text
src/
  app/                         # Next.js App Router entrypoints
  components/dashboard/        # UI components for mission + launcher sections
  data/
    manual-overrides/          # mission override data
    launcher-overview/         # launch_vehicle_overview_final_v2.csv
  data-sources/                # mission source adapters (mock/live stub)
  lib/                         # pipelines, ranking/filter logic, formatting helpers
  normalizers/                 # mission normalization + manual override merge
  scoring/                     # transparent scoring model
  test/                        # unit/component tests
  types/                       # shared TypeScript models
```

---

## Key Architecture Decisions

- **Mock-first mission flow:** UI/scoring completed before live API integration.
- **Modular ingestion:** adapters, normalizers, and scoring are separated.
- **Transparent scoring:** subscores and explanation text shown per mission.
- **CSV as source-of-truth for launcher overview:** parsed server-side and normalized into strict allowed values.

---

## Data Flow

### Mission Flow

1. Source adapters fetch raw missions.
2. Normalizer maps to a common schema.
3. Manual overrides are applied by `mission_id`.
4. Scoring engine computes subscores and overall score.
5. Filters/sorting drive table and chart rendering.

### Launch Vehicle Overview Flow

1. CSV is read from `src/data/launcher-overview/`.
2. Parser handles quoted CSV safely.
3. Status/access values are normalized to allowed enums.
4. UI applies search + filters + default sort.
5. Rows expand inline for full details.

---