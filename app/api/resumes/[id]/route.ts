import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

// 简历更新的验证Schema
const updateResumeSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  template: z.string().optional(),
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
  isPublic: z.boolean().optional(),
  includeGithubData: z.boolean().optional(),
  theme: z.string().optional(),
})

// Helper function to parse JSON fields
function parseResumeFields(resume: any) {
  return {
    ...resume,
    personalInfo: resume.personalInfo ? JSON.parse(resume.personalInfo) : null,
    experience: resume.experience ? JSON.parse(resume.experience) : null,
    education: resume.education ? JSON.parse(resume.education) : null,
    skills: resume.skills ? JSON.parse(resume.skills) : null,
    projects: resume.projects ? JSON.parse(resume.projects) : null,
    githubRepos: resume.githubRepos ? JSON.parse(resume.githubRepos) : null,
  }
}

// GET - 获取单个简历
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const { id } = params

    const resume = await prisma.resume.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            githubLogin: true,
          },
        },
      },
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // 检查权限：简历所有者或公开简历
    if (resume.userId !== session?.user?.id && !resume.isPublic) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // 如果是公开访问，增加浏览量
    if (resume.userId !== session?.user?.id && resume.isPublic) {
      await prisma.resume.update({
        where: { id },
        data: { views: { increment: 1 } },
      })
    }

    const parsedResume = parseResumeFields(resume)

    return NextResponse.json({ resume: parsedResume })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

// PUT - 更新简历
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const validatedData = updateResumeSchema.parse(body)

    // 检查简历所有权
    const existingResume = await prisma.resume.findUnique({
      where: { id },
      select: { userId: true, slug: true },
    })

    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    if (existingResume.userId !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // 如果标题改变，需要更新slug
    let slug = existingResume.slug
    if (validatedData.title) {
      const baseSlug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      // 只有当新slug不同时才更新
      if (baseSlug !== existingResume.slug) {
        slug = baseSlug
        let counter = 1
        
        // 检查新slug是否已存在
        while (await prisma.resume.findFirst({ 
          where: { 
            slug, 
            NOT: { id } 
          } 
        })) {
          slug = `${baseSlug}-${counter}`
          counter++
        }
      }
    }

    const updateData: any = {
      slug,
      updatedAt: new Date(),
    }

    // 只更新提供的字段
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.template) updateData.template = validatedData.template
    if (validatedData.personalInfo) updateData.personalInfo = JSON.stringify(validatedData.personalInfo)
    if (validatedData.summary !== undefined) updateData.summary = validatedData.summary
    if (validatedData.experience) updateData.experience = JSON.stringify(validatedData.experience)
    if (validatedData.education) updateData.education = JSON.stringify(validatedData.education)
    if (validatedData.skills) updateData.skills = JSON.stringify(validatedData.skills)
    if (validatedData.projects) updateData.projects = JSON.stringify(validatedData.projects)
    if (validatedData.isPublic !== undefined) updateData.isPublic = validatedData.isPublic
    if (validatedData.includeGithubData !== undefined) updateData.includeGithubData = validatedData.includeGithubData
    if (validatedData.theme) updateData.theme = validatedData.theme

    const updatedResume = await prisma.resume.update({
      where: { id },
      data: updateData,
    })

    const parsedResume = parseResumeFields(updatedResume)

    return NextResponse.json({ resume: parsedResume })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

// DELETE - 删除简历
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // 检查简历所有权
    const existingResume = await prisma.resume.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    if (existingResume.userId !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    await prisma.resume.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Resume deleted successfully' })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
} 