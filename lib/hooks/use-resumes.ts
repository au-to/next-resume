'use client'

import { useState, useEffect, useCallback } from 'react'
import { ResumeData } from '@/lib/types'

interface Resume {
  id: string
  title: string
  slug: string
  template: string
  isPublic: boolean
  theme: string
  views: number
  downloads: number
  createdAt: string
  updatedAt: string
}

interface ResumeListItem extends Resume {}

interface UseResumesReturn {
  resumes: ResumeListItem[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  createResume: (data: Partial<ResumeData>) => Promise<Resume>
  deleteResume: (id: string) => Promise<void>
}

export function useResumes(): UseResumesReturn {
  const [resumes, setResumes] = useState<ResumeListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResumes = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/resumes')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch resumes')
      }

      setResumes(data.resumes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const createResume = async (data: Partial<ResumeData>): Promise<Resume> => {
    const response = await fetch('/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create resume')
    }

    // Refresh the list
    await fetchResumes()
    
    return result.resume
  }

  const deleteResume = async (id: string): Promise<void> => {
    const response = await fetch(`/api/resumes/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const result = await response.json()
      throw new Error(result.error || 'Failed to delete resume')
    }

    // Remove from local state
    setResumes(prev => prev.filter(resume => resume.id !== id))
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  return {
    resumes,
    loading,
    error,
    refresh: fetchResumes,
    createResume,
    deleteResume,
  }
}

interface UseResumeReturn {
  resume: ResumeData | null
  loading: boolean
  error: string | null
  updateResume: (data: Partial<ResumeData>) => Promise<ResumeData>
  refresh: () => Promise<void>
}

export function useResume(id: string): UseResumeReturn {
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResume = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/resumes/${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch resume')
      }

      setResume(data.resume)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [id])

  const updateResume = async (data: Partial<ResumeData>): Promise<ResumeData> => {
    const response = await fetch(`/api/resumes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update resume')
    }

    setResume(result.resume)
    return result.resume
  }

  useEffect(() => {
    if (id) {
      fetchResume()
    }
  }, [id, fetchResume])

  return {
    resume,
    loading,
    error,
    updateResume,
    refresh: fetchResume,
  }
} 