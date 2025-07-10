'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Plus, Trash2, GraduationCap, Calendar, MapPin } from 'lucide-react'

const educationItemSchema = z.object({
  id: z.string(),
  school: z.string().min(1, '请输入学校名称'),
  degree: z.string().min(1, '请输入学位'),
  field: z.string().min(1, '请输入专业'),
  location: z.string().optional(),
  startDate: z.string().min(1, '请选择开始时间'),
  endDate: z.string().optional(),
  gpa: z.string().optional(),
  description: z.string().optional(),
})

const educationSchema = z.object({
  education: z.array(educationItemSchema),
})

type EducationFormData = z.infer<typeof educationSchema>
type EducationItem = z.infer<typeof educationItemSchema>

interface EducationEditorProps {
  data?: EducationItem[] | null
  onSave: (data: EducationItem[]) => Promise<void>
  loading?: boolean
}

export function EducationEditor({ data, onSave, loading }: EducationEditorProps) {
  const [hasChanges, setHasChanges] = useState(false)

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: data || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  })

  const addEducation = () => {
    append({
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    })
    setHasChanges(true)
  }

  const onSubmit = async (formData: EducationFormData) => {
    try {
      await onSave(formData.education)
      setHasChanges(false)
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          教育背景
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          按时间倒序添加你的教育经历
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h4 className="text-lg font-medium mb-2">还没有教育经历</h4>
              <p className="text-muted-foreground mb-4">
                添加你的教育背景
              </p>
              <Button onClick={addEducation} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                添加教育经历
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">教育经历 {index + 1}</CardTitle>
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
                    <FormField
                      control={form.control}
                      name={`education.${index}.school`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>学校名称 *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="清华大学" 
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
                        name={`education.${index}.degree`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>学位 *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="本科/硕士/博士" 
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
                        name={`education.${index}.field`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>专业 *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="计算机科学与技术" 
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
                      name={`education.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            学校位置
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="北京市海淀区" 
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

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`education.${index}.startDate`}
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
                        name={`education.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>结束时间</FormLabel>
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
                        name={`education.${index}.gpa`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GPA（可选）</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="3.8/4.0" 
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
                      name={`education.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>描述（可选）</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="描述你的主要课程、获得的奖项或相关成就..."
                              className="min-h-[100px]"
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
                onClick={addEducation}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加教育经历
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