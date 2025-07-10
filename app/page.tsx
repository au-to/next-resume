import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Github, 
  Star, 
  BarChart3, 
  FileText, 
  Zap, 
  Shield, 
  Download,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <Github className="h-12 w-12 text-primary" />
              <span className="text-4xl font-bold">Hacknical</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your GitHub Profile
            <span className="block text-primary">Reimagined</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your GitHub data into stunning visualizations and professional resumes. 
            Showcase your coding journey with powerful analytics and beautiful presentations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8 py-4">
                <Github className="mr-2 h-5 w-5" />
                Get Started with GitHub
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to showcase your GitHub profile professionally
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* GitHub Analytics */}
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>GitHub Analytics</CardTitle>
                <CardDescription>
                  Deep insights into your coding patterns, language usage, and repository performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    Repository statistics & trends
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    Contribution calendar
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    Top starred repositories
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Resume Builder */}
            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Resume Builder</CardTitle>
                <CardDescription>
                  Create professional resumes with automatic GitHub project integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Download className="h-4 w-4 mr-2 text-green-500" />
                    PDF export & sharing
                  </li>
                  <li className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-gray-700" />
                    Auto-sync GitHub projects
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    Multiple templates
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Real-time Sync */}
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Real-time Sync</CardTitle>
                <CardDescription>
                  Keep your data up-to-date with automatic GitHub synchronization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    Secure OAuth integration
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-purple-500" />
                    Fast data processing
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                    Live updates
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powered by the latest web technologies for optimal performance and user experience
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-black text-white p-4 rounded-lg inline-block mb-3">
                <span className="font-bold text-lg">Next.js 14</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">React Framework</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white p-4 rounded-lg inline-block mb-3">
                <span className="font-bold text-lg">TypeScript</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Type Safety</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-600 text-white p-4 rounded-lg inline-block mb-3">
                <span className="font-bold text-lg">Prisma</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Database ORM</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white p-4 rounded-lg inline-block mb-3">
                <span className="font-bold text-lg">NextAuth</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Authentication</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Sign in with your GitHub account and start building your professional presence today.
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Github className="mr-2 h-5 w-5" />
              Sign In with GitHub
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Github className="h-6 w-6" />
              <span className="text-xl font-bold">Hacknical</span>
            </div>
            <div className="text-sm text-gray-400">
              Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 