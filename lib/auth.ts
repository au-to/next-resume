import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from 'next-auth/providers/github'
import { prisma } from '@/lib/db'

// 环境变量验证
const requiredEnvVars = {
  AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
}

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true, // 重要：NextAuth v5 需要这个配置
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email public_repo',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' && profile) {
        try {
          // Update user with GitHub info
          await prisma.user.update({
            where: { id: user.id },
            data: {
              githubId: profile.id?.toString(),
              githubLogin: (profile as any).login,
              location: (profile as any).location,
              company: (profile as any).company,
              blog: (profile as any).blog,
              bio: (profile as any).bio,
              hireable: (profile as any).hireable,
            },
          })
        } catch (error) {
          console.error('Error updating user with GitHub info:', error)
          // 不阻止登录，即使 GitHub 信息更新失败
        }
      }
      return true
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id
        
        try {
          // Get additional user info from database
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
              githubLogin: true,
              githubId: true,
              location: true,
              company: true,
            },
          })
          
          if (dbUser) {
            ;(session.user as any).githubLogin = dbUser.githubLogin
            ;(session.user as any).githubId = dbUser.githubId
            ;(session.user as any).location = dbUser.location
            ;(session.user as any).company = dbUser.company
          }
        } catch (error) {
          console.error('Error fetching user data for session:', error)
          // 即使获取额外信息失败，也返回基础 session
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
  debug: process.env.NODE_ENV === 'development',
})