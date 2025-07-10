import { StatsSkeleton, RepoListSkeleton } from '@/components/ui/skeleton'

export default function LoadingGitHub() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-9 w-24 bg-muted rounded animate-pulse" />
      </div>
      
      <StatsSkeleton />
      
      <div className="h-48 bg-muted rounded animate-pulse" />
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <RepoListSkeleton />
        </div>
        <div className="space-y-4">
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <RepoListSkeleton />
        </div>
      </div>
    </div>
  )
} 