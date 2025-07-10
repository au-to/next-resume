'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
import { Save, User, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react'

const personalInfoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('请输入有效的邮箱地址').optional().or(z.literal('')),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('请输入有效的网址').optional().or(z.literal('')),
  linkedin: z.string().optional(),
  github: z.string().optional(),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

interface PersonalInfoEditorProps {
  data?: PersonalInfoFormData | null
  onSave: (data: PersonalInfoFormData) => Promise<void>
  loading?: boolean
}

export function PersonalInfoEditor({ data, onSave, loading }: PersonalInfoEditorProps) {
  const [hasChanges, setHasChanges] = useState(false)

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      location: data?.location || '',
      website: data?.website || '',
      linkedin: data?.linkedin || '',
      github: data?.github || '',
    },
  })

  // 监听表单变化
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasChanges(true)
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = async (formData: PersonalInfoFormData) => {
    try {
      await onSave(formData)
      setHasChanges(false)
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">个人基本信息</h3>
        <p className="text-sm text-muted-foreground">
          填写你的基本联系信息，这些信息将显示在简历顶部
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* 姓名 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  姓名
                </FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 邮箱 */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  邮箱
                </FormLabel>
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

          {/* 手机号 */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  手机号
                </FormLabel>
                <FormControl>
                  <Input placeholder="138-0000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 所在地 */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  所在地
                </FormLabel>
                <FormControl>
                  <Input placeholder="北京市海淀区" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 个人网站 */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  个人网站
                </FormLabel>
                <FormControl>
                  <Input 
                    type="url" 
                    placeholder="https://yourwebsite.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* LinkedIn */}
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </FormLabel>
                <FormControl>
                  <Input placeholder="linkedin.com/in/yourprofile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* GitHub */}
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </FormLabel>
                <FormControl>
                  <Input placeholder="github.com/yourusername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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