'use client'

type MomentumArrowProps = {
  direction: 'up' | 'down' | 'flat'
  className?: string
}

export function MomentumArrow({ direction, className = '' }: MomentumArrowProps) {
  if (direction === 'up') {
    return <span className={`text-green-500 ${className}`}>↑</span>
  }
  if (direction === 'down') {
    return <span className={`text-red-500 ${className}`}>↓</span>
  }
  return <span className={`text-slate-400 ${className}`}>→</span>
}
