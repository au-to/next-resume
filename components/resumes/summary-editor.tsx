'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Save, FileText } from 'lucide-react'

const summarySchema = z.object({
  summary: z.string().max(500, '个人简介不能超过500个字符').optional(),
})

type SummaryFormData = z.infer<typeof summarySchema>

interface SummaryEditorProps {
  data?: string | null
  onSave: (data: string) => Promise<void>
  loading?: boolean
}

export function SummaryEditor({ data, onSave, loading }: SummaryEditorProps) {
  const [hasChanges, setHasChanges] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const form = useForm<SummaryFormData>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: data || '',
    },
  })

  // 监听表单变化
  useEffect(() => {
    const subscription = form.watch((value) => {
      setHasChanges(true)
      setCharCount(value.summary?.length || 0)
    })
    return () => subscription.unsubscribe()
  }, [form])

  // 初始化字符计数
  useEffect(() => {
    setCharCount(data?.length || 0)
  }, [data])

  const onSubmit = async (formData: SummaryFormData) => {
    try {
      await onSave(formData.summary || '')
      setHasChanges(false)
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5" />
          个人简介
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          用简洁的语言描述你的专业背景、技能特长和职业目标
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>个人简介</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="例如：5年前端开发经验，熟练掌握React、Vue等框架，具有丰富的项目开发和团队协作经验。擅长解决复杂的技术问题，对新技术有强烈的学习热情..."
                    className="min-h-[200px] resize-none"
                    maxLength={500}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex justify-between">
                  <span>建议控制在100-300字之间，突出你的核心优势</span>
                  <span className={`text-xs ${charCount > 450 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {charCount}/500
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 提示卡片 */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium">💡 写作建议</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>突出你的专业背景和核心技能</li>
              <li>提及具体的工作年限和经验领域</li>
              <li>展示你的职业目标和价值观</li>
              <li>避免空泛的描述，用具体的技术和成就说话</li>
            </ul>
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={!hasChanges || loading}
              className="min-w-[120px]"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? '保存中...' : '保存更改'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 