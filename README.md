# Lenz

**Quantified cultural trend intelligence through prediction market analytics**

Lenz aggregates prediction market data into actionable trend metrics using mathematical formulations. The platform transforms individual market predictions into four core signals: Trend Index, Momentum, Stability, and Proximity—enabling data-driven decision-making for cultural forecasting.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)

---

## Core Innovation

**Problem:** Prediction markets generate fragmented data across multiple questions. Individual market probabilities don't provide holistic trend intelligence.

**Solution:** Lenz aggregates related prediction markets into category-level metrics using derived mathematical formulations:

### Metric Formulations

**Trend Index** — Weighted aggregate of market probabilities within a category  
Captures overall trend strength by combining multiple prediction signals.

**Momentum** — Rate of change in Trend Index over time  
Identifies accelerating or decelerating trends through temporal analysis.

**Stability** — Inverse of standard deviation across constituent markets  
Measures signal consistency—low stability indicates volatile or conflicting predictions.

**Proximity** — Weighted aggreagate of time till contract pays out within a category  
Estimates how close a trend is to saturation or maximum adoption.

These derived metrics transform raw prediction market data into strategic intelligence for content creators, marketers, and brand strategists.
---

## Features

**Dashboard** — Category cards displaying calculated metrics with sparkline visualizations and urgency rankings

**Category Detail** — Radar charts showing multi-metric analysis with expandable driver markets (constituent predictions)

**Trading Markets** — Filter and trade on individual prediction questions that feed into category metrics

**Market Detail** — Probability history charts with trade execution and real-time metric updates

---

## Architecture

### Frontend
- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS** custom design system
- **Recharts** for metric visualization
- Component library: CategoryCard, MetricBadge, ProbabilityChart, TradePanel

### Backend
- **FastAPI** with async endpoints
- **SQLite** database schema: categories, markets, price_history
- CORS-enabled API for metric calculation and market data

### Data Flow
```
Individual Markets → Aggregation Layer → Derived Metrics → Visualization
     (probabilities)      (formulations)    (Trend Index, etc.)    (Dashboard)
```

---

---

## API Endpoints

**Categories**
- `GET /api/categories` — List all categories with calculated metrics
- `GET /api/categories/:id` — Category detail with constituent markets

**Markets**
- `GET /api/markets` — List all prediction markets
- `GET /api/markets/:id` — Market detail with probability history
- `POST /api/markets/:id/trade` — Execute trade (updates metrics)

---

## Data Model

### Category
```typescript
{
  id: string
  name: string              // "Y2K Revival"
  trend_idx: number         // Calculated via weighted aggregation
  momentum: number          // Rate of change
  stability: number         // Inverse standard deviation
  proximity: number         // Distance from peak
  urgency: number           // Composite time-sensitivity score
}
```

### Market
```typescript
{
  id: string
  question: string          // "Will Y2K fashion dominate Q2?"
  category_id: string       // Links to parent category
  probability: number       // Current market probability (0-1)
  price: number             // Price in pence
  volume: number
  participant_no: number
  price_history: Array      // Time-series data
}
```

---

## Use Cases

**Content Creators** — Identify emerging aesthetics before mainstream adoption using Momentum and Proximity signals

**Brand Strategists** — Allocate marketing budget to high Trend Index, high Stability categories for reliable ROI

**Trend Forecasters** — Track Momentum shifts and Stability degradation to predict trend lifecycle phases

---

## Technical Highlights

- Mathematical aggregation layer transforming prediction markets into strategic metrics
- Real-time metric recalculation on market updates
- Type-safe TypeScript implementation across frontend
- SQLite persistence with price history tracking for temporal analysis
- Responsive visualization library with radar charts and sparklines

---

## Roadmap

- Machine learning models for predictive Momentum forecasting
- Social media API integration for automated market creation
- WebSocket live updates for real-time metric streaming
- Advanced statistical formulations (Bayesian aggregation, time-weighted decay)
- User authentication with portfolio tracking

---

## Repository Structure

```
Lenz/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js routes
│   │   ├── components/       # Metric visualization components
│   │   ├── lib/api.ts        # API client
│   │   └── data/mock.ts      # Demo data
│   └── tailwind.config.ts
├── backend/
│   ├── app.py                # FastAPI + metric calculations
│   ├── routes/               # Category & market endpoints
│   ├── db.py                 # SQLite connection
│   └── schema.sql            # Database schema
└── README.md
```

---

## Team

Developed by **Kobi**, **Zara**, and **Qais**

---

**© 2026 Lenz. Quantified cultural intelligence through prediction market analytics.**
