'use client'

import { useState } from 'react'
import { Plus, Eye, Download, Edit, Trash2, ExternalLink, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PageLoading } from '@/components/ui/loading'
import { useResumes } from '@/lib/hooks/use-resumes'
import { CreateResumeDialog } from '@/components/resumes/create-resume-dialog'
import { formatDistanceToNow } from 'date-fns'

export default function ResumesPage() {
  const { resumes, loading, error, deleteResume } = useResumes()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这份简历吗？此操作无法撤销。')) {
      return
    }

    try {
      setDeletingId(id)
      await deleteResume(id)
    } catch (error) {
      console.error('Failed to delete resume:', error)
      alert('删除失败，请重试')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <PageLoading text="加载简历列表..." />
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">我的简历</h1>
          <p className="text-muted-foreground">
            创建和管理你的专业简历
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          创建新简历
        </Button>
      </div>

      {/* 错误提示 */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 简历列表 */}
      {resumes.length === 0 ? (
        <EmptyState onCreateResume={() => setIsCreateDialogOpen(true)} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={handleDelete}
              isDeleting={deletingId === resume.id}
            />
          ))}
        </div>
      )}

      {/* 创建简历对话框 */}
      <CreateResumeDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}

// 空状态组件
function EmptyState({ onCreateResume }: { onCreateResume: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">还没有简历</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        创建你的第一份专业简历，展示你的技能和项目经验
      </p>
      <div className="mt-6">
        <Button onClick={onCreateResume}>
          <Plus className="h-4 w-4 mr-2" />
          创建第一份简历
        </Button>
      </div>
      
      {/* 功能预览 */}
      <div className="mt-12 grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
        <div className="text-center p-4">
          <div className="mx-auto h-8 w-8 text-blue-600">
            <Edit className="h-8 w-8" />
          </div>
          <h4 className="mt-2 font-medium">可视化编辑</h4>
          <p className="text-sm text-muted-foreground">
            拖拽式编辑器，实时预览
          </p>
        </div>
        <div className="text-center p-4">
          <div className="mx-auto h-8 w-8 text-green-600">
            <Download className="h-8 w-8" />
          </div>
          <h4 className="mt-2 font-medium">PDF导出</h4>
          <p className="text-sm text-muted-foreground">
            高质量PDF文件下载
          </p>
        </div>
        <div className="text-center p-4">
          <div className="mx-auto h-8 w-8 text-purple-600">
            <ExternalLink className="h-8 w-8" />
          </div>
          <h4 className="mt-2 font-medium">在线分享</h4>
          <p className="text-sm text-muted-foreground">
            生成分享链接展示简历
          </p>
        </div>
      </div>
    </div>
  )
}

// 简历卡片组件
function ResumeCard({ 
  resume, 
  onDelete, 
  isDeleting 
}: { 
  resume: any
  onDelete: (id: string) => void
  isDeleting: boolean
}) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg line-clamp-1">{resume.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {resume.template}
              </Badge>
              {resume.isPublic && (
                <Badge variant="outline" className="text-xs">
                  公开
                </Badge>
              )}
            </CardDescription>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a href={`/dashboard/resumes/${resume.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  编辑
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={`/resume/${resume.slug}`} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  预览
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onDelete(resume.id)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {resume.views}
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {resume.downloads}
            </div>
          </div>
          <span>
            {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
          </span>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <a href={`/dashboard/resumes/${resume.id}/edit`}>
              <Edit className="h-3 w-3 mr-1" />
              编辑
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={`/resume/${resume.slug}`} target="_blank">
              <Eye className="h-3 w-3 mr-1" />
              预览
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 