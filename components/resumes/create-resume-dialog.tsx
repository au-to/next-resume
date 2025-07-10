'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useResumes } from '@/lib/hooks/use-resumes'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

const createResumeSchema = z.object({
  title: z.string().min(1, '请输入简历标题').max(100, '标题不能超过100个字符'),
  template: z.string().default('modern'),
  summary: z.string().optional(),
  personalInfo: z.object({
    name: z.string().optional(),
    email: z.string().email('请输入有效的邮箱地址').optional().or(z.literal('')),
    phone: z.string().optional(),
    location: z.string().optional(),
  }).optional(),
})

type CreateResumeFormData = z.infer<typeof createResumeSchema>

const templates = [
  { id: 'modern', name: '现代风格', description: '简洁现代的设计' },
  { id: 'classic', name: '经典风格', description: '传统专业的布局' },
  { id: 'creative', name: '创意风格', description: '创新有趣的设计' },
  { id: 'minimal', name: '极简风格', description: '极简主义设计' },
]

interface CreateResumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateResumeDialog({ open, onOpenChange }: CreateResumeDialogProps) {
  const router = useRouter()
  const { createResume } = useResumes()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<CreateResumeFormData>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      title: '',
      template: 'modern',
      summary: '',
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
      },
    },
  })

  const onSubmit = async (data: CreateResumeFormData) => {
    try {
      setIsCreating(true)
      setError(null)

      const resume = await createResume(data)
      
      // 成功创建后关闭对话框并跳转到编辑页面
      onOpenChange(false)
      form.reset()
      router.push(`/dashboard/resumes/${resume.id}/edit`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建失败，请重试')
    } finally {
      setIsCreating(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isCreating) {
      onOpenChange(newOpen)
      if (!newOpen) {
        form.reset()
        setError(null)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>创建新简历</DialogTitle>
          <DialogDescription>
            填写基本信息来创建一份新的简历。你可以在创建后继续编辑详细内容。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 错误提示 */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* 简历标题 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>简历标题 *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="例如：前端开发工程师简历"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 模板选择 */}
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>选择模板</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择一个模板" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{template.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {template.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 个人信息 */}
            <div className="space-y-4">
              <Label className="text-base font-medium">个人信息（可选）</Label>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="personalInfo.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>姓名</FormLabel>
                      <FormControl>
                        <Input placeholder="张三" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="example@email.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>电话</FormLabel>
                      <FormControl>
                        <Input placeholder="138-0000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>所在地</FormLabel>
                      <FormControl>
                        <Input placeholder="北京市" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 个人简介 */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>个人简介（可选）</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="简单介绍一下你的专业背景和技能特长..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 操作按钮 */}
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOpenChange(false)}
                disabled={isCreating}
              >
                取消
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                创建简历
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 