import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, ArrowLeft, Star, Users, BarChart3 } from 'lucide-react'
import { auth, signIn } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Sign In - Hacknical',
  description: 'Sign in to access your GitHub analytics and resume builder',
}

export default async function SignInPage() {
  const session = await auth()
  
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute left-4 top-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 md:left-8 md:top-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <Github className="mx-auto h-12 w-12 text-gray-900 dark:text-gray-100" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue your GitHub analytics journey
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-center">Connect with GitHub</CardTitle>
              <CardDescription className="text-center">
                We'll analyze your repositories and help you build a professional resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                action={async () => {
                  'use server'
                  await signIn('github', { redirectTo: '/dashboard' })
                }}
              >
                <Button className="w-full" size="lg">
                  <Github className="mr-2 h-5 w-5" />
                  Continue with GitHub
                </Button>
              </form>

              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Comprehensive GitHub analytics</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span>Professional resume builder</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span>Share your developer profile</span>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 