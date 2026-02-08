// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Fetch all categories
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/api/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

// Fetch single category with metrics and markets
export async function fetchCategory(id: string | number) {
  const res = await fetch(`${API_URL}/api/categories/${id}`)
  if (!res.ok) throw new Error('Failed to fetch category')
  return res.json()
}

// Fetch all markets
export async function fetchMarkets() {
  const res = await fetch(`${API_URL}/api/markets`)
  if (!res.ok) throw new Error('Failed to fetch markets')
  return res.json()
}

// Fetch single market with price history
export async function fetchMarket(id: string | number) {
  const res = await fetch(`${API_URL}/api/markets/${id}`)
  if (!res.ok) throw new Error('Failed to fetch market')
  return res.json()
}

// Execute a trade on a market
export async function executeTrade(
  marketId: string | number,
  action: 'buy' | 'sell',
  outcome: 'yes' | 'no',
  amount: number
) {
  const params = new URLSearchParams({
    action,
    outcome,
    amount: amount.toString()
  })
  
  const res = await fetch(`${API_URL}/api/markets/${marketId}/trade?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw new Error('Failed to execute trade')
  return res.json()
}
