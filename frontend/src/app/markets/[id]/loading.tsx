import { Skeleton } from '../../../components/LoadingSkeleton'

export default function MarketDetailLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-4 w-24 mb-6" />
      <Skeleton className="h-8 w-2/3 mb-2" />
      <Skeleton className="h-4 w-32 mb-8" />

      <Skeleton className="h-64 rounded-xl mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 lg:col-span-2 rounded-xl" />
      </div>

      <Skeleton className="h-6 w-32 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    </main>
  )
}
