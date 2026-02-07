import { Skeleton } from '@/components/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-2 w-48" />
      </div>
    </div>
  )
}
