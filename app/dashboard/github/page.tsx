'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GitHubStats } from '@/components/github/github-stats'
import { PageLoading } from '@/components/ui/loading'
import { 
  Github, 
  AlertCircle, 
  RefreshCw, 
  BarChart3,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface GitHubData {
  publicRepos: number
  publicGists: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  repositories: any[]
  languages: Record<string, number>
  contributions: any[]
  lastSyncAt: string
  syncStatus: string
  syncError?: string
}

export default function GitHubAnalyticsPage() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGitHubData = async () => {
    try {
      setError(null)
      const response = await fetch('/api/github/sync')
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch GitHub data')
      }

      setGithubData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const syncGitHubData = async () => {
    try {
      setIsSyncing(true)
      setError(null)
      
      const response = await fetch('/api/github/sync', {
        method: 'POST',
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sync GitHub data')
      }

      // Refresh data after successful sync
      await fetchGitHubData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed')
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    fetchGitHubData()
  }, [])

  if (isLoading) {
    return <PageLoading text="Loading GitHub analytics..." />
  }

  if (error && !githubData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">GitHub Analytics</h1>
            <p className="text-muted-foreground">
              Analyze your GitHub repositories and coding patterns
            </p>
          </div>
        </div>

        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            {error.includes('not connected') 
              ? 'Your GitHub account is not properly connected. Please sign in again.' 
              : error.includes('not found')
              ? 'No GitHub data found. Please sync your data to get started.'
              : error
            }
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Github className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Sync Your GitHub Data</CardTitle>
            <CardDescription>
              Connect and analyze your GitHub repositories to get detailed insights
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button onClick={syncGitHubData} disabled={isSyncing} size="lg">
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing GitHub Data...
                </>
              ) : (
                <>
                  <Github className="mr-2 h-4 w-4" />
                  Sync GitHub Data
                </>
              )}
            </Button>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>This will analyze your public repositories and generate insights including:</p>
              <ul className="list-disc list-inside space-y-1 max-w-md mx-auto">
                <li>Repository statistics and trends</li>
                <li>Programming language breakdown</li>
                <li>Star and fork counts</li>
                <li>Contribution calendar</li>
                <li>Top performing repositories</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Feature Preview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-lg">Repository Analytics</CardTitle>
              <CardDescription>
                Get insights into your coding activity and repository performance
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Github className="h-8 w-8 text-green-600" />
              <CardTitle className="text-lg">Language Breakdown</CardTitle>
              <CardDescription>
                See which programming languages you use most across your projects
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <RefreshCw className="h-8 w-8 text-purple-600" />
              <CardTitle className="text-lg">Real-time Sync</CardTitle>
              <CardDescription>
                Keep your data up-to-date with automatic GitHub synchronization
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  if (githubData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">GitHub Analytics</h1>
            <p className="text-muted-foreground">
              Insights from your GitHub repositories and coding activity
            </p>
          </div>
        </div>

        {/* Sync Status Alert */}
        {githubData.syncStatus === 'failed' && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Sync Failed</AlertTitle>
            <AlertDescription>
              {githubData.syncError || 'Failed to sync GitHub data. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        {githubData.syncStatus === 'completed' && (
          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sync Successful</AlertTitle>
            <AlertDescription>
              Your GitHub data has been successfully synchronized.
            </AlertDescription>
          </Alert>
        )}

        <GitHubStats 
          data={githubData} 
          onSync={syncGitHubData}
          isLoading={isSyncing}
        />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Sync Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  return null
} 