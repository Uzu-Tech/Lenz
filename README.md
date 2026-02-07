# Lenz

Prediction market and trend insights platform. A modern web app UI skeleton for exploring trends and trading on social media predictions.

## Features

- **Insight Dashboard** (`/dashboard`) – Category cards, metric strip, top rising/falling, signal quality alerts
- **Category Detail** (`/dashboard/category/[id]`) – Radar chart, probability history, driver markets
- **Trading Markets** (`/markets`) – Market list table with filter/search
- **Market Detail** (`/markets/[id]`) – Probability chart, trade panel, order book, metrics

## Tech

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts (available for charts; currently using placeholder divs)
- Mock data – no backend required

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/dashboard`).

## Components

- `CategoryCard` – Category name, trend index, arrow, sparkline
- `MetricBadge` / `MetricStrip` – Metric display
- `SparklineChart` – Placeholder sparkline
- `RadarMetricsChart` – Placeholder radar
- `ProbabilityChart` – Placeholder bar chart
- `MomentumArrow` – ↑ / ↓ / →
- `AlertCard` – Signal quality alerts
- `MarketTable` – Markets list with filters
- `TradePanel` – Buy YES / Buy NO inputs
- `OrderBookMock` – Bids/asks display
