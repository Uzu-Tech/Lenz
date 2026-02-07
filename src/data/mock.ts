// Mock data for prediction market UI skeleton

export type MetricStrength = {
  momentum: number // 0-100
  stability: number
  agreement: number
  urgency: number
}

export type Trend = {
  id: string
  name: string
  direction: 'up' | 'down' | 'flat'
  sparklineData: number[]
  metrics: MetricStrength
}

export type Alert = {
  id: string
  trendName: string
  reason: string
  icon: string
  severity: 'low' | 'medium' | 'high'
}

export type Market = {
  id: string
  question: string
  category: string
  trendId?: string // Links to trend for driver markets
  probability: number
  momentum: 'up' | 'down' | 'flat'
  volume: string
  timeRemaining: string
  probabilityHistory: Array<{ day: string; value: number }>
}

// Trend categories (e.g. Y2K, Indie Sleaze) - not broad categories like Fashion
export const TRENDS: Trend[] = [
  {
    id: '1',
    name: 'Y2K Revival',
    direction: 'up',
    sparklineData: [58, 62, 65, 68, 70, 72, 75],
    metrics: { momentum: 82, stability: 70, agreement: 85, urgency: 65 },
  },
  {
    id: '2',
    name: 'Indie Sleaze',
    direction: 'down',
    sparklineData: [52, 50, 48, 47, 46, 45, 42],
    metrics: { momentum: 25, stability: 60, agreement: 45, urgency: 40 },
  },
  {
    id: '3',
    name: 'Stanley Cup Craze',
    direction: 'up',
    sparklineData: [72, 76, 80, 82, 85, 87, 90],
    metrics: { momentum: 92, stability: 55, agreement: 78, urgency: 88 },
  },
  {
    id: '4',
    name: 'Coquette Aesthetic',
    direction: 'flat',
    sparklineData: [60, 61, 61, 62, 61, 61, 62],
    metrics: { momentum: 48, stability: 85, agreement: 72, urgency: 50 },
  },
  {
    id: '5',
    name: 'Clean Girl 2.0',
    direction: 'down',
    sparklineData: [72, 68, 64, 60, 58, 55, 52],
    metrics: { momentum: 22, stability: 72, agreement: 65, urgency: 35 },
  },
  {
    id: '6',
    name: 'Nostalgia Core',
    direction: 'up',
    sparklineData: [62, 65, 68, 70, 72, 74, 76],
    metrics: { momentum: 75, stability: 68, agreement: 82, urgency: 58 },
  },
]

export const TOP_RISING = [
  { id: '1', name: 'Stanley Cup Craze', momentum: 'up' as const },
  { id: '2', name: 'Y2K Revival', momentum: 'up' as const },
  { id: '3', name: 'Nostalgia Core', momentum: 'up' as const },
]

export const TOP_FALLING = [
  { id: '1', name: 'Clean Girl 2.0', momentum: 'down' as const },
  { id: '2', name: 'Indie Sleaze', momentum: 'down' as const },
]

export const ALERTS: Alert[] = [
  { id: '1', trendName: 'Indie Sleaze', reason: 'Low signal quality – conflicting sentiment', icon: '⚠️', severity: 'medium' },
  { id: '2', trendName: 'Stanley Cup Craze', reason: 'High consensus – strong agreement across sources', icon: '✅', severity: 'low' },
  { id: '3', trendName: 'Coquette Aesthetic', reason: 'Volatility spike – act with caution', icon: '⚡', severity: 'high' },
  { id: '4', trendName: 'Y2K Revival', reason: 'Stable momentum – reliable trend data', icon: '📊', severity: 'low' },
]

export const MARKETS: Market[] = [
  {
    id: '1',
    question: 'Will Y2K fashion dominate Q2?',
    category: 'Fashion',
    trendId: '1',
    probability: 0.72,
    momentum: 'up',
    volume: '2.4M',
    timeRemaining: '14d',
    probabilityHistory: [
      { day: '1w ago', value: 52 },
      { day: '6d ago', value: 55 },
      { day: '5d ago', value: 58 },
      { day: '4d ago', value: 62 },
      { day: '3d ago', value: 65 },
      { day: '2d ago', value: 68 },
      { day: '1d ago', value: 70 },
      { day: 'Today', value: 72 },
    ],
  },
  {
    id: '2',
    question: 'Indie sleaze revival in top 10?',
    category: 'Music',
    trendId: '2',
    probability: 0.45,
    momentum: 'down',
    volume: '1.2M',
    timeRemaining: '21d',
    probabilityHistory: [
      { day: '1w ago', value: 58 },
      { day: '6d ago', value: 55 },
      { day: '5d ago', value: 52 },
      { day: '4d ago', value: 50 },
      { day: '3d ago', value: 48 },
      { day: '2d ago', value: 47 },
      { day: '1d ago', value: 46 },
      { day: 'Today', value: 45 },
    ],
  },
  {
    id: '3',
    question: 'Stanley Cup trend peak by summer?',
    category: 'Products',
    trendId: '3',
    probability: 0.82,
    momentum: 'up',
    volume: '3.1M',
    timeRemaining: '7d',
    probabilityHistory: [
      { day: '1w ago', value: 62 },
      { day: '6d ago', value: 68 },
      { day: '5d ago', value: 72 },
      { day: '4d ago', value: 75 },
      { day: '3d ago', value: 78 },
      { day: '2d ago', value: 80 },
      { day: '1d ago', value: 81 },
      { day: 'Today', value: 82 },
    ],
  },
  {
    id: '4',
    question: 'Coquette aesthetic in top 5?',
    category: 'Fashion',
    trendId: '4',
    probability: 0.61,
    momentum: 'flat',
    volume: '890K',
    timeRemaining: '28d',
    probabilityHistory: [
      { day: '1w ago', value: 59 },
      { day: '6d ago', value: 60 },
      { day: '5d ago', value: 60 },
      { day: '4d ago', value: 61 },
      { day: '3d ago', value: 61 },
      { day: '2d ago', value: 61 },
      { day: '1d ago', value: 61 },
      { day: 'Today', value: 61 },
    ],
  },
  {
    id: '5',
    question: 'AI fashion tools viral on TikTok?',
    category: 'Tech',
    probability: 0.58,
    momentum: 'up',
    volume: '1.5M',
    timeRemaining: '14d',
    probabilityHistory: [
      { day: '1w ago', value: 45 },
      { day: '6d ago', value: 48 },
      { day: '5d ago', value: 51 },
      { day: '4d ago', value: 53 },
      { day: '3d ago', value: 54 },
      { day: '2d ago', value: 56 },
      { day: '1d ago', value: 57 },
      { day: 'Today', value: 58 },
    ],
  },
  {
    id: '6',
    question: 'Clean girl aesthetic decline?',
    category: 'Lifestyle',
    trendId: '5',
    probability: 0.52,
    momentum: 'down',
    volume: '1.1M',
    timeRemaining: '14d',
    probabilityHistory: [
      { day: '1w ago', value: 68 },
      { day: '6d ago', value: 64 },
      { day: '5d ago', value: 60 },
      { day: '4d ago', value: 58 },
      { day: '3d ago', value: 56 },
      { day: '2d ago', value: 54 },
      { day: '1d ago', value: 53 },
      { day: 'Today', value: 52 },
    ],
  },
]
