import { Skeleton } from '../../../../../../components'

export default function MetricBreakdownLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-5 w-48 mb-6" />
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-5 w-96 mb-8" />
      <Skeleton className="h-8 w-72 mb-4" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </main>
  )
}
