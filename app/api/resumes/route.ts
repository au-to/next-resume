import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

// 简历创建/更新的验证Schema
const resumeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  template: z.string().default('modern'),
  personalInfo: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }).optional(),
  summary: z.string().optional(),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string(),
    achievements: z.array(z.string()).default([]),
  })).optional(),
  education: z.array(z.object({
    id: z.string(),
    school: z.string(),
    degree: z.string(),
    field: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    gpa: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string(),
    skills: z.array(z.object({
      name: z.string(),
      level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
    })),
  })).optional(),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    url: z.string().url().optional(),
    github: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    highlights: z.array(z.string()).default([]),
  })).optional(),
  isPublic: z.boolean().default(false),
  includeGithubData: z.boolean().default(true),
  theme: z.string().default('blue'),
})

// GET - 获取用户的所有简历
export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resumes = await prisma.resume.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        template: true,
        isPublic: true,
        theme: true,
        views: true,
        downloads: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ resumes })
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}

// POST - 创建新简历
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = resumeSchema.parse(body)

    // 生成唯一的slug
    const baseSlug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    let slug = baseSlug
    let counter = 1
    
    // 检查slug是否已存在
    while (await prisma.resume.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: validatedData.title,
        slug,
        template: validatedData.template,
        personalInfo: validatedData.personalInfo ? JSON.stringify(validatedData.personalInfo) : null,
        summary: validatedData.summary,
        experience: validatedData.experience ? JSON.stringify(validatedData.experience) : null,
        education: validatedData.education ? JSON.stringify(validatedData.education) : null,
        skills: validatedData.skills ? JSON.stringify(validatedData.skills) : null,
        projects: validatedData.projects ? JSON.stringify(validatedData.projects) : null,
        isPublic: validatedData.isPublic,
        includeGithubData: validatedData.includeGithubData,
        theme: validatedData.theme,
      },
    })

    return NextResponse.json({ 
      resume: {
        ...resume,
        personalInfo: resume.personalInfo ? JSON.parse(resume.personalInfo) : null,
        experience: resume.experience ? JSON.parse(resume.experience) : null,
        education: resume.education ? JSON.parse(resume.education) : null,
        skills: resume.skills ? JSON.parse(resume.skills) : null,
        projects: resume.projects ? JSON.parse(resume.projects) : null,
      }
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating resume:', error)
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    )
  }
} 