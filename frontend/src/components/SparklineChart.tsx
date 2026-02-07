'use client'

type SparklineChartProps = {
  data: number[]
  className?: string
}

export function SparklineChart({ data, className = '' }: SparklineChartProps) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - ((v - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className={`h-10 w-full ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-indigo-500"
        />
      </svg>
    </div>
  )
}
