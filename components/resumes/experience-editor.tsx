'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Plus, Trash2, Briefcase, Calendar, MapPin } from 'lucide-react'

const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, '请输入公司名称'),
  position: z.string().min(1, '请输入职位名称'),
  location: z.string().optional(),
  startDate: z.string().min(1, '请选择开始时间'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, '请输入工作描述'),
  achievements: z.array(z.string()).default([]),
})

const experienceSchema = z.object({
  experience: z.array(experienceItemSchema),
})

type ExperienceFormData = z.infer<typeof experienceSchema>
type ExperienceItem = z.infer<typeof experienceItemSchema>

interface ExperienceEditorProps {
  data?: ExperienceItem[] | null
  onSave: (data: ExperienceItem[]) => Promise<void>
  loading?: boolean
}

export function ExperienceEditor({ data, onSave, loading }: ExperienceEditorProps) {
  const [hasChanges, setHasChanges] = useState(false)

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: data || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  })

  const addExperience = () => {
    append({
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    })
    setHasChanges(true)
  }

  const onSubmit = async (formData: ExperienceFormData) => {
    try {
      await onSave(formData.experience)
      setHasChanges(false)
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          工作经历
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          按时间倒序添加你的工作经历，突出重要成就和技能
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h4 className="text-lg font-medium mb-2">还没有工作经历</h4>
              <p className="text-muted-foreground mb-4">
                添加你的第一份工作经历
              </p>
              <Button onClick={addExperience} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                添加工作经历
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">工作经历 {index + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          remove(index)
                          setHasChanges(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.company`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>公司名称 *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="腾讯科技" 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  setHasChanges(true)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`experience.${index}.position`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>职位名称 *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="前端开发工程师" 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  setHasChanges(true)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`experience.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            工作地点
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="深圳市南山区" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setHasChanges(true)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              开始时间 *
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="month" 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  setHasChanges(true)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`experience.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>结束时间</FormLabel>
                            <FormControl>
                              <Input 
                                type="month" 
                                disabled={form.watch(`experience.${index}.current`)}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  setHasChanges(true)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`experience.${index}.current`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked: boolean) => {
                                field.onChange(checked)
                                setHasChanges(true)
                                if (checked) {
                                  form.setValue(`experience.${index}.endDate`, '')
                                }
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>目前仍在此职位</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>工作描述 *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="描述你在这个职位的主要职责、参与的项目和取得的成就..."
                              className="min-h-[120px]"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setHasChanges(true)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}

              <Button 
                type="button" 
                variant="outline" 
                onClick={addExperience}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加工作经历
              </Button>
            </div>
          )}

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