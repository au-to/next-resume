import 'next-auth'

declare module 'next-auth' {
  interface User {
    githubLogin?: string | null
    githubId?: string | null
    location?: string | null
    company?: string | null
  }
  
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      githubLogin?: string | null
      githubId?: string | null
      location?: string | null
      company?: string | null
    }
  }
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  githubId?: string | null
  githubLogin?: string | null
}

export interface GitHubDataStats {
  publicRepos: number
  publicGists: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  totalIssues: number
  totalPRs: number
}

export interface RepositoryData {
  id: number
  name: string
  full_name: string
  description?: string | null
  html_url: string
  language?: string | null
  stargazers_count: number
  forks_count: number
  size: number
  created_at: string
  updated_at: string
  topics: string[]
}

export interface LanguageData {
  [language: string]: {
    percentage: number
    bytes: number
    color: string
  }
}

export interface ContributionData {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ResumeData {
  id: string
  title: string
  slug: string
  template: string
  personalInfo?: {
    name?: string
    email?: string
    phone?: string
    location?: string
    website?: string
    linkedin?: string
    github?: string
  }
  summary?: string
  experience?: ExperienceItem[]
  education?: EducationItem[]
  skills?: SkillCategory[]
  projects?: ProjectItem[]
  certificates?: CertificateItem[]
  languages?: LanguageItem[]
  interests?: string[]
  isPublic: boolean
  theme: string
  createdAt: string
  updatedAt: string
}

export interface ExperienceItem {
  id: string
  company: string
  position: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  achievements: string[]
}

export interface EducationItem {
  id: string
  school: string
  degree: string
  field: string
  location?: string
  startDate: string
  endDate?: string
  gpa?: string
  description?: string
}

export interface SkillCategory {
  id: string
  name: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate: string
  endDate?: string
  highlights: string[]
}

export interface CertificateItem {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
  description?: string
}

export interface LanguageItem {
  language: string
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Limited'
} 