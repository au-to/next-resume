'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ContributionCalendar } from './contribution-calendar'
import { 
  Github, 
  Star, 
  GitFork, 
  Eye, 
  Calendar, 
  Users, 
  BookOpen,
  RefreshCw,
  ExternalLink,
  TrendingUp
} from 'lucide-react'
import { format } from 'date-fns'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubStatsProps {
  data: {
    publicRepos: number
    publicGists: number
    followers: number
    following: number
    totalStars: number
    totalForks: number
    repositories: any[]
    languages: Record<string, number>
    contributions: ContributionDay[]
    lastSyncAt: string
    syncStatus: string
  }
  onSync: () => void
  isLoading?: boolean
}

// Language colors mapping
const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#1572B6',
  Shell: '#89e051',
  Vue: '#2c3e50',
  React: '#61dafb',
}

export function GitHubStats({ data, onSync, isLoading = false }: GitHubStatsProps) {
  const topLanguages = Object.entries(data.languages || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  const topRepos = (data.repositories || [])
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">GitHub Analytics</h2>
          <p className="text-muted-foreground">
            Last synced: {format(new Date(data.lastSyncAt), 'PPp')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant={data.syncStatus === 'completed' ? 'default' : 'destructive'}
          >
            {data.syncStatus}
          </Badge>
          <Button onClick={onSync} disabled={isLoading} size="sm">
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Syncing...' : 'Sync Data'}
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Repositories</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.publicRepos}</div>
            <p className="text-xs text-muted-foreground">
              Active projects on GitHub
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalStars}</div>
            <p className="text-xs text-muted-foreground">
              Stars across all repositories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forks</CardTitle>
            <GitFork className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalForks}</div>
            <p className="text-xs text-muted-foreground">
              Forks across all repositories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.followers}</div>
            <p className="text-xs text-muted-foreground">
              Following {data.following} users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Calendar */}
      <ContributionCalendar 
        contributions={data.contributions || []} 
        className="col-span-full"
      />

      {/* Languages & Top Repositories */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Programming Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Programming Languages
            </CardTitle>
            <CardDescription>
              Language distribution across your repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topLanguages.length > 0 ? (
              topLanguages.map(([language, percentage]) => (
                <div key={language} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: languageColors[language] || '#6b7280' }}
                      />
                      <span className="text-sm font-medium">{language}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No language data available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Top Repositories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Repositories
            </CardTitle>
            <CardDescription>
              Your most starred repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topRepos.length > 0 ? (
              topRepos.map((repo: any) => (
                <div key={repo.id} className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sm hover:underline"
                      >
                        {repo.name}
                      </a>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div 
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: languageColors[repo.language] || '#6b7280' }}
                          />
                          {repo.language}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No repositories found
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 