'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Plus, Trash2, Code, X } from 'lucide-react'

const skillSchema = z.object({
  name: z.string().min(1, '请输入技能名称'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
})

const skillGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '请输入技能分类名称'),
  skills: z.array(skillSchema),
})

const skillsSchema = z.object({
  skills: z.array(skillGroupSchema),
})

type SkillsFormData = z.infer<typeof skillsSchema>
type SkillGroup = z.infer<typeof skillGroupSchema>
type Skill = z.infer<typeof skillSchema>

interface SkillsEditorProps {
  data?: SkillGroup[] | null
  onSave: (data: SkillGroup[]) => Promise<void>
  loading?: boolean
}

const skillLevels = [
  { value: 'Beginner', label: '初级', description: '基础了解' },
  { value: 'Intermediate', label: '中级', description: '熟练使用' },
  { value: 'Advanced', label: '高级', description: '深入掌握' },
  { value: 'Expert', label: '专家', description: '精通' },
]

export function SkillsEditor({ data, onSave, loading }: SkillsEditorProps) {
  const [hasChanges, setHasChanges] = useState(false)

  const form = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: data || [],
    },
  })

  const { fields: skillGroups, append: appendGroup, remove: removeGroup } = useFieldArray({
    control: form.control,
    name: "skills",
  })

  const addSkillGroup = () => {
    appendGroup({
      id: Date.now().toString(),
      name: '',
      skills: [],
    })
    setHasChanges(true)
  }

  const addSkillToGroup = (groupIndex: number) => {
    const currentSkills = form.getValues(`skills.${groupIndex}.skills`)
    form.setValue(`skills.${groupIndex}.skills`, [
      ...currentSkills,
      { name: '', level: 'Intermediate' }
    ])
    setHasChanges(true)
  }

  const removeSkillFromGroup = (groupIndex: number, skillIndex: number) => {
    const currentSkills = form.getValues(`skills.${groupIndex}.skills`)
    const newSkills = currentSkills.filter((_, index) => index !== skillIndex)
    form.setValue(`skills.${groupIndex}.skills`, newSkills)
    setHasChanges(true)
  }

  const onSubmit = async (formData: SkillsFormData) => {
    try {
      await onSave(formData.skills)
      setHasChanges(false)
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Code className="h-5 w-5" />
          技能特长
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          按类别组织你的技能，展示你的技术能力
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {skillGroups.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Code className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h4 className="text-lg font-medium mb-2">还没有技能</h4>
              <p className="text-muted-foreground mb-4">
                添加你的技能分类和具体技能
              </p>
              <Button onClick={addSkillGroup} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                添加技能分类
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {skillGroups.map((group, groupIndex) => {
                const groupSkills = form.watch(`skills.${groupIndex}.skills`) || []
                
                return (
                  <Card key={group.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">技能分类 {groupIndex + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            removeGroup(groupIndex)
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
                        name={`skills.${groupIndex}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>分类名称 *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="例如：编程语言、框架、工具等" 
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

                      {/* 技能列表 */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <FormLabel>具体技能</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addSkillToGroup(groupIndex)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            添加技能
                          </Button>
                        </div>

                        {groupSkills.length === 0 ? (
                          <div className="text-center py-4 border border-dashed border-muted-foreground/25 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              点击上方按钮添加具体技能
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {groupSkills.map((skill, skillIndex) => (
                              <div key={skillIndex} className="flex gap-2 items-start">
                                <div className="flex-1">
                                  <FormField
                                    control={form.control}
                                    name={`skills.${groupIndex}.skills.${skillIndex}.name`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input 
                                            placeholder="技能名称" 
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
                                <div className="w-32">
                                  <FormField
                                    control={form.control}
                                    name={`skills.${groupIndex}.skills.${skillIndex}.level`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select 
                                          onValueChange={(value) => {
                                            field.onChange(value)
                                            setHasChanges(true)
                                          }} 
                                          value={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="选择水平" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {skillLevels.map((level) => (
                                              <SelectItem key={level.value} value={level.value}>
                                                <div className="flex flex-col">
                                                  <span>{level.label}</span>
                                                  <span className="text-xs text-muted-foreground">
                                                    {level.description}
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
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSkillFromGroup(groupIndex, skillIndex)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              <Button 
                type="button" 
                variant="outline" 
                onClick={addSkillGroup}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加技能分类
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