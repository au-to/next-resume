'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Save, Eye, Download, Settings, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageLoading } from '@/components/ui/loading'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useResume } from '@/lib/hooks/use-resumes'
import { PersonalInfoEditor } from '@/components/resumes/personal-info-editor'
import { ExperienceEditor } from '@/components/resumes/experience-editor'
import { EducationEditor } from '@/components/resumes/education-editor'
import { SkillsEditor } from '@/components/resumes/skills-editor'
import { ProjectsEditor } from '@/components/resumes/projects-editor'
import { SummaryEditor } from '@/components/resumes/summary-editor'
import { ResumePreview } from '@/components/resumes/resume-preview'
// import { ResumeSettings } from '@/components/resumes/resume-settings'

export default function ResumeEditPage() {
  const params = useParams()
  const resumeId = params.id as string
  const { resume, loading, error, updateResume } = useResume(resumeId)
  const [activeTab, setActiveTab] = useState('personal')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const handleSave = async (section: string, data: any) => {
    try {
      setIsSaving(true)
      setSaveMessage(null)
      
      await updateResume({ [section]: data })
      setSaveMessage('保存成功')
      
      // 3秒后清除保存消息
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error) {
      setSaveMessage('保存失败，请重试')
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return <PageLoading text="加载简历编辑器..." />
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert>
          <AlertDescription>简历不存在或您没有访问权限</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* 顶部工具栏 */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 左侧 */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/resumes">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="font-semibold">{resume.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {resume.template} 模板
                </p>
              </div>
            </div>

            {/* 右侧操作 */}
            <div className="flex items-center gap-2">
              {saveMessage && (
                <span className={`text-sm ${
                  saveMessage.includes('成功') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {saveMessage}
                </span>
              )}
              
              <Button variant="outline" size="sm" asChild>
                <Link href={`/resume/${resume.slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  预览
                </Link>
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出PDF
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                设置
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* 左侧编辑器 */}
          <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b px-6 py-4">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="personal" className="text-xs">基本信息</TabsTrigger>
                  <TabsTrigger value="summary" className="text-xs">个人简介</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">工作经历</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">教育背景</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">技能特长</TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs">项目经验</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-auto p-6">
                <TabsContent value="personal" className="mt-0">
                  <PersonalInfoEditor
                    data={resume.personalInfo}
                    onSave={(data: any) => handleSave('personalInfo', data)}
                    loading={isSaving}
                  />
                </TabsContent>

                <TabsContent value="summary" className="mt-0">
                  <SummaryEditor
                    data={resume.summary}
                    onSave={(data: any) => handleSave('summary', data)}
                    loading={isSaving}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-0">
                  <ExperienceEditor
                    data={resume.experience}
                    onSave={(data: any) => handleSave('experience', data)}
                    loading={isSaving}
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <EducationEditor
                    data={resume.education}
                    onSave={(data: any) => handleSave('education', data)}
                    loading={isSaving}
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-0">
                  <SkillsEditor
                    data={resume.skills}
                    onSave={(data: any) => handleSave('skills', data)}
                    loading={isSaving}
                  />
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  <ProjectsEditor
                    data={resume.projects}
                    onSave={(data: any) => handleSave('projects', data)}
                    loading={isSaving}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* 右侧预览 */}
          <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="border-b px-6 py-4">
                <h3 className="font-semibold">实时预览</h3>
                <p className="text-sm text-muted-foreground">
                  简历实时预览效果
                </p>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <ResumePreview resume={resume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 