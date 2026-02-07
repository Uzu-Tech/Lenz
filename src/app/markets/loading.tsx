import { Skeleton } from '@/components/LoadingSkeleton'

export default function MarketsLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-80 mb-8" />

      <div className="flex gap-4 mb-6">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <Skeleton className="h-12 w-full rounded-t-xl" />
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-16 w-full rounded-none border-t border-slate-200 dark:border-slate-700" />
      ))}
      <Skeleton className="h-4 w-full rounded-b-xl" />
    </main>
  )
}
