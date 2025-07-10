import { Octokit } from 'octokit'

export interface GitHubUser {
  id: number
  login: string
  name: string | null
  email: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  location: string | null
  company: string | null
  blog: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  hireable: boolean | null
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  size: number
  created_at: string
  updated_at: string
  pushed_at: string | null
  topics: string[]
  visibility: string
  default_branch: string
}

export interface LanguageStats {
  [language: string]: number
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubAnalytics {
  user: GitHubUser
  repositories: GitHubRepo[]
  languages: LanguageStats
  totalStars: number
  totalForks: number
  totalWatchers: number
  topRepositories: GitHubRepo[]
  recentActivity: any[]
  contributionCalendar: ContributionDay[]
}

export class GitHubService {
  private octokit: Octokit

  constructor(accessToken: string) {
    this.octokit = new Octokit({
      auth: accessToken,
    })
  }

  async getUserProfile(username: string): Promise<GitHubUser> {
    const { data } = await this.octokit.rest.users.getByUsername({
      username,
    })
    return data as GitHubUser
  }

  async getUserRepositories(username: string): Promise<GitHubRepo[]> {
    const repositories: GitHubRepo[] = []
    let page = 1
    const perPage = 100

    while (true) {
      const { data } = await this.octokit.rest.repos.listForUser({
        username,
        type: 'owner',
        sort: 'updated',
        per_page: perPage,
        page,
      })

      repositories.push(...(data as GitHubRepo[]))

      if (data.length < perPage) {
        break
      }
      page++
    }

    return repositories
  }

  async getLanguageStats(repositories: GitHubRepo[]): Promise<LanguageStats> {
    const languageStats: LanguageStats = {}
    let totalBytes = 0

    // Get language data for each repository
    for (const repo of repositories) {
      try {
        const { data } = await this.octokit.rest.repos.listLanguages({
          owner: repo.full_name.split('/')[0],
          repo: repo.name,
        })

        Object.entries(data).forEach(([language, bytes]) => {
          languageStats[language] = (languageStats[language] || 0) + bytes
          totalBytes += bytes
        })
      } catch (error) {
        console.warn(`Failed to get languages for ${repo.name}:`, error)
      }
    }

    // Convert to percentages
    const percentageStats: LanguageStats = {}
    Object.entries(languageStats).forEach(([language, bytes]) => {
      percentageStats[language] = Math.round((bytes / totalBytes) * 100 * 100) / 100
    })

    return percentageStats
  }

  async getContributionCalendar(username: string): Promise<ContributionDay[]> {
    // This would typically require GitHub GraphQL API for contribution calendar
    // For now, we'll return mock data. In a real implementation, you'd use:
    // https://docs.github.com/en/graphql/reference/objects#contributionscollection
    
    const contributions: ContributionDay[] = []
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

    for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
      const count = Math.floor(Math.random() * 10) // Mock data
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
      
      contributions.push({
        date: d.toISOString().split('T')[0],
        count,
        level: level as 0 | 1 | 2 | 3 | 4,
      })
    }

    return contributions
  }

  async getRecentActivity(username: string): Promise<any[]> {
    try {
      const { data } = await this.octokit.rest.activity.listPublicEventsForUser({
        username,
        per_page: 30,
      })
      return data
    } catch (error) {
      console.warn(`Failed to get recent activity for ${username}:`, error)
      return []
    }
  }

  async getCompleteAnalytics(username: string): Promise<GitHubAnalytics> {
    // Fetch all data in parallel for better performance
    const [user, repositories, recentActivity] = await Promise.all([
      this.getUserProfile(username),
      this.getUserRepositories(username),
      this.getRecentActivity(username),
    ])

    const [languages, contributionCalendar] = await Promise.all([
      this.getLanguageStats(repositories),
      this.getContributionCalendar(username),
    ])

    // Calculate aggregated stats
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0)
    const totalWatchers = repositories.reduce((sum, repo) => sum + repo.watchers_count, 0)

    // Get top repositories by stars
    const topRepositories = repositories
      .filter(repo => repo.stargazers_count > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10)

    return {
      user,
      repositories,
      languages,
      totalStars,
      totalForks,
      totalWatchers,
      topRepositories,
      recentActivity,
      contributionCalendar,
    }
  }

  static async createFromUser(userId: string): Promise<GitHubService | null> {
    // This would typically get the access token from the database
    // For now, we'll return null if no token is available
    // In a real implementation, you'd fetch the user's GitHub access token
    // from your accounts table
    return null
  }
} 