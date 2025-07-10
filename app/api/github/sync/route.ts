import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { GitHubService } from '@/lib/github'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's GitHub access token from database
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: 'github',
      },
    })

    if (!account?.access_token) {
      return NextResponse.json(
        { error: 'GitHub account not connected' },
        { status: 400 }
      )
    }

    // Get user's GitHub login
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { githubLogin: true },
    })

    if (!user?.githubLogin) {
      return NextResponse.json(
        { error: 'GitHub username not found' },
        { status: 400 }
      )
    }

    // Create GitHub service and fetch analytics
    const githubService = new GitHubService(account.access_token)
    const analytics = await githubService.getCompleteAnalytics(user.githubLogin)

    // Update or create GitHub data record
    await prisma.gitHubData.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        publicRepos: analytics.user.public_repos,
        publicGists: analytics.user.public_gists,
        followers: analytics.user.followers,
        following: analytics.user.following,
        repositories: JSON.stringify(analytics.repositories),
        languages: JSON.stringify(analytics.languages),
        contributions: JSON.stringify(analytics.contributionCalendar),
        totalStars: analytics.totalStars,
        totalForks: analytics.totalForks,
        syncStatus: 'completed',
        lastSyncAt: new Date(),
      },
      update: {
        publicRepos: analytics.user.public_repos,
        publicGists: analytics.user.public_gists,
        followers: analytics.user.followers,
        following: analytics.user.following,
        repositories: JSON.stringify(analytics.repositories),
        languages: JSON.stringify(analytics.languages),
        contributions: JSON.stringify(analytics.contributionCalendar),
        totalStars: analytics.totalStars,
        totalForks: analytics.totalForks,
        syncStatus: 'completed',
        lastSyncAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'GitHub data synced successfully',
      data: {
        totalRepos: analytics.repositories.length,
        totalStars: analytics.totalStars,
        totalForks: analytics.totalForks,
        languages: Object.keys(analytics.languages).length,
      },
    })
  } catch (error) {
    console.error('GitHub sync error:', error)
    
    // Update sync status to failed
    if (error && typeof error === 'object' && 'message' in error) {
      try {
        const session = await auth()
        if (session?.user?.id) {
          await prisma.gitHubData.upsert({
            where: { userId: session.user.id },
            create: {
              userId: session.user.id,
              syncStatus: 'failed',
              lastSyncAt: new Date(),
            },
            update: {
              syncStatus: 'failed',
              lastSyncAt: new Date(),
            },
          })
        }
      } catch (dbError) {
        console.error('Database error during failed sync update:', dbError)
      }
    }

    return NextResponse.json(
      { error: 'Failed to sync GitHub data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get GitHub data from database
    const githubData = await prisma.gitHubData.findUnique({
      where: { userId: session.user.id },
    })

    if (!githubData) {
      return NextResponse.json(
        { error: 'No GitHub data found. Please sync first.' },
        { status: 404 }
      )
    }

    // Parse JSON strings back to objects
    const parsedData = {
      ...githubData,
      repositories: githubData.repositories ? JSON.parse(githubData.repositories) : [],
      languages: githubData.languages ? JSON.parse(githubData.languages) : {},
      contributions: githubData.contributions ? JSON.parse(githubData.contributions) : [],
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    })
  } catch (error) {
    console.error('GitHub data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    )
  }
} 