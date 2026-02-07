# Lenz

Lenz is a prediction market platform that lets social media managers and influencers see which trends in fashion, music, and culture are set to take off. By combining trend probabilities, social sentiment, and market insights, Lenz helps creators stay ahead and make data-driven decisions on what content to focus on.

## Dashboard Demo

A modern, dark-mode dashboard UI for exploring trends and placing bets. Features:

- **Sidebar navigation**: Dashboard, Trends, Market Details, Profile
- **Trend cards**: Name, category, probability bar, momentum (up/down), volume
- **Probability chart**: Area chart showing history for the selected trend
- **Filters**: Category, platform (TikTok, Instagram, Spotify), time horizon
- **Two modes**: **Insights** (view-only) and **Trader** (place bets on trends)
- **Responsive**: Mobile-friendly with collapsible sidebar

### Run the app

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Tech

- React 18 + Vite
- Tailwind CSS
- Recharts
- Lucide React icons
