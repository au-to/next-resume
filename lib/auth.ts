import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from 'next-auth/providers/github'
import { prisma } from '@/lib/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
        }
      }
      return true
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id
        
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
          (session.user as any).githubLogin = dbUser.githubLogin;
          (session.user as any).githubId = dbUser.githubId;
          (session.user as any).location = dbUser.location;
          (session.user as any).company = dbUser.company;
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
}) 